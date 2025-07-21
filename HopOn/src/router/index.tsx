import { createBrowserRouter } from "react-router-dom";
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
import MeusVeiculos from "../pages/MeusVeiculos";
import Motoristas from "../pages/Motoristas";
import PerfilMotorista from "../pages/PerfilMotorista";
import SolicitarCorrida from "../pages/SolicitarCorrida";
import ProtectedRoute from "../components/ProtectedRoute";
import MinhasCorridas from "../pages/MinhasCorridas";
import CorridaDetalhe from '../pages/CorridaDetalhe';
import PainelMotorista from '../pages/PainelMotorista';
import SolicitacoesPrivadasMotorista from '../pages/SolicitacoesPrivadasMotorista';
import DetalheMinhaCorrida from '../pages/DetalheMinhaCorrida';
import DetalheMinhaCorridaPrivada from '../pages/DetalheMinhaCorridaPrivada';
import CorridasFinalizadasUsuario from '../pages/CorridasFinalizadasUsuario';

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
    path: "avaliar/:id",
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
  },
  {
    element: <MinhasCorridas />, 
    path: "minhas-corridas",
  },
  {
    element: <CorridaDetalhe />,
    path: "corrida/:id",
  },
  {
    element: <PainelMotorista />,
    path: "painel-motorista",
  },
  {
    element: <SolicitacoesPrivadasMotorista />,
    path: "solicitacoes-privadas-motorista",
  },
  {
    element: <DetalheMinhaCorrida />,
    path: "minhas-corridas/:id",
  },
  {
    element: <DetalheMinhaCorridaPrivada />,
    path: "minhas-corridas-privadas/:id",
  },
  {
    element: <CorridasFinalizadasUsuario />,
    path: "corridas-finalizadas-usuario",
  },
]);