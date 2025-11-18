import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
  return (
    <Link
      to={destination}
      className='inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl'
    >
      <BsArrowLeft className='text-xl' />
      <span className='font-semibold'>Back</span>
    </Link>
  );
};

export default BackButton;