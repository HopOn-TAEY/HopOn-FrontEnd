import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./../App.css";
import Menu2 from "../components/Menu2";

function Perfil() {
  const avaliacoes = [
    { usuario: "Usuário 1", estrelas: 5, comentario: "Excelente motorista!" },
    { usuario: "Usuário 2", estrelas: 4, comentario: "Muito bom, mas poderia melhorar na pontualidade." },
  ];

  const mediaEstrelas =
    avaliacoes.reduce((acc, cur) => acc + cur.estrelas, 0) / avaliacoes.length;

  return (
    <div>
      <Menu2 />
    <div className="bg-gray-50 p-8 min-h-screen text-gray-800 font-poppins">
      {/* Cabeçalho */}
      <div className="mb-5 border-b-2 border-dashed border-gray-300">
        <h1 className="text-3xl font-bold">Perfil</h1>
        <p className="text-gray-500 mb-2">Veja os detalhes do seu perfil aqui</p>
      </div>

      {/* Perfil + Informações Pessoais lado a lado */}
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-stretch">
        {/* Card da Foto, Nome e Tipo */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 w-full md:w-1/3 flex flex-col items-center text-center">
          <h3 className="text-2xl font-semibold mb-1">Nome do Usuário</h3>
          <p className="text-green-600 font-medium">Tipo: Motorista</p>
          <div className="flex items-center gap-1 text-yellow-500 mt-2">
            {renderEstrelas(mediaEstrelas)}
            <span className="ml-2 text-sm text-gray-500">
              ({mediaEstrelas.toFixed(1)} de {avaliacoes.length} avaliações)
            </span>
          </div>
          <div className="w-44 h-44 rounded-full border-4 border-gray-700 overflow-hidden my-4">
            <img
              src="https://img1.picmix.com/output/pic/normal/9/4/1/0/11320149_ab39f.gif"
              alt="Foto do Usuário"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Informações Pessoais - estilo card */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 w-full md:w-2/3 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Informações Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <Info label="Nome" value="Nome do Usuário" />
              <Info label="Email" value="usuario@email.com" />
              <Info label="Telefone" value="(99) 99999-9999" />
              <Info label="Endereço" value="Rua Exemplo, 123, Cidade - UF" />
              <Info label="Preferências" value="#Trap, #Melancholic, #Rap-US" />
            </div>
          </div>
          <button className="mt-6 bg-folha hover:bg-green-700 text-white px-4 py-2 rounded self-start">
            Editar Informações
          </button>
        </div>
      </div>

      {/* Avaliações */}
      <div className="mb-10 bg-white border border-gray-200 shadow-sm rounded-xl p-6">
        <h3 className="text-2xl font-semibold mb-4">Avaliações</h3>
        <button className="bg-folha hover:bg-green-700 text-white px-4 py-2 rounded mb-4">
          Adicionar Avaliação
        </button>
        <div className="flex flex-col gap-4">
          {avaliacoes.map((av, index) => (
            <Review
              key={index}
              usuario={av.usuario}
              estrelas={av.estrelas}
              comentario={av.comentario}
            />
          ))}
        </div>
      </div>

      {/* Veículos */}
      <div className="bg-white border border-gray-50 shadow-sm rounded-xl p-6">
        <h3 className="text-2xl font-semibold mb-4">Meus Veículos</h3>
        <button className="bg-folha hover:bg-green-700 text-white px-4 py-2 rounded mb-4">
          Adicionar Veículo
        </button>
        <div className="flex flex-wrap gap-6">
          <div className="bg-gray-200 shadow-sm p-6 rounded-xl w-full md:w-[48%]">
            <div className="w-full h-64 rounded-md overflow-hidden mb-4">
              <img
                src="https://via.placeholder.com/300x300"
                alt="Foto do Veículo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <Info label="Modelo" value="Modelo do Veículo" />
              <Info label="Placa" value="ABC-1234" />
              <Info label="Cor" value="Preto" />
              <Info label="Tipo" value="Carro" />
              <Info label="Descrição" value="Veículo confortável e econômico." />
              <div className="flex gap-2 pt-2">
                <button className="bg-folha hover:bg-green-700 text-white px-4 py-2 rounded">
                  Editar
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    );
}

// Componente para exibir informações pessoais ou do veículo
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}:</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}

// Componente para exibir avaliações com estrelas
function Review({
  usuario,
  estrelas,
  comentario,
}: {
  usuario: string;
  estrelas: number;
  comentario: string;
}) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
      <h4 className="font-semibold">{usuario}</h4>
      <div className="flex items-center gap-1 text-yellow-500 mb-1">
        {renderEstrelas(estrelas)}
      </div>
      <p className="text-gray-700">{comentario}</p>
    </div>
  );
}

// Função para renderizar estrelas com decimais (ex: 4.5)
function renderEstrelas(valor: number) {
  const estrelasInteiras = Math.floor(valor);
  const temMeiaEstrela = valor - estrelasInteiras >= 0.5;

  return (
    <>
      {[...Array(estrelasInteiras)].map((_, i) => (
        <AiFillStar key={`fill-${i}`} />
      ))}
      {temMeiaEstrela && <AiFillStar className="opacity-50" />}
      {[...Array(5 - estrelasInteiras - (temMeiaEstrela ? 1 : 0))].map((_, i) => (
        <AiOutlineStar key={`empty-${i}`} />
      ))}
    </>
  );
}

export default Perfil;
