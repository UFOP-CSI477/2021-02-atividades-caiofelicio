import Logo from "../../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/AuthProvider";
import jwt from "jwt-decode";
import api from "../../services/api";
import { errorToast } from "../../utils/showToastNotification";
import { User } from "../../models/UserModel";

interface IToken {
  id: string;
}

export default function Navbar() {
  const { logout, authenticated } = useContext(Context);
  const [user, setUser] = useState({} as User);
  const { pathname } = useLocation();
  const token = localStorage.getItem("token") as string;

  async function findUser(id: string) {
    try {
      const { data } = await api.get(`/users/${id}`);
      setTimeout(() => {}, 500);
      setUser(data);
    } catch (error: any) {
      errorToast(error.response.data.error);
    }
  }

  useEffect(() => {
    if (authenticated) {
      const { id } = jwt(token) as IToken;
      findUser(id);
    }
  }, [token]);

  return (
    <nav className="bg-yellow-400 border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
      <div className="container h-2 flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Adopt" />
        </Link>
        <div className="flex items-center md:order-2">
          {authenticated ? (
            <>
              <button
                className="`block pr-4 pl-3 text-sm bg-transparent rounded"
                aria-current="page"
                onClick={logout}
              >
                Logout
              </button>
              <Link
                to="/user/profile"
                className={`block pr-4 pl-3 text-sm ${
                  pathname === "/user/profile" ? "text-blue-700" : "text-black"
                } bg-transparent rounded`}
                aria-current="page"
              >
                Perfil
              </Link>

              <img
                className="w-8 h-8 rounded-full"
                src={user.image}
                alt={user.name}
              />
            </>
          ) : (
            <Link
              to="/login"
              className={`block pr-4 pl-3 text-sm ${
                pathname === "/login" ? "text-blue-700" : "text-black"
              } bg-transparent rounded`}
              aria-current="page"
            >
              Login
            </Link>
          )}
        </div>
        <div
          className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link
                to="/"
                className={`block pr-4 pl-3 text-sm ${
                  pathname === "/" ? "text-blue-700" : "text-black"
                } bg-transparent rounded`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {authenticated ? (
              <>
                <li>
                  <Link
                    to="/pet/new"
                    className={`block pr-4 pl-3 text-sm ${
                      pathname === "/pet/new" ? "text-blue-700" : "text-black"
                    } bg-transparent rounded`}
                    aria-current="page"
                  >
                    Cadastrar pet
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/register"
                  className={`block pr-4 text-sm pl-3 ${
                    pathname === "/register" ? "text-blue-700" : "text-black"
                  } bg-transparent rounded`}
                  aria-current="page"
                >
                  Cadastro
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
