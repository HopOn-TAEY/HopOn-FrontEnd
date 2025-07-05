import "./../App.css";

function Menu2() {
  return (
    <div className="font-poppins">
      {/* Menu superior */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <div className="text-4xl font-bold text-slate-950">HopOn</div>

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 relative">
            <a href="#" className="hover:underline">
              Início
            </a>
            <a href="#" className="hover:underline">
              Sobre
            </a>

            <a href="#" className="hover:underline">
              Procurar
            </a>

            <a href="#" className="hover:underline">
              Oferecer carona
            </a>
          </div>

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
    </div>
  );
}

export default Menu2;
