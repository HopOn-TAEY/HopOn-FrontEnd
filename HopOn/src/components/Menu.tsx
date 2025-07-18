import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FiBell } from "react-icons/fi";
import { listarNotificacoes, marcarNotificacaoComoLida, marcarTodasComoLidas } from "../api/notificacoes";
import "./../App.css";

function Menu() {
  const navigate = useNavigate();
  const [showNotificacoes, setShowNotificacoes] = useState(false);
  const [notificacoes, setNotificacoes] = useState([]);
  const [naoLidas, setNaoLidas] = useState(0);
  const { isAuthenticated, user } = useAuth();

  async function fetchNotificacoes() {
    try {
      const data = await listarNotificacoes({ limit: 10 });
      setNotificacoes(data.notificacoes || []);
      setNaoLidas((data.notificacoes || []).filter((n: any) => !n.lida).length);
    } catch (e) {
      setNotificacoes([]);
      setNaoLidas(0);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotificacoes();
      const interval = setInterval(fetchNotificacoes, 15000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleSinoClick = () => {
    setShowNotificacoes((v) => !v);
    if (naoLidas > 0) {
      marcarTodasComoLidas().then(fetchNotificacoes);
    }
  };

  return (
    <div className="font-poppins">
      {/* Menu superior */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          {/* Logo */}
          <div
            className="text-4xl font-bold text-slate-950 pr-[5%] cursor-pointer"
            onClick={() => navigate("/")}
          >
            HopOn
          </div>

          {/* Botões */}
          <div className="flex space-x-4 items-center">
            {isAuthenticated ? (
              <>
                <span className="px-4 py-2 text-gray-600">
                  Olá, {user?.nome}
                </span>
                {/* Ícone de sino */}
                <div className="relative">
                  <button
                    className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                    onClick={handleSinoClick}
                  >
                    <FiBell size={24} />
                    {naoLidas > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                        {naoLidas}
                      </span>
                    )}
                  </button>
                  {/* Pop-up de notificações */}
                  {showNotificacoes && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded shadow-lg z-50 max-h-96 overflow-y-auto">
                      <div className="p-4 border-b font-semibold">Notificações</div>
                      {notificacoes.length === 0 ? (
                        <div className="p-4 text-gray-500">Nenhuma notificação.</div>
                      ) : (
                        notificacoes.map((n: any) => (
                          <div key={n.id} className={`p-4 border-b last:border-b-0 ${n.lida ? 'bg-white' : 'bg-gray-100'}`}>
                            <div className="font-bold text-sm mb-1">{n.titulo}</div>
                            <div className="text-xs text-gray-700 mb-1">{n.mensagem}</div>
                            <div className="text-[10px] text-gray-400">{new Date(n.criadoEm).toLocaleString()}</div>
                            {!n.lida && (
                              <button
                                className="mt-2 px-2 py-1 text-xs bg-folha text-white rounded hover:bg-folha/80 transition"
                                onClick={async () => {
                                  await marcarNotificacaoComoLida(n.id);
                                  fetchNotificacoes();
                                }}
                              >
                                Marcar como lida
                              </button>
                            )}
                            {n.tipo === 'CORRIDA_FINALIZADA' && n.corridaId && (
                              <button
                                className="mt-2 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                onClick={() => navigate(`/avaliar/${n.corridaId}`)}
                              >
                                Avaliar motorista
                              </button>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => navigate("/perfil")}
                  className="px-4 py-2 text-folha border border-folha rounded hover:bg-folha hover:text-white transition"
                >
                  Perfil
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-folha border border-folha rounded hover:bg-folha hover:text-white transition"
                >
                  Entrar
                </button>
                <button
                  onClick={() => navigate("/cadastrar")}
                  className="px-4 py-2 text-white border border-folha bg-folha rounded hover:bg-white hover:text-folha transition"
                >
                  Cadastrar
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Segundo menu com submenu */}
      <nav className="bg-white text-folha p-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 relative">
          <button
            onClick={() => navigate("/")}
            className="hover:underline"
          >
            Início
          </button>
          <button
            onClick={() => window.scrollTo({ top: 500, behavior: "smooth" })}
            className="hover:underline"
          >
            Como funciona
          </button>
          {isAuthenticated && user?.tipo === 'motorista' ? (
            <button
              onClick={() => navigate("/painel-motorista")}
              className="hover:underline"
            >
              Para motoristas
            </button>
          ) : (
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  alert("Você precisa estar logado para acessar as funcionalidades de motorista.");
                  navigate("/login");
                } else {
                  alert("Apenas motoristas podem acessar esta funcionalidade.");
                }
              }}
              className="hover:underline opacity-50 cursor-not-allowed"
            >
              Para motoristas
            </button>
          )}
          <button
            onClick={() => navigate("/motoristas")}
            className="hover:underline"
          >
            Para passageiros
          </button>
          <button
            onClick={() => alert("Sobre nós em breve...")}
            className="hover:underline"
          >
            Sobre nós
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Menu;
