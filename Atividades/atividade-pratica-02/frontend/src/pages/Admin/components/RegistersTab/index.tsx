import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import TableRegisters from "../../../../components/Tables/Registers";
import { Equipment } from "../../../../interfaces/Equipment";
import { Register } from "../../../../interfaces/Register";
import api from "../../../../service/api";
import { formatDate } from "../../../../utils/formatter";

const inputClasses =
  "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer";

const labelClasses =
  "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";

const inputWrapperClasses = "relative z-0 w-full group";

const RegistersTab: React.FC = () => {
  const [editing, setEditing] = useState<Register | null>(null);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const equipmentRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);
    try {
      if (editing) {
        await api.put(`/registers/${editing.id}`, {
          ...formProps,
          type: Number(formProps.type),
          limit: formatDate(formProps.limit as string),
        });
        toast.success("Equipamento atualizado com sucesso!");
        setEditing(null);
      } else {
        await api.post("/registers/new", {
          ...formProps,
          type: Number(formProps.type),
          limit: formatDate(formProps.limit as string),
        });
        toast.success("Criado com sucesso!");
      }
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  const handleDeleteRegister = async (id: string) => {
    try {
      await api.delete(`/registers/${id}`);
      toast.success("Deletado com sucesso!");
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  const getEquipments = async () => {
    try {
      const response = await api.get("/equipments");
      const { data } = response;
      setEquipments(data);
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  const onUpdate = async (equipment: Register) => {
    setEditing(equipment);
    if (descriptionRef.current)
      descriptionRef.current.value = equipment.description;
    if (dateRef.current)
      dateRef.current.value = new Date(equipment.limit)
        .toISOString()
        .substring(0, 10);
    if (equipmentRef.current)
      equipmentRef.current.value = equipment.equipment.id;
    if (typeRef.current) typeRef.current.value = equipment.type.toString();
  };

  useEffect(() => {
    getEquipments();
    return () => {
      setEquipments([]);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center space-y-10 w-full">
      <form onSubmit={handleSubmit} className="w-full flex ">
        <div className="w-full flex items-center space-x-6">
          <div className={inputWrapperClasses}>
            <input
              name="description"
              className={inputClasses}
              placeholder=" "
              required
              ref={descriptionRef}
            />
            <label htmlFor="description" className={labelClasses}>
              Descrição
            </label>
          </div>
          <div className={inputWrapperClasses}>
            <input
              type="date"
              name="limit"
              className={inputClasses}
              placeholder=" "
              required
              ref={dateRef}
            />
            <label htmlFor="limit" className={labelClasses}>
              Data limite
            </label>
          </div>
          <div className={inputWrapperClasses}>
            <label htmlFor="type" className={labelClasses}>
              Escolha um tipo
            </label>
            <select
              ref={typeRef}
              id="type"
              name="type"
              className={inputClasses}
            >
              <option selected disabled>
                Escolha um tipo
              </option>
              <option value={1}>Preventiva</option>
              <option value={2}>Corretiva</option>
              <option value={3}>Urgente</option>
            </select>
          </div>
          <div className={inputWrapperClasses}>
            <label htmlFor="equipmentId" className={labelClasses}>
              Escolha um equipamento
            </label>
            <select
              ref={equipmentRef}
              id="equipmentId"
              name="equipmentId"
              className={inputClasses}
            >
              <option selected disabled>
                Escolha um tipo
              </option>
              {equipments.map((equipment) => (
                <option key={equipment.id} value={equipment.id}>
                  {equipment.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto ml-4 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <TableRegisters
        handleUpdate={onUpdate}
        handleDelete={handleDeleteRegister}
        hasActions
      />
    </div>
  );
};
export default RegistersTab;
