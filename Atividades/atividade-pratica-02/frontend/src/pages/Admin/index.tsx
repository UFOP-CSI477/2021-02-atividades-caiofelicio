import React, { useState } from 'react';
import TabItem from './components/TabItem';
import { HiUserGroup, HiOutlineDocumentReport } from 'react-icons/hi';
import { MdHardware } from 'react-icons/md';
import UserTab from './components/UserTab';
import RegistersTab from './components/RegistersTab';
import EquipmentsTab from './components/EquipmentsTab';

const AdminPage: React.FC = () => {
  const [tab, setTab] = useState(0);

  const handleChangeTab = (index: number) => {
    setTab(index);
  };
  return (
    <div className='flex-1 flex flex-col  items-center pt-11'>
      <div className='border-b border-gray-200 mb-10'>
        <ul className='flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500'>
          <TabItem
            active={tab === 0}
            tabText='Usuários'
            tabIcon={<HiUserGroup size={20} />}
            onClick={() => handleChangeTab(0)}
          />
          <TabItem
            active={tab === 1}
            tabText='Manutenções'
            tabIcon={<HiOutlineDocumentReport size={20} />}
            onClick={() => handleChangeTab(1)}
          />
          <TabItem
            active={tab === 2}
            tabText='Equipamentos'
            tabIcon={<MdHardware size={20} />}
            onClick={() => handleChangeTab(2)}
          />
        </ul>
      </div>
      {tab === 0 && <UserTab />}
      {tab === 1 && <RegistersTab />}
      {tab === 2 && <EquipmentsTab />}
    </div>
  );
};
export default AdminPage;
