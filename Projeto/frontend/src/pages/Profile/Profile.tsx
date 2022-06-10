import { useState, useContext, useEffect, useCallback } from "react";
import { Context } from "../../context/AuthProvider";
import { User } from "../../models/UserModel";
import { errorToast } from "../../utils/showToastNotification";
import jwt from "jwt-decode";
import api from "../../services/api";

export default function Profile() {
  const { update } = useContext(Context);
  const [user, setUser] = useState({} as User);
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState<File[]>([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = localStorage.getItem("token");
  const { id } = jwt(token) as { id: string };

  const fetchUser = useCallback(async () => {
    const { data } = await api.get(`/users/${id}`);
    setUser(data);
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    const images = Array.from(files);
    setImage(images);
    setImagePreview(URL.createObjectURL(images[0]));
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setPassword(value);
  }

  function handleConfirmPassworrdChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target;
    setConfirmPassword(value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    if (password.length >= 6) {
      if (password !== confirmPassword) {
        errorToast("Senhas não conferem");
        return;
      } else {
        formData.set("password", password);
      }
    } else {
      formData.delete("password");
    }

    if (imagePreview) formData.append("image", image[0]);

    update(formData);
  }

  return (
    <div className="w-full md:flex items-center mt-3 flex-col max-w-7xl">
      <div className="mb-4">
        <h1 className="font-bold text-4xl mb-3">Atualize seu perfil</h1>
      </div>
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Foto de perfil"
          className="rounded-full w-[75px] h-[75px] border-2 border-sky-500 p-1"
        />
      ) : (
        <img
          src={user.image}
          alt="Foto de perfil"
          className="rounded-full w-[75px] h-[75px] border-2 border-sky-500 p-1"
        />
      )}
      <form className="w-[350px]" onSubmit={handleSubmit}>
        <div className="w-100 mb-3">
          <label
            htmlFor="photo"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Foto de perfil
          </label>
          <input
            type="file"
            id="photo"
            className="max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Escolha uma foto de perfil"
            onChange={handleImageChange}
          />
        </div>
        <div className="w-100 mb-3">
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Nome
          </label>
          <input
            type="text"
            id="name"
            className="max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 disabled:opacity-75 hover:cursor-not-allowed dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Digite seu nome"
            defaultValue={user.name || ""}
            disabled
          />
        </div>
        <div className="w-100 mb-3">
          <label
            htmlFor="phone"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Telefone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Digite seu telefone"
            defaultValue={user.phone || ""}
          />
        </div>
        <div className="w-100 mb-3">
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 disabled:opacity-75 hover:cursor-not-allowed dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Digite seu email"
            defaultValue={user.email || ""}
            disabled
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
            name="password"
            id="password"
            className="max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Digte sua senha"
            onChange={handlePasswordChange}
          />
        </div>
        <div className="w-100 mb-1.5">
          <label
            htmlFor="confirm_password"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Senha
          </label>
          <input
            type="password"
            id="confirm_password"
            className="max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Confirme sua senha"
            onChange={handleConfirmPassworrdChange}
          />
        </div>
        <input
          type="submit"
          className="w-full mt-5 mt-3 mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          defaultValue="Salvar"
        />
      </form>
    </div>
  );
}
