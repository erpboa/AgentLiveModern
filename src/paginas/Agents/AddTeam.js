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

export const AddTeam = () => {
  const { reloadComponent, setReloadComponent } = useContext(ReloadComponent);
  const [listaCombo, setListaCombo] = useState("Select");
  const [dataLeadRound, setLeadRound] = useState(false);
  let agents = [];
  const [dataTeam, setTeam] = useState({
    name: "",
    distribution_type: "",
    id_agent: null,
  });

  const handleInputChange = (e) => {
    setTeam({
      ...dataTeam,
      [e.target.name]: e.target.value,
    });
  };

  const insertTeam = async (e) => {
    if (reloadComponent === undefined || reloadComponent === false) {
      setReloadComponent(true);
    } else {
      setReloadComponent(false);
    }
    e.preventDefault();

     
      ServiceRest("agent_portal/Team/insertarTeam", dataTeam)
        .then((resp) => {
          if (!resp.error) {
            $("#modalTeam").modal("hide");
          } else {
            const msg = `Reporte el codigo: ${resp.data.id_log} para revision. Detalle: ${resp.detail.message}`;
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

  const LeadPeRound = () => {
    return (
      <div className="row">
        <div className="col-sm-3">
        <select
          className="form-control"
          name="lead_per_round"
          placeholder="Name"
          onChange={handleInputChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>       
        </div>
        <div className="col-sm">
        lead per round (100)%
        <button type="button" className="btn btn-sm">
          <i className="fa fa-trash-o fa-2x" aria-hidden="true"></i>
        </button>        
        </div>
      </div>
    );
  };

  const onAddAgent = (e) => {
    if (e.target.value > 0) {
      setLeadRound(true);
      agents.push(e.target.value);
    }
  };

  const AddAgent = () => {
    return (
      <div className="form-row">
        <div className="col-4">
          <label>Agents *</label>
          <select
            id="inputState"
            className="form-control"
            name="id_agent"
            onChange={onAddAgent}
          >
            <option hidden defaultValue>Select</option>
            {listaCombo}
          </select>
        </div>
        <div className="col-6">          
          <label>&nbsp;&nbsp;&nbsp;</label>
          {/* {dataLeadRound && <LeadPeRound />} */}
        </div>
      </div>
    );
  };
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
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Team
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form id="formularioTeam">
                <div className="form-row">
                  <div className="col-4">
                    <label>Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Name"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-4">
                    <label>Agents *</label>
                    <select
                      id="inputState"
                      className="form-control"
                      name="id_agent"
                      onChange={onAddAgent}
                    >
                      <option hidden defaultValue>Select</option>
                      {listaCombo}
                    </select>
                  </div>
                  <div className="col-6">
                    <label>&nbsp;&nbsp;&nbsp;</label>
                    {dataLeadRound && <LeadPeRound />}
                  </div>
                </div>
                {dataLeadRound && <AddAgent />}
                <div className="form-row">
                  <label>Distribution *</label>
                  <select
                    className="form-control"
                    onChange={handleInputChange}
                    name="distribution_type"
                  >
                     <option hidden defaultValue>Select</option>
                    <option value="round_robin">Round Robin</option>
                    <option value="claim_lead">Claim Lead</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
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
