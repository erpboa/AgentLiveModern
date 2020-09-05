import React,{useEffect,useState} from 'react';

const FormCallPrincipal = (props) => {

if (props.lista != undefined) {
  return (
    <div>        
        <form id="formularioLead">
            <div className="card card-solid" style={{background:"#393939", paddingBottom: 20, border:"1px solid white"}}>
            <div className="card-body pb-0">
                <div className="row d-flex align-items-stretch"> 
                    {props.lista.listaCombo}                                  
                </div>
             </div>
            
            </div>
            {/* <div className="form-group">
            
            </div> */}
        </form>
    </div>
    
  )
} else {
  return (
  <div>
  </div>
  )
}
}
export default FormCallPrincipal;
