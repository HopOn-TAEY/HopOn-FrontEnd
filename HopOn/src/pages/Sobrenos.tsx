import "./../App.css";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

function Sobre() {
  return (
    <div className="font-poppins">
      <Menu />

      {/* Cabeçalho */}
      <div className="pt-24 pb-20 bg-folha text-white px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Quem somos</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Uma plataforma pensada para unir pessoas, economizar tempo e transformar o jeito que você se move.
        </p>
      </div>

      {/* Bloco: Nossa História */}
      <div className="bg-white py-16 px-6 md:px-20 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-folha mb-4">Nossa história</h2>
          <p className="text-gray-700 text-lg">
            Tudo começou com a necessidade de uma carona. Depois, virou rotina. Hoje, somos uma comunidade
            que conecta motoristas e passageiros todos os dias, promovendo confiança, economia e encontros reais.
          </p>
        </div>
        <div className="md:w-1/2">
          <img src="/assets/travel.svg" alt="História" className="w-full max-h-80 object-contain" />
        </div>
      </div>

      {/* Bloco: Missão + Visão + Valores */}
      <div className="bg-gray-100 py-20 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold text-folha mb-10">Nosso propósito</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <Feature title="Missão" text="Facilitar conexões seguras e acessíveis através de caronas inteligentes." />
          <Feature title="Visão" text="Ser a principal rede de mobilidade colaborativa do país." />
          <Feature title="Valores" text="Comunidade, confiança, economia, sustentabilidade e inclusão." />
        </div>
      </div>

      {/* Bloco: Conexão humana */}
      <div className="bg-white py-16 px-6 md:px-20 flex flex-col md:flex-row-reverse items-center gap-12">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-folha mb-4">Muito além do transporte</h2>
          <p className="text-gray-700 text-lg">
            Aqui, acreditamos que cada viagem é uma oportunidade de trocar ideias, fazer amizades e construir confiança.
            Nossa comunidade cresce com empatia e respeito.
          </p>
        </div>
        <div className="md:w-1/2">
          <img src="/assets/connection.svg" alt="Conexão" className="w-full max-h-80 object-contain" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-full">
      <h3 className="text-xl font-semibold text-folha mb-2">{title}</h3>
      <p className="text-sm text-gray-700">{text}</p>
    </div>
  );
}

export default Sobre;
