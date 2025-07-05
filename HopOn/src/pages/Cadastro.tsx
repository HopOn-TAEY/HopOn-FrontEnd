import "./../App.css";

function Cadastrar() {
  return (
    <div className="w-screen h-screen bg-folha flex justify-center p-6 font-poppins">
      <div className="m-auto bg-white rounded-md mt-[3%] p-[1.5%] w-[35%]">
        <h1 className="text-center text-4xl font-bold pt-[1%] mb-[2%] mt-10">
          Crie sua conta
        </h1>
        <h5 className="mb-[2%] text-center">
          Encontre viagens de forma prática
        </h5>
        <form action="X" method="post">
          <div className="w-[80%] m-auto mb-[2%] mt-5">
            <label htmlFor="nome" className="text-sm font-semibold">
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Digite seu nome..."
              required
            />
          </div>

          <div className="w-[80%] m-auto mb-[2%]">
            <label htmlFor="email" className="text-sm font-semibold">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Digite seu e-mail..."
              required
            />
          </div>
          <div className="w-[80%] m-auto mb-[2%] flex justify-between items-center gap-x-6">
            <div className="w-[80%] m-auto mb-[2%]">
              <label htmlFor="senha" className="text-sm font-semibold">
                Senha
              </label>
              <input
                id="senha"
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Digite sua senha..."
                required
              />
            </div>

            <div className="w-[80%] m-auto mb-[2%]">
              <label htmlFor="confirmarSenha" className="text-sm font-semibold">
                Confirmar senha
              </label>
              <input
                id="confirmarSenha"
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Digite novamente sua senha..."
                required
              />
            </div>
          </div>

          <div className="w-[80%] m-auto mb-5 text-left flex items-center">
            <input type="checkbox" id="termos" className="mr-2" required />
            <label htmlFor="termos" className="text-sm">
              Li e aceito os{" "}
              <a href="#" className="text-folha hover:underline">
                termos de uso
              </a>{" "}
              e a{" "}
              <a href="#" className="text-folha hover:underline">
                política de privacidade
              </a>
              .
            </label>
          </div>
          <div className="justify-center flex items-center mb-5">
            <input
              type="submit"
              value={"Cadastrar"}
              className="w-[30%] bg-folha place-content-center text-white p-2 rounded-md cursor-pointer hover:bg-green-700 transition-colors duration-300"
            />
          </div>
        </form>
        <h5 className="text-center">
          Já tem uma conta?{" "}
          <a href="#" className="text-folha hover:underline">
            Faça login
          </a>
        </h5>
      </div>
    </div>
  );
}

export default Cadastrar;
