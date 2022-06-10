import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { errorToast } from "../../utils/showToastNotification";

interface IPetResponse {
  _id: string;
  name: string;
  age: number;
  type: string;
  available: boolean;
  images: string[];
  user: Object;
}

export default function Home() {
  const [pets, setPets] = useState([] as IPetResponse[]);

  async function fetchPets() {
    try {
      const { data } = await api.get("/pets", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPets(data);
    } catch (err: any) {
      errorToast(err.response.data.message);
    }
  }

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div
      className={
        pets.length
          ? "w-full grid grid-cols-4 gap-x-5 items-center mt-3 flex-col max-w-7xl"
          : "flex justify-center items-center"
      }
    >
      {pets.length ? (
        pets.map((pet) => (
          <div className="max-w-sm bg-white mb-7 w-full rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <img
              className="rounded-t-lg object-cover w-full h-48"
              src={pet.images[0]}
              alt={pet.name}
            />
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {pet.name}
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Espécie: <strong>{pet.type}</strong>
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Idade: <strong>{pet.age}</strong>
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Disponível p/ adoção:{" "}
                {pet.available ? (
                  <strong className="text-green-500">Sim</strong>
                ) : (
                  <strong className="text-red-500">Não</strong>
                )}
              </p>
              {pet.available ? (
                <button>
                  <Link
                    to={`/pet/${pet._id}`}
                    className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Visualizar
                    <svg
                      className="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                </button>
              ) : pet.available ? (
                <button>
                  <Link
                    to={`/pet/${pet._id}`}
                    className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Visualizar
                    <svg
                      className="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                </button>
              ) : (
                <button className="cursor-not-allowed">
                  <Link
                    to={`/pet/${pet._id}`}
                    className="inline-flex pointer-events-none opacity-75 items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Visualizar
                    <svg
                      className="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center flex-col mt-[100px]">
          <h1 className="font-bold text-xl mb-5">Nenhum pet encontrado :( </h1>
          <h2>Todos os pet cadastrados serão listados aqui</h2>
        </div>
      )}
    </div>
  );
}
