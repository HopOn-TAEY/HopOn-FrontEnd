import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./../App.css";

function Menu() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

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

          {/* Barra de pesquisa */}
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          {/* Botões */}
          <div className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <span className="px-4 py-2 text-gray-600">
                  Olá, {user?.nome}
                </span>
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
            onClick={() => window.scrollTo({ top: 1000, behavior: "smooth" })}
            className="hover:underline"
          >
            Como funciona
          </button>
          {isAuthenticated && user?.tipo === 'motorista' ? (
            <button
              onClick={() => navigate("/cadastrarviagem")}
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
