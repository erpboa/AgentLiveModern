import React,{useEffect,useState} from 'react';

const Modal = (props) => {

if (props.datos != undefined) {
  return (
  <div className="modal fade" id={props.datos.id_modal} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content" id="ColoresPaneles">
            <div className="modal-header">
              <h5 className="modal-title" id="Letras">{props.datos.titulo}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" id="Letras">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {props.datos.contenido}
            </div>
        </div>
      </div>
    </div>
  )
} else {
  return (
  <div>
  </div>
  )
}
}
export default Modal;
