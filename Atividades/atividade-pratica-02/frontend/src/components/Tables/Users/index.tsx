import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { User } from "../../../interfaces/User";
import api from "../../../service/api";
import { formatDate } from "../../../utils/formatter";

interface Props {
  handleUpdate?: (user: User) => void;
  handleDelete?: (id: string) => void;
}
const TableUsers: React.FC<Props> = ({ handleDelete, handleUpdate }) => {
  const [users, setUsers] = useState([] as User[]);
  const getUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full min-w-[800px] overflow-x-auto whitespace-nowrap text-sm text-left text-gray-500 dark:text-gray-400 border-collapse table-fixed">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-2 py-3">Nome</th>
            <th className="px-2 py-3">Email</th>
            <th className="px-2 py-3 text-center">É admin?</th>
            <th className="px-2 py-3 text-center">Criado em</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-gray-800 border-gray-700">
              <th
                scope="row"
                className="px-2 py-4 font-medium text-gray-300 dark:text-white whitespace-nowrap truncate"
              >
                {user.name}
              </th>
              <td className="px-2 py-4 truncate">{user.email}</td>
              <td className="px-2 py-4 text-center">
                {user.is_admin ? "Sim" : "Não"}
              </td>
              <td className="px-2 py-4 text-center">
                {formatDate(user.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableUsers;
