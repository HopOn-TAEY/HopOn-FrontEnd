import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Cadastrar from "../pages/Cadastro";
import Login from "../pages/Login";
import Solicitar from "../pages/Solicitar";
import CadastrarViagem from "../pages/CadastroViagem";
import CadastroVeiculo from "../pages/CadastroVeiculo";
import Pesquisar from "../components/Pesquisa";
// import Perfil from "../pages/Perfil";
import Debug from "../pages/Debug";
import Reserva from "../pages/Reserva";
import Perfil from "../pages/Perfil";
import MeusVeiculos from "../pages/MeusVeiculos";
import Motoristas from "../pages/Motoristas";
import PerfilMotorista from "../pages/PerfilMotorista";
import SolicitarCorrida from "../pages/SolicitarCorrida";
import ProtectedRoute from "../components/ProtectedRoute";

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
    element: (
      <ProtectedRoute requiredUserType="motorista">
        <CadastrarViagem />
      </ProtectedRoute>
    ),
    path: "cadastrarviagem",
  },
  {
    element: (
      <ProtectedRoute requiredUserType="motorista">
        <CadastroVeiculo />
      </ProtectedRoute>
    ),
    path: "cadastrar-veiculo",
  },
  {
    element: <Pesquisar />,
    path: "pesquisa",
  },
  {
    element: (
      <ProtectedRoute>
        <Perfil />
      </ProtectedRoute>
    ),
    path: "perfil",
  },
  {
    element: (
      <ProtectedRoute requiredUserType="motorista">
        <MeusVeiculos />
      </ProtectedRoute>
    ),
    path: "meus-veiculos",
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
    element: <Motoristas />,
    path: "motoristas",
  },
  {
    element: <PerfilMotorista />,
    path: "perfil-motorista/:id",
  },
  {
    element: <SolicitarCorrida />,
    path: "solicitar-corrida/:id",
  }
]);
