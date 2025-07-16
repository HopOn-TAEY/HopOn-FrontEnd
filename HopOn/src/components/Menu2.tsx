import { FaChevronDown } from "react-icons/fa";

function Menu() {
  return (
    <div className="w-full bg-white px-6 py-3 flex justify-between items-center">
      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Pesquisar..."
        className="bg-white text-gray-700 border border-gray-200 rounded-full px-5 py-2 w-64 shadow-sm focus:outline-none focus:ring-1 focus:ring-folha"
      />

      {/* Botão de perfil */}
      <div className="bg-white rounded-full px-4 py-2 flex border border-gray-200 items-center gap-3 shadow cursor-pointer hover:shadow-md transition">
        <div className="w-6 h-6 rounded-full bg-gray-400" />
        <div className="text-left text-sm">
          <p className="text-gray-800 font-medium leading-none">Nome</p>
          <p className="text-gray-500 text-xs">Motorista</p>
        </div>
        <FaChevronDown className="text-gray-500 text-xs" />
      </div>
    </div>
  );
}

export default Menu;
