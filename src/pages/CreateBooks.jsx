import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
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
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error creating book', { variant: 'error' });
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveBook();
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4'>
      <div className='max-w-4xl mx-auto'>
        <BackButton />
        
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            Create New Book
          </h1>
          <p className='text-gray-600 mt-2'>Add a new book to your collection</p>
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

              {/* Submit Button */}
              <button
                type='submit'
                disabled={loading}
                className='w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 mt-6'
              >
                {loading ? (
                  <div className='flex items-center justify-center space-x-2'>
                    <Spinner />
                    <span>Saving...</span>
                  </div>
                ) : (
                  'Create Book'
                )}
              </button>
            </form>

            {/* Quick Tips */}
            <div className='mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200'>
              <h3 className='font-semibold text-blue-800 mb-2'>💡 Quick Tips</h3>
              <ul className='text-sm text-blue-600 space-y-1'>
                <li>• Make sure the title accurately represents the book</li>
                <li>• Use the full author name for better searchability</li>
                <li>• Double-check the publish year for accuracy</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBooks;