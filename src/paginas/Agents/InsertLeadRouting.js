/****************************************************************************************
*@file InsertLeadRouting.js
*@author  (breydi vasquez )
*@date 07-08-2020 
*@description Componente Add InsertLeadRouting
*****************************************************************************************/

import React, { Fragment, useContext, useState } from "react";
import { ServiceRest } from "../../services/ServiceRest";
import { ReloadComponent } from "../../contexts/ReloadComponent";
import { CheckBoxComponent } from "../../components/CheckBox";



const InsertLeadRouting = ({ isShowing, hide }) => {
  const [dataLeadRouting, setLeadRouting] = useState();
  const [listaCombo, setListaCombo] = useState("Select");

  const handleInputChange = (e) => {
    setLeadRouting({
      ...dataLeadRouting,
      [e.target.name]: e.target.value,
    });
  };
  const llamarComboAgentTeam = (e) => {
    // e.preventDefault()
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
    // document.getElementById("formularioTeam").reset();
  }

  if (isShowing) {
    return (
      <Fragment>
        <div className="container-sm p-2 my-1 border" >
          <div className="header_0">
            <div className="row">
              <div className="col-sm-2" >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Rule Name"
                />
              </div>
              <div className="col-sm-2">1 Conditions</div>
              <div className="col-sm-6"></div>
              <div className="col-sm-1">
                <button type="button" className="btn btn-sm">
                  <i className="fa fa-trash-o fa-3x" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <hr />
          </div>
          <div className="select_1">
            <div className="row">
              <div className="col-md-3">
                <div className="input-group">
                  <div>Leads who meet &nbsp;&nbsp;</div>
                  <select className="form-control">
                    <option value="all">All</option>
                    <option value="any">Any</option>
                  </select>                  
                </div>
              </div>
              <div className="col-md-4">of the conditions</div>
            </div>
          </div>    
          <br />
          <div className="select_2">
            <div className="row">
              <div className="col-md-2">
                <select className="form-control">
                  <option hidden defaultValue></option>
                  <option value="price">Price</option>
                  <option value="source">Source</option>
                  <option value="lead_origin">Lead Origin</option>
                  <option value="zip_code">Zip Code</option>
                  <option value="city">City</option>
                  <option value="address">Address</option>
                </select>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-1">
              <CheckBoxComponent
                type="import_match_lead"
                el="si"
                size="switch switch-sm"
              />
            </div>
            <div className="col-md-6"> import matching leads and route to</div>
          </div>
          <hr />
          <div className="select_3">
            <div className="row">
              <div className="col-md-2">
                <label >Assign Primary Agent</label>
                <select className="form-control" onClick={llamarComboAgentTeam}>
                  {listaCombo}
                </select>
              </div>
              <div className="col-md-2">
                <label>Assign Lender</label>
                <select className="form-control">
                  <option hidden defaultValue>Select</option>
                  <option value="price">Sanders Park</option>
                </select>
              </div>
            </div>
          </div>
          <hr />
          <div className="select_4">
            <div className="row">
              <div className="col-md-1">
                <CheckBoxComponent
                  type="import_match_lead"
                  el="no"
                  size="switch switch-sm"
                />
              </div>
              <div className="col-md-5">
                Re-route lead if the rule matches the lead after routing
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return null;
  }
};

export default InsertLeadRouting;
