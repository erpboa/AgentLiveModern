/****************************************************************************************
*@file AddUser.js
*@author  (breydi vasquez )
*@date 07-08-2020 
*@description Componente Add User
*****************************************************************************************/


import React, { useContext, useState } from "react";
import { ServiceRest } from "../../services/ServiceRest";
import { ReloadComponent } from "../../contexts/ReloadComponent";
import $ from "jquery";

export const AddUser = () => {
  const { reloadComponent, setReloadComponent } = useContext(ReloadComponent);

  const [dataAgent, setAgent] = useState({
    name: "",
    agent_type: "",
    cell_phone: "",
    office_phone: "",
    biography: "",
    virtual_cell_phone: "",
    job_title: "",
    email_address: "",
    photo: "",
  });

  const handleInputChange = (e) => {
    setAgent({
      ...dataAgent,
      [e.target.name]: e.target.value,
    });
  };

  const insertAgent = async (e) => {
    
    if (reloadComponent === undefined || reloadComponent === false) {
      setReloadComponent(true);
    } else {
      setReloadComponent(false);
    }
    e.preventDefault();

    if (dataAgent.name === "" || dataAgent.email_address === "") {
      alert("the fields don't have to be empty");
    } else {
      ServiceRest("agent_portal/Agent/insertarAgent", dataAgent)
        .then((resp) => {
          if (!resp.error) {
            $("#modalUser").modal("hide");
          } else {
            const msg = `Report code:: ${resp.data.id_log} for review. Detail: ${resp.detail.message}`;
            alert(msg);
          }
        })
        .catch((e) => console.error(e));
    }
  }
  const onCancel = () => {
    document.getElementById("formularioUser").reset();
  }

  return (
    <div>
      <button
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#modalUser"
        id="botonMenu"
        type="button"
      >
        <i className="fa fa-user" id="iconBoton"></i> Add New User
      </button>
      <div
        className="modal fade"
        data-backdrop="static"
        data-keyboard="false"        
        id="modalUser"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" id="ColoresPaneles">
            <div className="modal-header">
              <h5 className="modal-title" id="Letras">
                Add New User
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
              <form id="formularioUser">
                <div className="form-row">
                  <div className="col">
                    <label id="Letras">Agent Name <strong className="text-danger" title="This is required">*</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <label id="Letras">Email Adress <strong className="text-danger" title="This is required">*</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      name="email_address"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <label id="Letras">Cell Number <strong className="text-danger" title="This is required">*</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      name="cell_phone"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <label id="Letras">Office Number <strong className="text-danger" title="This is required">*</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      name="office_phone"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <label id="Letras">Agent Type <strong className="text-danger" title="This is required">*</strong></label>
                <select className="form-control" name="agent_type" onChange={handleInputChange}>
                <option></option>
                  <option value="agent">Agent</option>
                  <option value="real_estate_broker">Real Estate Broker</option>
                  <option value="lender">Lender</option>
                </select>
              </form>
            </div>
            <div className="modal-footer">            
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={insertAgent}
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
