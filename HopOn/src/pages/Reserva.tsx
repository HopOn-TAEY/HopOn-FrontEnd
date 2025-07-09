import { useParams } from "react-router-dom";

function Reserva() {
  const { corridaId } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Editar Reserva</h1>
      <p>ID da Corrida: {corridaId}</p>
      {}
    </div>
  );
}

export default Reserva; 