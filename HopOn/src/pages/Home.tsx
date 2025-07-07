import { useNavigate } from "react-router-dom";
import "./../App.css";
import Menu from "./../components/Menu";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Menu />

      {/* Seção inicial com imagem de fundo */}
      <div className="pt-20 pb-20 bg-red-500 bg-[url(/assets/paisagem2.jpeg)] justify-center p-6 font-poppins bg-no-repeat bg-cover bg-center">
        <h1 className="m-auto text-5xl text-white w-[40%] text-center">
          Viajar ficou mais fácil, econômico e divertido
        </h1>
        <h3 className="m-auto text-2xl text-white w-[35%] text-center mt-5">
          Encontre ou ofereça caronas com praticidade
        </h3>
        <div className="m-auto w-[25%] justify-between flex items-center mt-5">
          <button
            onClick={() => navigate("/pesquisa")}
            className="bg-folha text-white rounded-md p-3"
          >
            Procurar Carona
          </button>
          <button
            onClick={() => navigate("/cadastrarviagem")}
            className="bg-folha text-white rounded-md p-3"
          >
            Oferecer Carona
          </button>
        </div>
      </div>

      {/* Seção: Como funciona */}
      <div className="pt-20 bg-gray-300 justify-center p-6 font-poppins">
        <h1 className="m-auto text-5xl w-[40%] text-center">
          Como funciona?
        </h1>

        <div className="flex text-center justify-between mt-10 mb-10 pl-28 pr-28">
          <div className="w-96">
            <h2 className="text-3xl">Procure ou ofereça</h2>
            <h4>
              Encontre uma carona para o seu destino ou ofereça vagas disponíveis.
            </h4>
          </div>

          <div className="w-96">
            <h2 className="text-3xl">Combine e viaje</h2>
            <h4>
              Converse com o motorista ou passageiro, alinhe detalhes e aproveite.
            </h4>
          </div>

          <div className="w-96">
            <h2 className="text-3xl">Economize e conheça</h2>
            <h4>
              Divida custos, ajude o meio ambiente e faça novas amizades!
            </h4>
          </div>
        </div>
      </div>

      {/* Seção: Porque usar nosso sistema */}
      <div className="pt-20 bg-folha justify-center p-6 font-poppins text-white">
        <h1 className="m-auto text-5xl w-[60%] text-center">
          Porque usar nosso sistema?
        </h1>

        <div className="flex text-center justify-between mt-10 mb-10 pl-28 pr-28">
          <div className="w-96">
            <h2 className="text-3xl">Economia de dinheiro</h2>
          </div>

          <div className="w-96">
            <h2 className="text-3xl">Menos emissão de carbono</h2>
          </div>
        </div>

        <div className="flex text-center justify-between mt-10 mb-10 pl-28 pr-28">
          <div className="w-96">
            <h2 className="text-3xl">Mais privacidade em viagens</h2>
          </div>

          <div className="w-96">
            <h2 className="text-3xl">Mais segurança</h2>
          </div>
        </div>
      </div>

      {/* Seção final com chamada para ação */}
      <div className="pt-20 pb-20 bg-red-500 bg-[url(/assets/paisagem2.jpeg)] justify-center p-6 font-poppins bg-no-repeat bg-cover bg-center">
        <h1 className="m-auto text-5xl text-white w-[50%] text-center">
          Pronto para pegar estrada?
        </h1>

        <div className="m-auto w-[25%] justify-between flex items-center mt-5">
          <button
            onClick={() => navigate("/cadastrar")}
            className="bg-folha text-white rounded-md p-3"
          >
            Cadastre-se gratuitamente
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
