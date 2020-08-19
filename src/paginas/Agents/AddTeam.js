/****************************************************************************************
*@file AddTeam.js
*@author  (breydi vasquez )
*@date 07-08-2020 
*@description Componente Add teams
*****************************************************************************************/

import React, { useContext, useState } from "react";
import { ServiceRest } from "../../services/ServiceRest";
import { ReloadComponent } from "../../contexts/ReloadComponent";
import $ from "jquery";
import { SelectAgent } from "./SelectAgent";
import { dataTeam } from "./team.json";

export const AddTeam = () => {
  
  const { reloadComponent, setReloadComponent } = useContext(ReloadComponent);
  const [listaCombo, setListaCombo] = useState("Select");
  
  const handleInputName = (e) => {
    dataTeam.name = e.target.value
  };

  const handleInputDist = (e) => {
    dataTeam.distribution_type = e.target.value
  };

  const insertTeam = async (e) => {
    if (reloadComponent === undefined || reloadComponent === false) {
      setReloadComponent(true);
    } else {
      setReloadComponent(false);
    }
    e.preventDefault();

    // console.log(dataTeam);
      
      ServiceRest("agent_portal/Team/insertarTeam", dataTeam)
        .then((resp) => {
          if (!resp.error) {
            $("#modalTeam").modal("hide");
          } else {
            const msg = `Report code:: ${resp.data.id_log} for review. Detail: ${resp.detail.message}`;
            alert(msg);
          }
        })
        .catch((e) => console.error(e));
    
  };

  const llamarComboAgent = (e) => {
      
    const listado = ServiceRest("agent_portal/Agent/listarAgent");
    listado.then((value) => {
      setListaCombo(
        value.datos.map((comboLead) => {
          return (
            <option value={comboLead.id_agent} key={comboLead.id_agent}>
              {comboLead.name}
            </option>
          );
        })
      );
        
    });
  
    document.getElementById("formularioTeam").reset();    
  };

  const onCancelTeam = () => {
    dataTeam.agents = []
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
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" id="Letras">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form id="formularioTeam">
                <div className="form-row">
                  <div className="col-3">
                    <label id="Letras">Name  <strong className="text-danger" title="This is required">*</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Name"
                      onChange={handleInputName}
                    />
                  </div>
                </div>                
                  
                  <SelectAgent combo={listaCombo} />
                
                <div className="form-row">
                  <div className="col">
                  <label id="Letras">Distribution  <strong className="text-danger" title="This is required">*</strong></label>
                  <select
                    className="form-control"
                    onChange={handleInputDist}
                    name="distribution_type"
                  >
                     <option hidden defaultValue>Select</option>
                     <option></option>
                    <option value="round_robin">Round Robin: Weighted distribution of leads to agents in sequential order</option>
                    <option value="claim_lead">Claim Lead: Multiple agents contacted, first one who claims lead gets it</option>
                  </select>
                </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={onCancelTeam}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={insertTeam}
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
