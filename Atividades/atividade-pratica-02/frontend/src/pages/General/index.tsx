import React from 'react';
import TablesEquipment from '../../components/Tables/Equipments';
import TableRegisters from '../../components/Tables/Registers';

const GeneralPage: React.FC = () => {
  return (
    <div className='flex flex-1 flex-col gap-[50px] justify-center items-center'>
      <TablesEquipment />
      <TableRegisters />
    </div>
  );
};
export default GeneralPage;
