import React from 'react';
import './styles/card.css';

const Paginacion = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <a onClick={() => paginate(number)} href='#' className='page-link page-item active'>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
export default Paginacion;
