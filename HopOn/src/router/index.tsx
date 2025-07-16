import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Cadastrar from "../pages/Cadastro";
import Login from "../pages/Login";
import Solicitar from "../pages/Solicitar";
import CadastrarViagem from "../pages/CadastroViagem";
import CadastroVeiculo from "../pages/CadastroVeiculo";
import Pesquisar from "../components/Pesquisa";
import Perfil from "../pages/Perfil";
import Debug from "../pages/Debug";
import Reserva from "../pages/Reserva";
import Avaliacao from "../pages/Avaliacao";
import Menu from "../components/Menu";
import HomeLogin from "../pages/HomeLogin";
import Filtros from "../pages/Filtro";

export const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",
  },
  {
    element: <Home />,
    path: "/home",
  },
  {
    element: <Cadastrar />,
    path: "cadastrar",
  },
  {
    element: <Login />,
    path: "login",
  },
  {
    element: <Solicitar />,
    path: "solicitaviagem",
  },
  {
    element: <CadastrarViagem />,
    path: "cadastrarviagem",
  },
  {
    element: <CadastroVeiculo />,
    path: "cadastrar-veiculo",
  },
  {
    element: <Pesquisar />,
    path: "pesquisa",
  },
{
  element: <Perfil />,
  path: "perfil",
},
  {
    element: <Debug />,
    path: "debug",
  },
  {
    element: <Reserva />,
    path: "reserva/:corridaId",
  },
  {
    element: <Avaliacao />,
    path: "avaliacao",
  },
  {
    element: <Menu />,
    path: "menu",
  },
  {
    element: <HomeLogin />,
    path: "home-login",
  },
  {
    element: <Filtros />,
    path: "filtros",
  }
]);
