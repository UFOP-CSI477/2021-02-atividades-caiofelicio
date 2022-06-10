import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Equipment } from '../../../interfaces/Equipment';
import api from '../../../service/api';
import { formatDate } from '../../../utils/formatter';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiEdit3 } from 'react-icons/fi';

interface Props {
  hasActions?: boolean;
  handleDeleteEquipment?: (id: string) => void;
  handleUpdateEquipment?: (equipment: Equipment) => void;
}

const TablesEquipment: React.FC<Props> = ({
  hasActions,
  handleDeleteEquipment,
  handleUpdateEquipment,
}) => {
  const [equipments, setEquipments] = useState([] as Equipment[]);
  const getEquipments = async () => {
    try {
      const response = await api.get('/equipments');
      const { data } = response;
      setEquipments(data);
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    getEquipments();
  }, []);
  return (
    <div className='overflow-x-auto w-full'>
      <h2 className='text-2xl mb-2'>Equipamentos</h2>
      <table className='w-full min-w-[500px] overflow-x-auto whitespace-nowrap text-sm text-left text-gray-500 dark:text-gray-400 border-collapse table-fixed'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th className='px-6 py-3'>Nome do equipamento</th>
            <th className='px-6 py-3 text-center'>Data de criação</th>
            {hasActions && <th className='px-6 py-3 text-center'>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {!equipments.length ? (
            <tr className='bg-gray-800 border-gray-700'>
              <td colSpan={hasActions ? 3 : 2} className='px-6 py-4'>
                <p className='text-center text-gray-500 dark:text-gray-400'>
                  Nenhum equipamento cadastrado
                </p>
              </td>
            </tr>
          ) : (
            equipments.map((equipment: Equipment) => (
              <tr key={equipment.id} className='bg-gray-800 border-gray-700'>
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap'
                >
                  {equipment.name}
                </th>
                <td className='px-6 py-4 text-center'>
                  {formatDate(equipment.createdAt)}
                </td>
                {hasActions && (
                  <td className='px-6 py-4 text-center'>
                    <button
                      onClick={handleUpdateEquipment?.bind(this, equipment)}
                      aria-label='Editar equipamento'
                      className='text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800'
                    >
                      <FiEdit3 />
                    </button>
                    <button
                      onClick={handleDeleteEquipment?.bind(this, equipment.id)}
                      aria-label='Excluir equipamento'
                      className='text-red-700 border border-red-600 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 '
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default TablesEquipment;
