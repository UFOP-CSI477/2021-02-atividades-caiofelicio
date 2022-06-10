import { useContext } from "react";
import { useState } from "react";
import { Context } from "../../../context/AuthProvider";

export default function CreatePet() {

  const [images, setImages] = useState<File[]>([])
  const { createPet } = useContext(Context)

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    const toArray = Array.from(files)
    setImages(toArray)
  }


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i])
    }

    createPet(formData)
  }


  return (
    <div className="w-full md:flex items-center mt-3 flex-col max-w-7xl">
      <div className="mb-4">
        <h1 className="font-bold text-4xl mb-3">Cadstre seu pet para adoção</h1>
      </div>
      <form className="w-[350px]" onSubmit={handleSubmit}>
        <div className="w-100 mb-3">
          <label htmlFor="photos" className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Fotos do pet</label>
          <input type="file" id="photos" className="max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" max="3" placeholder="Escolha uma foto de perfil" onChange={handleImageChange} multiple />
          <p className="text-xs mt-0.5 text-sky-500" >Máx 3 fotos</p>
        </div>
        <div className="w-100 mb-3">
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Nome</label>
          <input type="text" id="name" name="name" className="max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nome do pet" />
        </div>
        <div className="w-100 mb-3">
          <label htmlFor="age" className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Idade</label>
          <input type="number" min="0" id="age" name="age" className="max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Idade do pet" />
        </div>
        <div className="w-100 mb-3">
          <label htmlFor="type" className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Tipo</label>
          <select id="type" className="max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Idade do pet" name="type">
            <option defaultValue="cachorro">Cachorro</option>
            <option defaultValue="gato">Gato</option>
            <option defaultValue="passaro">Pássaro</option>
            <option defaultValue="outro">Outro</option>
          </select>
        </div>
        <input type="submit" className="w-full mt-5 mt-3 mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" value="Cadastrar pet" />
      </form>
    </div >
  )
}