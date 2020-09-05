import React from 'react';
import './styles/card.css';

const Paginacion = ({ postsPerPage, totalPosts, paginate, cambiarLimit }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="col-sm-2">                
                    <div className="dropdown">
                      <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {postsPerPage}
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#" onClick={() => cambiarLimit(10)} value="10">10</a>
                        <a className="dropdown-item" href="#" onClick={() => cambiarLimit(20)} value="20">20</a>
                        <a className="dropdown-item" href="#" onClick={() => cambiarLimit(30)} value="30">30</a>
                        <a className="dropdown-item" href="#" onClick={() => cambiarLimit(40)} value="40">40</a>
                        <a className="dropdown-item" href="#" onClick={() => cambiarLimit(50)} value="50">50</a>
                        <a className="dropdown-item" href="#" onClick={() => cambiarLimit(100)} value="100">100</a>
                      </div>
                    </div>                 
                </div> 
                <div className="col-sm-10">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center float-left">
                      <li className="page-item" >
                        <a className="page-link" href="#" tabIndex={-1}>Previous</a>
                      </li>
                      {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                          <a onClick={() => paginate(number)} href='#' className='page-link page-item active'>
                            {number}
                          </a>
                        </li>
                      ))}              
                      <li className="page-item">
                        <a className="page-link" href="#">Next</a>
                      </li>
                    </ul>
                  </nav>
                </div> 
            </div>
        </div>
          
    </div>
  );
}
export default Paginacion;
