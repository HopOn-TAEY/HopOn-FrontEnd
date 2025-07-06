import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Cadastrar from "../pages/Cadastro";
import Login from "../pages/Login";
import Solicitar from "../pages/Solicitar";
import CadastrarViagem from "../pages/CadastroViagem";
import Pesquisar from "../components/Pesquisa";
import Perfil from "../pages/Perfil";

export const router = createBrowserRouter([
  {
    element: <Home />,
    path: "home",
  },
  {
    element: <Cadastrar />,
    path: "/",
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
    element: <Pesquisar />,
    path: "pesquisa",
  },
  {
    element: <Perfil />,
    path: "perfil",
  }
]);
