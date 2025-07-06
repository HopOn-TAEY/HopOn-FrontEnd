import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import "./../App.css";

interface PerfilFormData {
  nome: string;
  email: string;
  nascimento: string;
  telefone: string;
  cpf: string;
  cep: string;
  tipoUsuario: "passageiro" | "motorista";
  cnh?: string;
}

function Perfil() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PerfilFormData>();

  const tipoUsuario = watch("tipoUsuario");

  const onSubmit: SubmitHandler<PerfilFormData> = (data) => {
    console.log("Dados do perfil:", data);
  };

  return (
    <div className="bg-folha flex justify-center p-6 font-poppins min-h-screen">
      <div className="m-auto bg-white rounded-md p-[1.5%] w-[50%]">
        <h1 className="text-center text-4xl font-bold pt-[1%] mb-[2%] mt-10">
          Meu Perfil
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nome e E-mail */}
          <div className="w-[80%] m-auto mb-4 flex justify-between gap-6">
            <div className="w-full">
              <label className="text-sm font-semibold">Nome</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Seu nome"
                {...register("nome", { required: "Nome obrigatório" })}
              />
              {errors.nome && (
                <p className="text-red-600 text-sm">{errors.nome.message}</p>
              )}
            </div>

            <div className="w-full">
              <label className="text-sm font-semibold">E-mail</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Seu e-mail"
                {...register("email", { required: "E-mail obrigatório" })}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Nascimento e Telefone */}
          <div className="w-[80%] m-auto mb-4 flex justify-between gap-6">
            <div className="w-full">
              <label className="text-sm font-semibold">Nascimento</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("nascimento", { required: "Data obrigatória" })}
              />
              {errors.nascimento && (
                <p className="text-red-600 text-sm">{errors.nascimento.message}</p>
              )}
            </div>

            <div className="w-full">
              <label className="text-sm font-semibold">Telefone</label>
              <Controller
                name="telefone"
                control={control}
                rules={{ required: "Telefone obrigatório" }}
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
                <p className="text-red-600 text-sm">{errors.telefone.message}</p>
              )}
            </div>
          </div>

          {/* CPF e CEP */}
          <div className="w-[80%] m-auto mb-4 flex justify-between gap-6">
            <div className="w-full">
              <label className="text-sm font-semibold">CPF</label>
              <Controller
                name="cpf"
                control={control}
                rules={{ required: "CPF obrigatório" }}
                render={({ field }) => (
                  <InputMask mask="999.999.999-99" {...field}>
                    {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                      <input
                        {...inputProps}
                        type="text"
                        placeholder="Seu CPF"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    )}
                  </InputMask>
                )}
              />
              {errors.cpf && (
                <p className="text-red-600 text-sm">{errors.cpf.message}</p>
              )}
            </div>

            <div className="w-full">
              <label className="text-sm font-semibold">CEP</label>
              <Controller
                name="cep"
                control={control}
                rules={{ required: "CEP obrigatório" }}
                render={({ field }) => (
                  <InputMask mask="99999-999" {...field}>
                    {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                      <input
                        {...inputProps}
                        type="text"
                        placeholder="00000-000"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    )}
                  </InputMask>
                )}
              />
              {errors.cep && (
                <p className="text-red-600 text-sm">{errors.cep.message}</p>
              )}
            </div>
          </div>

          {/* Tipo de usuário */}
          <div className="w-[80%] m-auto mb-4">
            <p className="text-sm font-semibold mb-2">Tipo de usuário</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="passageiro"
                  {...register("tipoUsuario", { required: "Campo obrigatório" })}
                />
                Passageiro
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="motorista"
                  {...register("tipoUsuario", { required: "Campo obrigatório" })}
                />
                Motorista
              </label>
            </div>
            {errors.tipoUsuario && (
              <p className="text-red-600 text-sm">{errors.tipoUsuario.message}</p>
            )}
          </div>

          {/* CNH */}
          {tipoUsuario === "motorista" && (
            <div className="w-[80%] m-auto mb-4">
              <label className="text-sm font-semibold">CNH</label>
              <Controller
                name="cnh"
                control={control}
                rules={{
                  required: "CNH obrigatória para motoristas",
                  validate: (value) =>
                    tipoUsuario === "motorista" && !value
                      ? "CNH obrigatória para motoristas"
                      : true,
                }}
                render={({ field }) => (
                  <InputMask mask="99999999999" {...field}>
                    {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                      <input
                        {...inputProps}
                        type="text"
                        placeholder="Digite sua CNH"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    )}
                  </InputMask>
                )}
              />
              {errors.cnh && (
                <p className="text-red-600 text-sm">{errors.cnh.message}</p>
              )}
            </div>
          )}

          {/* Botão */}
          <div className="justify-center flex items-center mb-5 mt-6">
            <input
              type="submit"
              value="Salvar"
              className="w-[30%] bg-folha text-white p-2 rounded-md cursor-pointer hover:bg-green-700 transition-colors duration-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Perfil;
