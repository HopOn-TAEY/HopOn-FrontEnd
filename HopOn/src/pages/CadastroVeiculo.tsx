import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { adicionarVeiculo } from "../api/usuarios";
import { useAuth } from "../contexts/AuthContext";
import { getAuthToken } from "../api/config";
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

interface ImagemVeiculo {
  file: File;
  preview: string;
  ordem: number;
}

function CadastroVeiculo() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagens, setImagens] = useState<ImagemVeiculo[]>([]);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Verificação adicional de segurança
  const hasToken = !!getAuthToken();

  // Verificação de segurança adicional
  useEffect(() => {
    if (!isAuthenticated && !hasToken) {
      navigate('/login');
      return;
    }

    if (user?.tipo !== 'motorista') {
      navigate('/');
      return;
    }
  }, [isAuthenticated, hasToken, user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VeiculoFormInputs>();

  // Função para lidar com upload de imagens
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImagens: ImagemVeiculo[] = [];
    
    for (let i = 0; i < Math.min(files.length, 4 - imagens.length); i++) {
      const file = files[i];
      
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecione apenas arquivos de imagem.');
        continue;
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Cada imagem deve ter no máximo 5MB.');
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        newImagens.push({
          file,
          preview,
          ordem: imagens.length + newImagens.length
        });
        
        if (newImagens.length === Math.min(files.length, 4 - imagens.length)) {
          setImagens(prev => [...prev, ...newImagens]);
          setError(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para remover imagem
  const removeImagem = (index: number) => {
    setImagens(prev => prev.filter((_, i) => i !== index).map((img, i) => ({
      ...img,
      ordem: i
    })));
  };

  // Função para reordenar imagens
  const moveImagem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= imagens.length) return;
    
    const newImagens = [...imagens];
    const [movedImagem] = newImagens.splice(fromIndex, 1);
    newImagens.splice(toIndex, 0, movedImagem);
    
    setImagens(newImagens.map((img, i) => ({
      ...img,
      ordem: i
    })));
  };

  // Se não está autenticado ou não é motorista, não renderiza o formulário
      if (!isAuthenticated || !hasToken || user?.tipo !== 'motorista') {
    return (
      <div className="bg-folha min-h-screen flex justify-center p-6 font-poppins">
        <div className="m-auto bg-white rounded-md p-[1.5%] w-[45%] text-center">
          <h1 className="text-center text-4xl font-bold pt-[1%] mb-[2%] mt-5">
            Acesso Negado
          </h1>
          <p className="mb-4">Apenas motoristas logados podem cadastrar veículos.</p>
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
      // Preparar dados das imagens
      const imagensData = imagens.map((img, index) => ({
        url: img.preview, // Em produção, isso seria o URL do upload
        tipo: (index === 0 ? "PRINCIPAL" : "SECUNDARIA") as "PRINCIPAL" | "SECUNDARIA",
        ordem: index
      }));

      const veiculoData = {
        ...data,
        suporteCriancas: data.suporteCriancas || false,
        suporteDeficientes: data.suporteDeficientes || false,
        imagemPrincipal: imagens.length > 0 ? imagens[0].preview : undefined,
        imagens: imagensData
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

          {/* Upload de Imagens */}
          <div className="w-[80%] m-auto mb-[2%]">
            <label className="text-sm font-semibold">
              Imagens do Veículo (opcional - máximo 4)
            </label>
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={imagens.length >= 4}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                Formatos aceitos: JPG, PNG, GIF. Máximo 5MB por imagem.
              </p>
            </div>

            {/* Preview das Imagens */}
            {imagens.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Imagens Selecionadas:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagens.map((imagem, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imagem.preview}
                        alt={`Imagem ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <div className="flex gap-2">
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => moveImagem(index, index - 1)}
                              className="bg-blue-500 text-white p-1 rounded text-xs"
                              title="Mover para esquerda"
                            >
                              ←
                            </button>
                          )}
                          {index < imagens.length - 1 && (
                            <button
                              type="button"
                              onClick={() => moveImagem(index, index + 1)}
                              className="bg-blue-500 text-white p-1 rounded text-xs"
                              title="Mover para direita"
                            >
                              →
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImagem(index)}
                            className="bg-red-500 text-white p-1 rounded text-xs"
                            title="Remover imagem"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                      {index === 0 && (
                        <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          Principal
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  A primeira imagem será a imagem principal. Arraste para reordenar.
                </p>
              </div>
            )}
          </div>

          {/* Checkboxes */}
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
            onClick={() => navigate('/')}
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