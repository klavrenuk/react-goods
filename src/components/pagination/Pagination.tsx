import React from 'react';

const Pagination = () => {
    return (
        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
          <span className="text-xs xs:text-sm text-gray-900">
            Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, totalProducts)} of {totalProducts} Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {pageNumbers.map(number => (
                <button key={number} onClick={() => paginate(number)} className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded ${number === currentPage ? 'bg-gray-400' : ''}`}>
                  {number}
                </button>
            ))}

            <button
              className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(totalProducts / productsPerPage)}
            >
              Next
            </button>
          </div>
        </div>
    )
}

export default Pagination;