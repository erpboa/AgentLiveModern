/****************************************************************************************
*@file AddTeam.js
*@author  (breydi vasquez )
*@date 07-08-2020 
*@description Componente Add teams
*****************************************************************************************/

import React, { useState } from "react";
import { ServiceRest } from "../../services/ServiceRest";
// import { ReloadComponent } from "../../contexts/ReloadComponent";

import  SelectAgent  from "./SelectAgent";
// import { dataTeam } from "./team.json";

export const AddTeam = () => {
  const team = {
    name: '',        
    distribution_type: '',
    agents: [],
  }

  
  const [listaCombo, setListaCombo] = useState();



  const llamarComboAgent = async (e) => {
    e.preventDefault()
    const listado = await  ServiceRest("agent_portal/Agent/listarAgent")    
    setListaCombo(listado.datos)
  }
  
  return (
    <div>
      <button
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#modalTeam"
        id="botonMenu"
        type="button"
        onClick={llamarComboAgent}
      >
        <i className="fa fa-group" id="iconBoton"></i> Add New Team
      </button>
      <div
        className="modal fade"
        data-backdrop="static"
        data-keyboard="false"
        id="modalTeam"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content" id="ColoresPaneles">
            <div className="modal-header">
              <h5 className="modal-title" id="Letras">
                Add New Team
              </h5>
            </div>
               
                  
                  {listaCombo && <SelectAgent team={team} usernameList={listaCombo} /> }
                


          </div>
        </div>
      </div>
    </div>
  );
};
