import React from 'react';

interface Props {
  tabText: React.ReactNode;
  tabIcon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}
const TabItem: React.FC<Props> = ({ tabText, tabIcon, active, onClick }) => {
  return (
    <li className='mr-2'>
      <button
        className={`${
          active
            ? 'active text-blue-600 border-blue-600'
            : 'hover:text-gray-600 hover:border-blue-500 border-transparent'
        } flex justify-center items-center p-4 rounded-t-lg border-b-2  `}
        onClick={onClick}
      >
        <div
          className={`mr-2 ${
            active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
          } `}
        >
          {tabIcon}
        </div>
        {tabText}
      </button>
    </li>
  );
};
export default TabItem;
