import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import TablesEquipment from '../../../../components/Tables/Equipments';
import { Equipment } from '../../../../interfaces/Equipment';
import api from '../../../../service/api';

const EquipmentsTab: React.FC = () => {
  const [editing, setEditing] = useState<Equipment | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);
    try {
      if (editing) {
        await api.put(`/equipments/${editing.id}`, formProps);
        toast.success('Equipamento atualizado com sucesso!');
        setEditing(null);
      } else {
        await api.post('/equipments/new', formProps);
        toast.success('Criado com sucesso!');
      }
      if (nameRef.current?.value) {
        nameRef.current.value = '';
      }
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await api.delete(`/equipments/${id}`);
      toast.success('Deletado com sucesso!');
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  const onUpdate = async (equipment: Equipment) => {
    setEditing(equipment);
    if (nameRef.current) {
      nameRef.current.value = equipment.name;
    }
  };

  return (
    <div className='flex flex-col flex-1 items-center space-y-10'>
      <form onSubmit={onSubmit} className='w-[400px] flex space-x-6'>
        <div className='relative z-0 w-full group'>
          <input
            name='name'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
            ref={nameRef}
          />
          <label
            htmlFor='name'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Nome do equipamento
          </label>
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
        >
          Salvar
        </button>
      </form>
      <TablesEquipment
        handleUpdateEquipment={onUpdate}
        handleDeleteEquipment={onDelete}
        hasActions
      />
    </div>
  );
};
export default EquipmentsTab;
