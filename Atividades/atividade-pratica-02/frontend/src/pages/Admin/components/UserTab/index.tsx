import React from 'react';
import { toast } from 'react-toastify';
import TableUsers from '../../../../components/Tables/Users';
import api from '../../../../service/api';

const UserTab: React.FC = (props) => {
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/users/${id}`);
      toast.success('Usuário deletado com sucesso!');
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };
  return (
    <div>
      <TableUsers handleDelete={handleDelete} />
    </div>
  );
};
export default UserTab;
