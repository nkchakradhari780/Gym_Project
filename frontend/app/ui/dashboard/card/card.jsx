import { MdSupervisedUserCircle } from 'react-icons/md';

const Card = ({ title, number }) => {
  return (
    <div className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md text-white space-x-4">
      <MdSupervisedUserCircle className="text-4xl text-indigo-400" />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-400">{title}</span>
        <span className="text-2xl font-bold">{number}</span>
        <span className="text-xs text-gray-500"></span>
      </div>
    </div>
  );
};

export default Card;
