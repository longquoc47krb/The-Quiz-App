/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prettier/prettier */
import React from 'react'
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';

function GridPagination({totalPages, currentPage, setCurrentPage, handlePrevPage, handleNextPage} : {totalPages: number, currentPage: number, setCurrentPage: any, handlePrevPage : any, handleNextPage:any}) {
  return (
    <div className='mx-4'>
      <div className="grid grid-cols-[80px_80px] gap-4 overflow-y-auto max-h-screen justify-center my-4">
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => setCurrentPage(pageIndex)}
                className={`${
                  pageIndex === currentPage ? 'bg-primary dark:bg-darkPrimary text-white' : 'bg-gray-200 text-black'
                } rounded w-20 h-20 text-center`}
              >
                {pageIndex + 1}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-[80px_80px] gap-4">
            <button type="button" className='flex justify-center items-center bg-primary dark:bg-darkPrimary w-20 h-20 rounded-md px-2 py-1 mr-4' onClick={handlePrevPage} disabled={currentPage === 0}>
              <GrCaretPrevious/>
            </button>
            <button type="button" className='flex justify-center items-center gap-x-4 bg-primary dark:bg-darkPrimary w-20 h-20 rounded-md px-2 py-1' onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
             <GrCaretNext/>
            </button>
          </div>
    </div>
  )
}

export default GridPagination