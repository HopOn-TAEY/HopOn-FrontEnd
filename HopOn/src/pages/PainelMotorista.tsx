import { useNavigate } from "react-router-dom";

function PainelMotorista() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#658761] font-poppins flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow p-8 max-w-md w-full flex flex-col gap-6 items-center">
        <h1 className="text-2xl font-bold mb-4 text-folha">Painel do Motorista</h1>
        <button
          className="w-full bg-[#648D6E] hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300"
          onClick={() => navigate('/minhas-corridas')}
        >
          Minhas Corridas
        </button>
        <button
          className="w-full bg-[#648D6E] hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300"
          onClick={() => navigate('/solicitacoes-privadas-motorista')}
        >
          Solicitações
        </button>
        <button
          className="w-full bg-[#648D6E] hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300"
          onClick={() => navigate('/corridas-finalizadas-usuario')}
        >
          Corridas Finalizadas
        </button>
        <button
          className="w-full mt-4 bg-green-400 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          onClick={() => navigate('/')}
        >
          Voltar para o Menu
        </button>
      </div>
    </div>
  );
}

export default PainelMotorista; 