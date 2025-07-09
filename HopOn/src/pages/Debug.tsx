import { useNavigate } from 'react-router-dom';

function Debug() {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Página de Debug</h1>
      <p className="mb-4">Esta página foi carregada com sucesso!</p>
      
      <div className="space-y-2">
        <button 
          onClick={() => navigate('/')}
          className="block px-4 py-2 bg-blue-500 text-white rounded"
        >
          Ir para Home (/)
        </button>
        
        <button 
          onClick={() => navigate('/home')}
          className="block px-4 py-2 bg-green-500 text-white rounded"
        >
          Ir para Home (/home)
        </button>
        
        <button 
          onClick={() => navigate('/cadastrar')}
          className="block px-4 py-2 bg-purple-500 text-white rounded"
        >
          Ir para Cadastro
        </button>
      </div>
    </div>
  );
}

export default Debug; 