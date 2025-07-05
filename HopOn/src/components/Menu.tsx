import "./../App.css";

function Menu() {
  return (
    <div className="font-poppins">
      {/* Menu superior */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          {/* Logo */}
          <div className="text-4xl font-bold text-slate-950 pr-[5%]">HopOn</div>

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
            <button className="px-4 py-2 text-folha border border-folha rounded hover:bg-folha hover:text-white transition">
              Entrar
            </button>
            <button className="px-4 py-2 text-white border border-folha bg-folha rounded hover:bg-white hover:text-folha transition">
              Cadastrar
            </button>
          </div>
        </div>
      </nav>

      {/* Segundo menu com submenu */}
      <nav className="bg-white text-folha p-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 relative">
          <a href="#" className="hover:underline">
            Início
          </a>
          <a href="#" className="hover:underline">
            Como funciona
          </a>

          <a href="#" className="hover:underline">
            Para motoristas
          </a>

          <a href="#" className="hover:underline">
            Para passageiros
          </a>
          <a href="#" className="hover:underline">
            Sobre nós
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Menu;
