import { useNavigate } from "react-router-dom";
import "./../App.css";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

// Importando ícones da biblioteca lucide-react
import {
  PiggyBank,
  Leaf,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Menu />

      {/* Seção inicial com imagem de fundo */}
      <div className="pt-20 pb-20 bg-red-500 bg-[url(/assets/paisagem2.jpeg)] justify-center p-6 font-poppins bg-no-repeat bg-cover bg-center">
        <h1 className="m-auto text-5xl text-white w-full max-w-4xl text-center px-4">
          Viajar ficou mais fácil, econômico e divertido
        </h1>
        <h3 className="m-auto text-2xl text-white w-full max-w-3xl text-center mt-5 px-4">
          Encontre ou ofereça caronas com praticidade
        </h3>
        <div className="m-auto w-full max-w-md flex justify-between items-center mt-5 px-4">
          <button
            onClick={() => navigate("/pesquisa")}
            className="bg-folha text-white rounded-md p-3 flex-1 mx-5"
          >
            Procurar Carona
          </button>
          <button
            onClick={() => navigate("/cadastrarviagem")}
            className="bg-folha text-white rounded-md p-3 flex-1 mx-5"
          >
            Oferecer Carona
          </button>
        </div>
      </div>

      {/* Seção: Como funciona */}
      <div className="pt-20 pb-20 bg-gray-300 justify-center p-6 font-poppins">
        <h1 className="m-auto text-5xl w-full max-w-4xl text-center px-4">
          Como funciona?
        </h1>

        <div className="flex flex-col md:flex-row text-center justify-between mt-10 mb-10 px-4 max-w-7xl mx-auto gap-10">
          <div className="flex-1">
            <h2 className="text-3xl mb-3">Procure ou ofereça</h2>
            <p>
              Encontre uma carona para o seu destino ou ofereça vagas disponíveis.
            </p>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl mb-3">Combine e viaje</h2>
            <p>
              Converse com o motorista ou passageiro, alinhe detalhes e aproveite.
            </p>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl mb-3">Economize e conheça</h2>
            <p>
              Divida custos, ajude o meio ambiente e faça novas amizades!
            </p>
          </div>
        </div>
      </div>

      {/* Seção: Porque usar nosso sistema */}
      <div className="pt-20 bg-folha justify-center p-6 font-poppins text-white">
        <h1 className="m-auto text-5xl w-full max-w-5xl text-center px-4">
          Porque usar nosso sistema?
        </h1>

        <div className="flex flex-col md:flex-row text-center justify-between mt-10 mb-10 px-4 max-w-7xl mx-auto gap-10">
          <div className="flex-1 flex flex-col items-center">
            <PiggyBank className="w-12 h-12 mb-3" />
            <h2 className="text-3xl">Economia de dinheiro</h2>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <Leaf className="w-12 h-12 mb-3" />
            <h2 className="text-3xl">Menos emissão de carbono</h2>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <UserCheck className="w-12 h-12 mb-3" />
            <h2 className="text-3xl">Mais privacidade em viagens</h2>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <ShieldCheck className="w-12 h-12 mb-3" />
            <h2 className="text-3xl">Mais segurança</h2>
          </div>
        </div>
      </div>

      {/* Seção final com chamada para ação */}
      <div className="min-h-[500px] bg-red-500 bg-[url(/assets/paisagem2.jpeg)] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center p-6 font-poppins">
        <h1 className="text-5xl text-white w-full max-w-3xl text-center px-4">
          Pronto para pegar estrada?
        </h1>

        <div className="w-full max-w-xs flex justify-center items-center mt-10 px-4">
          <button
            onClick={() => navigate("/cadastrar")}
            className="bg-folha text-white rounded-md p-3 w-full"
          >
            Cadastre-se gratuitamente
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
