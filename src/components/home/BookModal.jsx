import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiCalendar } from 'react-icons/bi';

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex justify-center items-center p-4'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-full max-w-2xl bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl relative transform transition-all duration-300 hover:scale-[1.02]'
      >
        <div className='absolute -top-4 -right-4'>
          <button
            onClick={onClose}
            className='bg-white text-red-500 hover:bg-red-500 hover:text-white rounded-full p-2 shadow-lg transition-all duration-300 transform hover:rotate-90'
          >
            <AiOutlineClose className='text-xl' />
          </button>
        </div>
        
        <div className='p-6'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center space-x-3'>
              <div className='p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg'>
                <PiBookOpenTextLight className='text-3xl text-white' />
              </div>
              <div>
                <h2 className='text-2xl font-bold text-gray-800'>{book.title}</h2>
                <p className='text-gray-600'>Book Details</p>
              </div>
            </div>
            <div className='text-right'>
              <span className='inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold shadow-lg'>
                {book.publishYear}
              </span>
              <p className='text-xs text-gray-500 mt-1'>Publish Year</p>
            </div>
          </div>

          {/* Content */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-3 p-3 bg-blue-50 rounded-xl border border-blue-100'>
              <BiUserCircle className='text-2xl text-blue-500' />
              <div>
                <p className='text-sm text-gray-600'>Author</p>
                <p className='font-semibold text-gray-800'>{book.author}</p>
              </div>
            </div>

            <div className='flex items-center space-x-3 p-3 bg-green-50 rounded-xl border border-green-100'>
              <BiCalendar className='text-2xl text-green-500' />
              <div>
                <p className='text-sm text-gray-600'>Book ID</p>
                <p className='font-mono text-sm text-gray-800'>{book._id}</p>
              </div>
            </div>

            {/* Description */}
            <div className='mt-6 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200'>
              <h3 className='font-semibold text-gray-800 mb-2'>Description</h3>
              <p className='text-gray-600 leading-relaxed'>
                {book.description || "A captivating literary work that takes readers on an unforgettable journey through its pages. This book showcases exceptional storytelling and profound insights that will leave you inspired and thoughtful."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;