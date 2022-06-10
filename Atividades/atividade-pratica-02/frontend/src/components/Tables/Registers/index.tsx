import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiEdit3 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Register } from '../../../interfaces/Register';
import api from '../../../service/api';
import { formatDate } from '../../../utils/formatter';

interface Props {
  hasActions?: boolean;
  handleUpdate?: (register: Register) => void;
  handleDelete?: (id: string) => void;
}

const thClasses = 'px-2 py-3 text-center';
const tdClasses = 'px-2 py-4 text-center truncate';

const TableRegisters: React.FC<Props> = ({
  hasActions,
  handleDelete,
  handleUpdate,
}) => {
  const [registers, setRegisters] = useState([] as Register[]);

  const getRegisters = async () => {
    try {
      const response = await api.get('/registers');
      const { data } = response;
      setRegisters(data);
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  const handleGetRegisterType = (type: number) => {
    switch (type) {
      case 1:
        return 'Preventiva';
      case 2:
        return 'Corretiva';
      case 3:
        return 'Urgente';
      default:
        return 'N/A';
    }
  };

  useEffect(() => {
    getRegisters();
  }, []);
  return (
    <div className='overflow-x-auto w-full'>
      <h2 className='text-2xl mb-2'>Manutenções</h2>
      <table className='w-full min-w-[1100px] overflow-x-auto whitespace-nowrap text-sm text-left text-gray-500 dark:text-gray-400 border-collapse table-fixed'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th className='px-2 py-3'>Nome do equipamento</th>
            <th className={thClasses}>Nome do usuário</th>
            <th className={thClasses}>Tipo da manutenção</th>
            <th className={thClasses}>Descrição da manutenção</th>
            <th className={thClasses}>Data limite</th>
            {hasActions && <th className={thClasses}>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {!registers.length ? (
            <tr className='bg-gray-800 border-gray-700'>
              <td colSpan={hasActions ? 6 : 5} className='px-6 py-4'>
                <p className='text-center text-gray-500 dark:text-gray-400'>
                  Nenhuma manutenção cadastrada
                </p>
              </td>
            </tr>
          ) : (
            registers.map((register) => (
              <tr
                key={register.id}
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
              >
                <th
                  scope='row'
                  className='px-2 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap'
                >
                  {register.equipment.name}
                </th>
                <td className={tdClasses}>{register.user.name}</td>
                <td className={tdClasses}>
                  {handleGetRegisterType(register.type)}
                </td>
                <td className={tdClasses}>{register.description}</td>
                <td className={tdClasses}>{formatDate(register.limit)}</td>
                {hasActions && (
                  <td className='px-2 py-4 text-center'>
                    <button
                      onClick={handleUpdate?.bind(null, register)}
                      aria-label='Editar registro'
                      className='text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800'
                    >
                      <FiEdit3 />
                    </button>
                    <button
                      onClick={handleDelete?.bind(null, register.id)}
                      aria-label='Excluir registro'
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
export default TableRegisters;
