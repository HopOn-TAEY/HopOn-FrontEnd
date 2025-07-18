import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import "./../App.css";

function Footer() {
  return (
    <footer className="bg-folha text-white font-poppins">
      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-10">
        {/* Logo + descrição (50%) */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">HopOn</h2>
          <p className="text-sm mb-4 max-w-md">
            Conectando pessoas, criando oportunidades, facilitando a mobilidade e transformando vidas. HopOn é mais do que um aplicativo de transporte, é uma comunidade que se move junta.
          </p>
          <div className="flex gap-4 text-white text-lg">
            <a href="#"><FaFacebookF className="hover:text-gray-200 transition" /></a>
            <a href="#"><FaInstagram className="hover:text-gray-200 transition" /></a>
            <a href="#"><FaTwitter className="hover:text-gray-200 transition" /></a>
          </div>
        </div>

        {/* Quem somos (25%) */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold mb-4">Quem somos?</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Sobre nós</a></li>
            <li><a href="#" className="hover:underline">Termos de serviço</a></li>
            <li><a href="#" className="hover:underline">Política de privacidade</a></li>
            <li><a href="#" className="hover:underline">Termos de Uso</a></li>
          </ul>
        </div>

        {/* Contato (25%) */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold mb-4">Contato</h3>
          <p className="text-sm mb-1">starte@gmail.com</p>
          <p className="text-sm">(85) 90000-0000</p>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="text-center text-xs text-white py-4 border-t border-white/20">
        © {new Date().getFullYear()} | Todos os direitos reservados
      </div>
    </footer>
  );
}

export default Footer;
