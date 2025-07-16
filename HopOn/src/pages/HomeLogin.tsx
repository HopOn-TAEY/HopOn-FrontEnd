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

      {/* Seção com sugestões rápidas */}
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

      {/* Rodapé */}
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

export default HomeLogin;