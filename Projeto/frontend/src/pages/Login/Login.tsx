import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/AuthProvider";
import { User } from "../../models/UserModel";

export default function Login() {
  const { login } = useContext(Context);
  const [user, setuser] = useState<User>({} as User);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setuser({ ...user, [id]: value });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login(user.email, user.password);
  }

  return (
    <div className="w-full md:flex items-center mt-3 flex-col max-w-7xl">
      <div className="mb-4">
        <h1 className="font-bold text-4xl">Faça login</h1>
      </div>
      <form className="w-[350px]" onSubmit={handleSubmit}>
        <div className="w-100 mb-3">
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Digite seu email"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="w-100 mb-3">
          <label
            htmlFor="password"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            className="max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Digte sua senha"
            onChange={handleOnChange}
            required
          />
        </div>
        <input
          type="submit"
          className="w-full mt-5 mt-3 mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          value="Entrar"
        />
        <p>
          {" "}
          Não possui uma conta?{" "}
          <Link className="text-teal-900 hover:text-sky-500" to="/register">
            Clique aqui
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
