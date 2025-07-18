import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { avaliarMotorista } from "../api/corridas";
import "./../App.css";

function Avaliacao() {
  const { id: corridaId } = useParams();
  const [comentario, setComentario] = useState("");
  const [estrelas, setEstrelas] = useState(0);
  const [avaliacaoEnviada, setAvaliacaoEnviada] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    if (estrelas === 0) {
      setErro("Dê uma nota para o motorista.");
      return;
    }
    setLoading(true);
    try {
      await avaliarMotorista(corridaId!, estrelas, comentario);
      setAvaliacaoEnviada(true);
    } catch (err: any) {
      setErro(err.message || "Erro ao enviar avaliação");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setComentario("");
    setEstrelas(0);
    setErro(null);
  };

  return (
    <div className="min-h-screen bg-folha flex items-center justify-center p-8 font-poppins text-gray-800">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Avaliar Motorista</h1>
        <h5 className="text-gray-600 mb-6 text-center">
          Deixe sua avaliação sobre sua experiência com o motorista.
        </h5>

        {!avaliacaoEnviada ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 font-medium">Nota (Estrelas)</label>
              <div className="flex items-center gap-1 text-yellow-500 text-2xl">
                {[1, 2, 3, 4, 5].map((i) =>
                  i <= estrelas ? (
                    <AiFillStar key={i} onClick={() => setEstrelas(i)} className="cursor-pointer" />
                  ) : (
                    <AiOutlineStar key={i} onClick={() => setEstrelas(i)} className="cursor-pointer" />
                  )
                )}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Comentário</label>
              <textarea
                className="w-full border rounded-md p-2 h-32 focus:outline-none focus:ring-2 focus:ring-folha"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
            </div>
            {erro && <div className="text-red-600 text-sm">{erro}</div>}
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="bg-folha text-white px-6 py-2 rounded hover:bg-green-700 transition"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar Avaliação"}
              </button>
              <button
                type="button"
                onClick={handleCancelar}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Obrigado pela sua avaliação!</h2>
            <div className="flex justify-center gap-1 text-yellow-500 text-2xl mb-2">
              {Array.from({ length: estrelas }).map((_, i) => (
                <AiFillStar key={i} />
              ))}
            </div>
            <p className="text-gray-600 italic mt-1">"{comentario}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Avaliacao;
