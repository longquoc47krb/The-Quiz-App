/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prettier/prettier */
import React from 'react'
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';

function GridPagination({totalPages, currentPage, setCurrentPage, handlePrevPage, handleNextPage, correctArray} : {totalPages: number, currentPage: number, setCurrentPage: any, handlePrevPage : any, handleNextPage:any, correctArray: any}) {
  const handleBtnBackground = (index: number) => {
    if(correctArray){
      return correctArray[index] ? 'bg-lime-500 text-gray-200' : 'bg-red-700 text-gray-200';
    }
    return ''
  }
  function calculateColumn(n : number) {
    return `40px_`.repeat((n - 10) / 10 + 2).slice(0, -1);
  }
  // grid-cols-[${calculateColumn(totalPages)}]
  return (
    <div className='mx-4'>
      <div className="grid grid-cols-[40px_40px_40px] gap-4 overflow-y-auto max-h-screen justify-center mb-4">
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => setCurrentPage(pageIndex)}
                className={`${
                  pageIndex === currentPage ? 'dark:opacity-40 text-white' : 'bg-gray-200 text-black'
                } rounded w-10 h-10 text-center ${handleBtnBackground(pageIndex)}`}
              >
                {pageIndex + 1}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-[40px_40px] gap-4">
            <button type="button" className='flex justify-center items-center bg-primary dark:bg-primary-900 w-10 h-10 rounded-md px-2 py-1 mr-4' onClick={handlePrevPage} disabled={currentPage === 0}>
              <GrCaretPrevious/>
            </button>
            <button type="button" className='flex justify-center items-center gap-x-4 bg-primary dark:bg-primary-900 w-10 h-10 rounded-md px-2 py-1' onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
             <GrCaretNext/>
            </button>
          </div>
    </div>
  )
}

export default GridPagination