import React from 'react';

const Spinner = () => {
  return (
    <div className='flex justify-center items-center'>
      <div className='relative'>
        <div className='w-16 h-16 border-4 border-blue-200 rounded-full'></div>
        <div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full absolute top-0 left-0 animate-spin'></div>
      </div>
    </div>
  );
};

export default Spinner;