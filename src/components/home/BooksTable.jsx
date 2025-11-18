import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <div className='rounded-2xl shadow-xl border border-gray-200 overflow-hidden'>
      <table className='w-full'>
        <thead>
          <tr className='bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200'>
            <th className='py-4 px-6 text-left text-gray-700 font-semibold'>No</th>
            <th className='py-4 px-6 text-left text-gray-700 font-semibold'>Title</th>
            <th className='py-4 px-6 text-left text-gray-700 font-semibold max-md:hidden'>Author</th>
            <th className='py-4 px-6 text-left text-gray-700 font-semibold max-md:hidden'>Publish Year</th>
            <th className='py-4 px-6 text-center text-gray-700 font-semibold'>Operations</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
          {books.map((book, index) => (
            <tr 
              key={book._id} 
              className='hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors duration-200'
            >
              <td className='py-4 px-6'>
                <span className='inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold'>
                  {index + 1}
                </span>
              </td>
              <td className='py-4 px-6 font-medium text-gray-800'>{book.title}</td>
              <td className='py-4 px-6 text-gray-600 max-md:hidden'>{book.author}</td>
              <td className='py-4 px-6 max-md:hidden'>
                <span className='inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium'>
                  {book.publishYear}
                </span>
              </td>
              <td className='py-4 px-6'>
                <div className='flex justify-center space-x-3'>
                  <Link
                    to={`/books/details/${book._id}`}
                    className='p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-all duration-300 transform hover:scale-110'
                    title='Details'
                  >
                    <BsInfoCircle className='text-lg' />
                  </Link>
                  <Link
                    to={`/books/edit/${book._id}`}
                    className='p-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-600 rounded-lg transition-all duration-300 transform hover:scale-110'
                    title='Edit'
                  >
                    <AiOutlineEdit className='text-lg' />
                  </Link>
                  <Link
                    to={`/books/delete/${book._id}`}
                    className='p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all duration-300 transform hover:scale-110'
                    title='Delete'
                  >
                    <MdOutlineDelete className='text-lg' />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;