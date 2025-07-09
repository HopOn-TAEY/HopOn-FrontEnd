import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { registerPassageiro, registerMotorista } from "../api/auth";
import { useAuth } from "../contexts/AuthContext";
import "./../App.css";

type TipoUsuario = "passageiro" | "motorista";

interface FormValues {
  nome: string;
  email: string;
  nasc: string; // data no formato string YYYY-MM-DD pelo input date
  telefone: string;
  senha: string;
  confirmarSenha: string;
  tipoUsuario: TipoUsuario;
  cnh?: string;
  corridasPrivadas?: boolean;
  termos: boolean;
}

function Cadastrar() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const tipoUsuario = watch("tipoUsuario");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let result;
      if (data.tipoUsuario === "passageiro") {
        result = await registerPassageiro({
          nome: data.nome,
          email: data.email,
          nasc: data.nasc,
          telefone: data.telefone,
          senha: data.senha,
          tipoUsuario: "passageiro",
        });
      } else {
        result = await registerMotorista({
          nome: data.nome,
          email: data.email,
          nasc: data.nasc,
          telefone: data.telefone,
          senha: data.senha,
          tipoUsuario: "motorista",
          cnh: data.cnh || "",
          corridasPrivadas: data.corridasPrivadas || false,
        });
      }
      
      // Atualizar o contexto com os dados do usuário
      loginContext(result.user);
      
      console.log('Cadastro bem-sucedido, redirecionando...');
      console.log('Result:', result);
      
      // Redirecionar para a página de debug para testar
      navigate('/debug');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao fazer cadastro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-folha flex justify-center p-6 font-poppins">
      <div className="m-auto bg-white rounded-md p-[1.5%] w-[55%]">
        <h1 className="text-center text-4xl font-bold pt-[1%] mb-[2%] mt-10">
          Crie sua conta
        </h1>
        <h5 className="mb-[2%] text-center">Encontre viagens de forma prática</h5>

        {error && (
          <div className="w-[80%] m-auto mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {/* Nome e E-mail */}
          <div className="w-[80%] m-auto mt-[2%] mb-[2%] flex justify-between items-center gap-x-6">
            <div className="w-full">
              <label htmlFor="nome" className="text-sm font-semibold">
                Nome
              </label>
              <input
                id="nome"
                {...register("nome", { required: "Nome é obrigatório" })}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Digite seu nome..."
              />
              {errors.nome && (
                <p className="text-red-600 text-sm mt-1">{errors.nome.message}</p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="email" className="text-sm font-semibold">
                E-mail
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email inválido",
                  },
                })}
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Digite seu e-mail..."
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Nascimento e Telefone */}
          <div className="w-[80%] m-auto mb-[2%] flex justify-between items-center gap-x-6">
            <div className="w-full">
              <label htmlFor="nasc" className="text-sm font-semibold">
                Data de nascimento
              </label>
              <input
                id="nasc"
                {...register("nasc", { required: "Data de nascimento é obrigatória" })}
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.nasc && (
                <p className="text-red-600 text-sm mt-1">{errors.nasc.message}</p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="telefone" className="text-sm font-semibold">
                Telefone
              </label>
              <Controller
                name="telefone"
                control={control}
                rules={{ required: "Telefone é obrigatório" }}
                render={({ field }) => (
                  <InputMask mask="(99) 99999-9999" {...field}>
                    {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                      <input
                        {...inputProps}
                        type="text"
                        placeholder="(XX) XXXXX-XXXX"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    )}
                  </InputMask>
                )}
              />
              {errors.telefone && (
                <p className="text-red-600 text-sm mt-1">{errors.telefone.message}</p>
              )}
            </div>
          </div>

          {/* Senha e confirmação */}
          <div className="w-[80%] m-auto mb-[2%] flex justify-between items-center gap-x-6">
            <div className="w-full">
              <label htmlFor="senha" className="text-sm font-semibold">
                Senha
              </label>
              <input
                id="senha"
                {...register("senha", { required: "Senha é obrigatória",                 
                  minLength: {
                  value: 4,
                  message: "A senha deve ter ao menos 4 caracteres",
                }, })}
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Digite sua senha..."
              />
              {errors.senha && (
                <p className="text-red-600 text-sm mt-1">{errors.senha.message}</p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="confirmarSenha" className="text-sm font-semibold">
                Confirmar senha
              </label>
              <input
                id="confirmarSenha"
                {...register("confirmarSenha", {
                  required: "Confirmação de senha é obrigatória",
                  validate: (value) =>
                    value === watch("senha") || "As senhas não coincidem",
                  minLength: {
                  value: 4,
                  message: "A senha deve ter ao menos 4 caracteres",
                },
                })}
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Digite novamente sua senha..."
              />
              {errors.confirmarSenha && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.confirmarSenha.message}
                </p>
              )}
            </div>
          </div>

          {/* Tipo de usuário */}
          <div className="w-[80%] m-auto mb-5">
            <p className="text-sm font-semibold mb-2">Tipo de usuário</p>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  {...register("tipoUsuario", { required: "Escolha o tipo de usuário" })}
                  type="radio"
                  value="passageiro"
                />
                Passageiro
              </label>
              <label className="flex items-center gap-2">
                <input
                  {...register("tipoUsuario", { required: "Escolha o tipo de usuário" })}
                  type="radio"
                  value="motorista"
                />
                Motorista
              </label>
            </div>
            {errors.tipoUsuario && (
              <p className="text-red-600 text-sm mt-1">{errors.tipoUsuario.message}</p>
            )}
          </div>

          {/* Campos adicionais para motorista */}
          {tipoUsuario === "motorista" && (
            <div className="w-[80%] m-auto mb-5 space-y-4 border-t border-gray-300 pt-4">
              <div>
                <label htmlFor="cnh" className="text-sm font-semibold">
                  Número da CNH
                </label>
                <Controller
                  name="cnh"
                  control={control}
                  rules={{
                    required: "CNH é obrigatória para motoristas",
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "CNH deve ter 11 números",
                    },
                  }}
                  render={({ field }) => (
                    <InputMask mask="99999999999" {...field}>
                      {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                        <input
                          {...inputProps}
                          type="text"
                          placeholder="Digite sua CNH..."
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      )}
                    </InputMask>
                  )}
                />
                {errors.cnh && (
                  <p className="text-red-600 text-sm mt-1">{errors.cnh.message}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  {...register("corridasPrivadas")}
                  type="checkbox"
                  id="corridasPrivadas"
                  name="corridasPrivadas"
                  className="mr-2"
                />
                <label htmlFor="corridasPrivadas" className="text-sm">
                  Aceita realizar corridas privadas
                </label>
              </div>
            </div>
          )}

          {/* Termos */}
          <div className="w-[80%] m-auto mb-5 text-left flex items-center mt-[5%]">
            <input
              {...register("termos", { required: "Aceite os termos é obrigatório" })}
              type="checkbox"
              id="termos"
              className="mr-2"
            />
            <label htmlFor="termos" className="text-sm">
              Li e aceito os{" "}
              <a href="#" className="text-folha hover:underline">
                termos de uso
              </a>{" "}
              e a{" "}
              <a href="#" className="text-folha hover:underline">
                política de privacidade
              </a>
              .
            </label>
            {errors.termos && (
              <p className="text-red-600 text-sm mt-1">{errors.termos.message}</p>
            )}
          </div>

          {/* Botão */}
          <div className="justify-center flex items-center mt-[3%]">
            <input
              type="submit"
              value={isLoading ? "Cadastrando..." : "Cadastrar"}
              disabled={isLoading}
              className="w-[30%] bg-folha place-content-center text-white p-2 rounded-md cursor-pointer hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </form>

        <h5 className="text-center mt-[3%] mb-1">
          Já tem uma conta?{" "}
          <a href="/login" className="text-folha hover:underline">
            Faça login
          </a>
        </h5>
      </div>
    </div>
  );
}

export default Cadastrar;
