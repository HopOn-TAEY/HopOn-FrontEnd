import { useNavigate } from "react-router-dom";
import "./../App.css";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

function HomeLogin() {
  const navigate = useNavigate();

  return (
    <div className="font-poppins">
      <Menu />

      {/* Seção de boas-vindas */}
      <div className="pt-24 pb-20 bg-[url(/assets/paisagem2.jpeg)] bg-cover bg-center bg-no-repeat text-white px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Bem-vindo de volta!</h1>
        <p className="text-lg md:text-xl mb-8">Pronto para pegar estrada hoje?</p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button
            onClick={() => navigate("/pesquisa")}
            className="bg-folha hover:bg-green-700 transition px-6 py-3 rounded-md font-medium"
          >
            Procurar Carona
          </button>
          <button
            onClick={() => navigate("/cadastrarviagem")}
            className="bg-folha hover:bg-green-700 transition px-6 py-3 rounded-md font-medium"
          >
            Oferecer Carona
          </button>
        </div>
      </div>

      {/* Sugestões rápidas */}
      <div className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10">Sugestões para você</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <Card
            titulo="Viagens próximas"
            texto="Veja quem está oferecendo carona saindo da sua cidade."
            onClick={() => navigate("/pesquisa")}
          />
          <Card
            titulo="Minhas caronas"
            texto="Gerencie as caronas que você criou ou participou."
            onClick={() => navigate("/minhascaronas")}
          />
          <Card
            titulo="Avaliações"
            texto="Veja e deixe feedbacks para motoristas e passageiros."
            onClick={() => navigate("/perfil")}
          />
        </div>
      </div>

      {/* Benefícios da plataforma */}
      <div className="py-16 px-6 bg-folha text-center">
        <h2 className="text-3xl font-semibold mb-10 text-white">Por que usar nossa plataforma?</h2>
        <div className="flex flex-wrap justify-center gap-10">
          <Benefit
            titulo="Econômico"
            texto="Compartilhe custos e economize em cada viagem."
          />
          <Benefit
            titulo="Sustentável"
            texto="Reduza a emissão de CO₂ ajudando o meio ambiente."
          />
          <Benefit
            titulo="Confiável"
            texto="Avaliações ajudam a manter a comunidade segura."
          />
        </div>
      </div>

      {/* Depoimentos de usuários */}
      <div className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10">O que dizem nossos usuários</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <Testimonial nome="Ana" texto="Sempre encontro caronas confiáveis! O app mudou minha rotina." />
          <Testimonial nome="Carlos" texto="É prático, seguro e muito econômico. Recomendo demais!" />
          <Testimonial nome="Larissa" texto="Uso quase toda semana. Já conheci pessoas incríveis por aqui!" />
        </div>
      </div>

      {/* Seção: Perfil completo com novo background */}
      <div className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-folha mb-4">Seu perfil é seu cartão de visita</h2>
        <p className="mb-6 text-lg max-w-xl mx-auto text-gray-700">
          Motoristas e passageiros confiam mais em quem tem um perfil completo. Adicione foto, informações e receba mais solicitações!
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/perfil")}
            className="bg-folha text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition"
          >
            Completar meu perfil agora
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Componente de card reutilizável
function Card({ titulo, texto, onClick }: { titulo: string; texto: string; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-md rounded-xl w-72 p-6 cursor-pointer hover:shadow-lg transition"
    >
      <h3 className="text-xl font-semibold mb-2 text-folha">{titulo}</h3>
      <p className="text-sm text-gray-600">{texto}</p>
    </div>
  );
}

// Componente de benefício
function Benefit({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="w-64 bg-gray-50 rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-2 text-folha">{titulo}</h3>
      <p className="text-sm text-gray-700">{texto}</p>
    </div>
  );
}

// Componente de depoimento
function Testimonial({ nome, texto }: { nome: string; texto: string }) {
  return (
    <div className="w-72 bg-white p-6 rounded-xl shadow-md">
      <p className="text-sm text-gray-600 mb-4">“{texto}”</p>
      <p className="font-semibold text-folha">— {nome}</p>
    </div>
  );
}

export default HomeLogin;
