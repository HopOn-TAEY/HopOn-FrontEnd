import { useForm, SubmitHandler } from "react-hook-form";
import "./../App.css";

interface LoginFormInputs {
  email: string;
  senha: string;
  lembrar: boolean;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Dados enviados:", data);
  };

  return (
    <div className="w-screen h-screen bg-folha flex justify-center p-6 font-poppins">
      <div className="m-auto bg-white rounded-md mt-[3%] p-[1.5%] w-[35%]">
        <h1 className="text-center text-4xl font-bold pt-[1%] mb-[2%] mt-10">
          Bem-vindo de volta!
        </h1>
        <h5 className="mb-[5%] text-center">
          Faça login para encontrar ou oferecer viagens
        </h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[80%] m-auto mb-[2%] mt-5">
            <label htmlFor="email" className="text-sm font-semibold">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Digite seu e-mail..."
              {...register("email", {
                required: "Email é obrigatório",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Formato de email inválido",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="w-[80%] m-auto mb-[2%]">
            <label htmlFor="senha" className="text-sm font-semibold">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Digite sua senha..."
              {...register("senha", {
                required: "Senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha deve ter ao menos 6 caracteres",
                },
              })}
            />
            {errors.senha && (
              <p className="text-red-600 text-sm mt-1">{errors.senha.message}</p>
            )}
          </div>

          <div className="w-[80%] m-auto mb-5 justify-between flex items-center">
            <div className="w-[80%] m-auto mb-5 text-left flex items-center">
              <input
                type="checkbox"
                id="lembrar"
                className="mr-2"
                {...register("lembrar")}
              />
              <label htmlFor="lembrar" className="text-sm">
                Lembrar de mim
              </label>
            </div>

            <div className="w-[80%] m-auto mb-5 text-right">
              <a href="#" className="text-sm text-folha hover:underline">
                Esqueceu a senha?
              </a>
            </div>
          </div>

          <div className="justify-center flex items-center mb-5">
            <input
              type="submit"
              value={"Entrar"}
              className="w-[30%] bg-folha place-content-center text-white p-2 rounded-md cursor-pointer hover:bg-green-700 transition-colors duration-300"
            />
          </div>
        </form>

        <div className="text-center mb-5">
          <h5 className="text-sm">
            Não tem uma conta?{" "}
            <a href="/" className="text-folha hover:underline">
              Cadastre-se
            </a>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Login;
