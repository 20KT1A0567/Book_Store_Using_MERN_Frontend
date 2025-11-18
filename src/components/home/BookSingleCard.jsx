import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='relative group'>
      <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200'></div>
      <div className='relative bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl'>
        
        {/* Year Badge */}
        <div className='absolute -top-3 -right-3'>
          <span className='bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg'>
            {book.publishYear}
          </span>
        </div>

        {/* Book Icon */}
        <div className='flex justify-center mb-4'>
          <div className='p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl'>
            <PiBookOpenTextLight className='text-4xl text-purple-600' />
          </div>
        </div>

        {/* Content */}
        <div className='space-y-3'>
          <h4 className='text-xs font-mono text-gray-400 text-center'>{book._id}</h4>
          
          <div className='text-center'>
            <h3 className='font-bold text-gray-800 text-lg line-clamp-2'>{book.title}</h3>
          </div>
          
          <div className='flex items-center justify-center space-x-2 text-gray-600'>
            <BiUserCircle className='text-blue-500' />
            <span className='text-sm font-medium'>{book.author}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-between items-center mt-6 pt-4 border-t border-gray-100'>
          <button
            onClick={() => setShowModal(true)}
            className='p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all duration-300 transform hover:scale-110'
            title='Quick View'
          >
            <BiShow className='text-xl' />
          </button>
          
          <Link
            to={`/books/details/${book._id}`}
            className='p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl transition-all duration-300 transform hover:scale-110'
            title='Details'
          >
            <BsInfoCircle className='text-xl' />
          </Link>
          
          <Link
            to={`/books/edit/${book._id}`}
            className='p-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 rounded-xl transition-all duration-300 transform hover:scale-110'
            title='Edit'
          >
            <AiOutlineEdit className='text-xl' />
          </Link>
          
          <Link
            to={`/books/delete/${book._id}`}
            className='p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-300 transform hover:scale-110'
            title='Delete'
          >
            <MdOutlineDelete className='text-xl' />
          </Link>
        </div>
      </div>

      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;