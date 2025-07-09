import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { adicionarVeiculo } from "../api/usuarios";
import { useAuth } from "../contexts/AuthContext";
import "./../App.css";

interface VeiculoFormInputs {
  modelo: string;
  marca: string;
  ano: number;
  placa: string;
  cor: string;
  capacidade: number;
  suporteCriancas: boolean;
  suporteDeficientes: boolean;
}

function CadastroVeiculo() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VeiculoFormInputs>();

  // Verificar se o usuário é motorista
  if (!user || user.tipoUsuario !== 'motorista') {
    return (
      <div className="bg-folha flex justify-center p-6 font-poppins">
        <div className="m-auto bg-white rounded-md p-[1.5%] w-[45%] text-center">
          <h1 className="text-center text-4xl font-bold pt-[1%] mb-[2%] mt-5">
            Acesso Negado
          </h1>
          <p className="mb-4">Apenas motoristas podem cadastrar veículos.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-folha text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  const onSubmit: SubmitHandler<VeiculoFormInputs> = async (data) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const veiculoData = {
        ...data,
        suporteCriancas: data.suporteCriancas || false,
        suporteDeficientes: data.suporteDeficientes || false,
      };

      const result = await adicionarVeiculo(veiculoData);
      console.log('Veículo criado:', result);
      
      // Redirecionar para a página de criação de corridas
      navigate('/cadastrarviagem');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao cadastrar veículo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-folha flex justify-center p-6 font-poppins">
      <div className="m-auto bg-white rounded-md p-[1.5%] w-[55%]">
        <h1 className="text-center text-4xl font-bold pt-[1%] mb-[2%] mt-10">
          Cadastre seu veículo
        </h1>
        <h5 className="mb-[2%] text-center">Adicione informações sobre seu veículo</h5>

        {error && (
          <div className="w-[80%] m-auto mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Marca e Modelo */}
          <div className="w-[80%] m-auto mt-[2%] mb-[2%] flex justify-between items-center gap-x-6">
            <div className="w-full">
              <label htmlFor="marca" className="text-sm font-semibold">
                Marca
              </label>
              <input
                id="marca"
                {...register("marca", { required: "Marca é obrigatória" })}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex: Toyota"
              />
              {errors.marca && (
                <p className="text-red-600 text-sm mt-1">{errors.marca.message}</p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="modelo" className="text-sm font-semibold">
                Modelo
              </label>
              <input
                id="modelo"
                {...register("modelo", { required: "Modelo é obrigatório" })}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex: Corolla"
              />
              {errors.modelo && (
                <p className="text-red-600 text-sm mt-1">{errors.modelo.message}</p>
              )}
            </div>
          </div>

          {/* Ano e Placa */}
          <div className="w-[80%] m-auto mb-[2%] flex justify-between items-center gap-x-6">
            <div className="w-full">
              <label htmlFor="ano" className="text-sm font-semibold">
                Ano
              </label>
              <input
                id="ano"
                {...register("ano", { 
                  required: "Ano é obrigatório",
                  valueAsNumber: true,
                  min: { value: 1900, message: "Ano deve ser maior que 1900" },
                  max: { value: new Date().getFullYear() + 1, message: "Ano não pode ser futuro" }
                })}
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex: 2020"
              />
              {errors.ano && (
                <p className="text-red-600 text-sm mt-1">{errors.ano.message}</p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="placa" className="text-sm font-semibold">
                Placa
              </label>
              <input
                id="placa"
                {...register("placa", { 
                  required: "Placa é obrigatória",
                  minLength: { value: 7, message: "Placa deve ter pelo menos 7 caracteres" },
                  maxLength: { value: 8, message: "Placa deve ter no máximo 8 caracteres" }
                })}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex: ABC-1234"
              />
              {errors.placa && (
                <p className="text-red-600 text-sm mt-1">{errors.placa.message}</p>
              )}
            </div>
          </div>

          {/* Cor e Capacidade */}
          <div className="w-[80%] m-auto mb-[2%] flex justify-between items-center gap-x-6">
            <div className="w-full">
              <label htmlFor="cor" className="text-sm font-semibold">
                Cor
              </label>
              <input
                id="cor"
                {...register("cor", { required: "Cor é obrigatória" })}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex: Prata"
              />
              {errors.cor && (
                <p className="text-red-600 text-sm mt-1">{errors.cor.message}</p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="capacidade" className="text-sm font-semibold">
                Capacidade (passageiros)
              </label>
              <input
                id="capacidade"
                {...register("capacidade", { 
                  required: "Capacidade é obrigatória",
                  valueAsNumber: true,
                  min: { value: 1, message: "Capacidade deve ser pelo menos 1" },
                  max: { value: 20, message: "Capacidade máxima é 20" }
                })}
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex: 5"
              />
              {errors.capacidade && (
                <p className="text-red-600 text-sm mt-1">{errors.capacidade.message}</p>
              )}
            </div>
          </div>

          {/* Suportes */}
          <div className="w-[80%] m-auto mb-5 space-y-4">
            <div className="flex items-center">
              <input
                {...register("suporteCriancas")}
                type="checkbox"
                id="suporteCriancas"
                className="mr-2"
              />
              <label htmlFor="suporteCriancas" className="text-sm">
                Suporte para crianças (cadeirinhas)
              </label>
            </div>

            <div className="flex items-center">
              <input
                {...register("suporteDeficientes")}
                type="checkbox"
                id="suporteDeficientes"
                className="mr-2"
              />
              <label htmlFor="suporteDeficientes" className="text-sm">
                Suporte para pessoas com deficiência
              </label>
            </div>
          </div>

          {/* Botão */}
          <div className="justify-center flex items-center mt-[3%]">
            <input
              type="submit"
              value={isLoading ? "Cadastrando..." : "Cadastrar Veículo"}
              disabled={isLoading}
              className="w-[30%] bg-folha place-content-center text-white p-2 rounded-md cursor-pointer hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </form>

        <div className="text-center mt-[3%] mb-1">
          <button
            onClick={() => navigate('/cadastrarviagem')}
            className="text-sm text-red-800 hover:underline"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CadastroVeiculo; 