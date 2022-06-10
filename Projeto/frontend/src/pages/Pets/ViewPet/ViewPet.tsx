import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Whatsapp from "../../../assets/whatsapp.svg";
import Hearth from "../../../assets/hearth.svg";
import { Context } from "../../../context/AuthProvider";
import api from "../../../services/api";
import jwt from "jwt-decode";
import { errorToast, successToast } from "../../../utils/showToastNotification";
import { useNavigate } from "react-router-dom";

interface IPetResponse {
  _id: string;
  name: string;
  age: number;
  type: string;
  available: boolean;
  images: string[];
  user: any;
}

export default function ViewPet() {
  const navigate = useNavigate();
  const { authenticated } = useContext(Context);
  const [pet, setPet] = useState({} as IPetResponse);
  const [form, setForm] = useState(false);
  const { id } = useParams();

  function timeout() {
    setTimeout(() => {
      setForm(true);
    }, 50);
  }

  async function handleAdopt(event: any) {
    const { id: userId } = jwt(localStorage.getItem("token")) as { id: string };
    if (pet.user._id !== userId) {
      await api.put(`/pets/update/${id}`, { available: false });
      successToast("Parabéns! Você adotou um pet!");
      navigate("/");
    } else {
      errorToast("Você não pode adotar seu próprio pet!");
    }
  }

  useEffect(() => {
    async function fetchPet() {
      const { data } = await api.get(`/pets/${id}`);
      setPet(data);
    }
    fetchPet();
    timeout();
  }, [id]);

  return (
    <>
      <div>
        <div className="flex justify-around items-center">
          {pet.images ? (
            pet.images.map((image, index) => (
              <div key={pet._id + index}>
                <div className="mt-8 mb-4">
                  <img
                    src={image}
                    key={index}
                    className="max-w-full object-cover h-auto rounded-xl h-[300px] w-[350px]"
                    alt={pet.name}
                  />
                </div>
              </div>
            ))
          ) : (
            <h1>Carregando as fotos...</h1>
          )}
        </div>
        {form ? (
          <div className="flex justify-center ">
            <form className="mt-10">
              <div className="flex w-[80%]">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="name"
                    key={pet.name}
                    className="block py-2.5 px-0 text-sm hover:cursor-not-allowed text-gray-900 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={pet.name}
                    disabled
                  />
                  <label
                    htmlFor="name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Nome do pet
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    name="age"
                    id="age"
                    className="block hover:cursor-not-allowed py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={pet.age}
                    disabled
                  />
                  <label
                    htmlFor="age"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Idade
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="type"
                    id="type"
                    className="block hover:cursor-not-allowed py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={pet.type}
                    disabled
                  />
                  <label
                    htmlFor="type"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Espécie
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="advertiser"
                      id="advertiser"
                      className="block py-2.5 px-0 hover:cursor-not-allowed text-sm text-gray-900 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      value={pet.user.name}
                      disabled
                    />
                    <label
                      htmlFor="advertiser"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Anunciante
                    </label>
                  </div>
                </div>
              </div>
              {pet.user.phone && (
                <div className="flex items-start justify-center">
                  <button
                    type="button"
                    className="justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2.5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <a
                      className="flex justify-center items-center w-full"
                      href={`https://api.whatsapp.com/send?1=pt_BR&phone=+55${
                        pet.user.phone
                      }&text=Olá ${
                        pet.user.name.split(" ")[0]
                      }, tenho interesse em realizar a adoção do seu pet`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img className="mr-3" src={Whatsapp} alt="" />
                      Entrar em contato
                    </a>
                  </button>

                  <button
                    type="button"
                    className={`flex justify-center w-full ml-5 items-center text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2.5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                    onClick={handleAdopt}
                    disabled={authenticated ? false : true}
                  >
                    <img
                      className="h-[20px] w-[20px] mr-3"
                      src={Hearth}
                      alt="Hearth logo"
                    />
                    Adotar este pet
                  </button>
                </div>
              )}
            </form>
          </div>
        ) : (
          <span></span>
        )}
      </div>
    </>
  );
}
