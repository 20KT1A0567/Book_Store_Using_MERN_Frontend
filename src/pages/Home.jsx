import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://book-store-using-mern-backend-2.onrender.com/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Filter books based on search term
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.publishYear.toString().includes(searchTerm)
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='mb-8'>
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8'>
            <div>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                Books Library
              </h1>
              <p className='text-gray-600 mt-2'>Manage your book collection with ease</p>
            </div>
            
            <Link 
              to='/books/create'
              className='inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105'
            >
              <MdOutlineAddBox className='text-2xl' />
              <span className='font-semibold'>Add New Book</span>
            </Link>
          </div>

          {/* Search and Filter Section */}
          <div className='bg-white rounded-2xl p-6 shadow-lg mb-6'>
            <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between'>
              {/* Search Input */}
              <div className='flex-1 w-full'>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Search Books
                </label>
                <input
                  type='text'
                  placeholder='Search by title, author, or year...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300'
                />
              </div>

              {/* View Toggle Buttons */}
              <div className='flex space-x-4'>
                <button
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    showType === 'table' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setShowType('table')}
                >
                  Table View
                </button>
                <button
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    showType === 'card' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setShowType('card')}
                >
                  Card View
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className='mt-4 flex justify-between items-center'>
              <p className='text-gray-600'>
                Showing <span className='font-semibold'>{filteredBooks.length}</span> of{' '}
                <span className='font-semibold'>{books.length}</span> books
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className='text-sm text-blue-500 hover:text-blue-700 font-semibold'
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <Spinner />
          </div>
        ) : (
          <>
            {/* Empty State */}
            {filteredBooks.length === 0 ? (
              <div className='text-center py-16'>
                <div className='bg-white rounded-2xl p-12 shadow-lg max-w-2xl mx-auto'>
                  <div className='text-6xl mb-4'>📚</div>
                  <h3 className='text-2xl font-bold text-gray-800 mb-2'>
                    {searchTerm ? 'No books found' : 'No books in library'}
                  </h3>
                  <p className='text-gray-600 mb-6'>
                    {searchTerm 
                      ? 'Try adjusting your search terms or clear the search to see all books.'
                      : 'Get started by adding your first book to the library.'
                    }
                  </p>
                  {!searchTerm && (
                    <Link 
                      to='/books/create'
                      className='inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105'
                    >
                      <MdOutlineAddBox className='text-2xl' />
                      <span className='font-semibold text-lg'>Add Your First Book</span>
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              /* Books Display */
              <>
                {showType === 'table' ? (
                  <BooksTable books={filteredBooks} />
                ) : (
                  <BooksCard books={filteredBooks} />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;