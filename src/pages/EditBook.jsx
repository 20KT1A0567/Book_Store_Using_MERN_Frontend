import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setFetchLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setFetchLoading(false);
      })
      .catch((error) => {
        setFetchLoading(false);
        enqueueSnackbar('Error fetching book details', { variant: 'error' });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditBook = () => {
    // Validation
    if (!title.trim() || !author.trim() || !publishYear) {
      enqueueSnackbar('Please fill in all fields', { variant: 'warning' });
      return;
    }

    const data = {
      title: title.trim(),
      author: author.trim(),
      publishYear: parseInt(publishYear),
    };
    
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Updated successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error updating book', { variant: 'error' });
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditBook();
  };

  if (fetchLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4'>
        <div className='max-w-4xl mx-auto'>
          <BackButton />
          <div className='flex justify-center items-center h-64'>
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4'>
      <div className='max-w-4xl mx-auto'>
        <BackButton />
        
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent'>
            Edit Book
          </h1>
          <p className='text-gray-600 mt-2'>Update the book information</p>
        </div>

        {loading ? (
          <div className='flex justify-center'>
            <Spinner />
          </div>
        ) : (
          <div className='flex flex-col border-2 border-gray-200 rounded-2xl w-full max-w-2xl p-8 mx-auto bg-white shadow-2xl'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Title Field */}
              <div className='space-y-2'>
                <label className='block text-lg font-semibold text-gray-700'>
                  Book Title
                </label>
                <input
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400'
                  placeholder='Enter book title'
                  required
                />
              </div>

              {/* Author Field */}
              <div className='space-y-2'>
                <label className='block text-lg font-semibold text-gray-700'>
                  Author
                </label>
                <input
                  type='text'
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className='w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400'
                  placeholder='Enter author name'
                  required
                />
              </div>

              {/* Publish Year Field */}
              <div className='space-y-2'>
                <label className='block text-lg font-semibold text-gray-700'>
                  Publish Year
                </label>
                <input
                  type='number'
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  className='w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400'
                  placeholder='Enter publish year'
                  min='1000'
                  max='2030'
                  required
                />
                <p className='text-sm text-gray-500'>
                  Enter a valid year between 1000 and 2030
                </p>
              </div>

              {/* Action Buttons */}
              <div className='flex space-x-4'>
                <button
                  type='button'
                  onClick={() => navigate('/')}
                  className='flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={loading}
                  className='flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105'
                >
                  {loading ? (
                    <div className='flex items-center justify-center space-x-2'>
                      <Spinner />
                      <span>Updating...</span>
                    </div>
                  ) : (
                    'Update Book'
                  )}
                </button>
              </div>
            </form>

            {/* Book ID Display */}
            <div className='mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200'>
              <p className='text-sm text-gray-600'>
                <span className='font-semibold'>Book ID:</span> {id}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBook;