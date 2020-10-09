/****************************************************************************************
 *@file FormEAlerts.js
 *@author  (Maylee Perez Pastor)
 *@date 12-08-2020
 *@description Componente Add FormEAlerts
 *****************************************************************************************/


import React, {useState, useEffect, useContext} from "react";
import {ServiceRest} from "../../services/ServiceRest";
import {ReloadComponent} from "../../contexts/ReloadComponent";

import './styles/FormEAlertsStyle.css';

import {Redirect, useHistory} from "react-router-dom";
import FormEAlertsRegistro from "./FormEAlertsRegistro";


const FormEAlerts = (props) => {
  const {reloadComponent, setReloadComponent} = useContext(ReloadComponent);
  const [hasError, setErrors] = useState(false);
  const [dataTeam, setDataTeam] = useState();

  const id_lead = props.match.params.id_lead;


  // List data table
  const getData =  () => {

    ServiceRest("agent_portal/Alerts/listarAlerts", {id_lead: id_lead, start: 0, limit: 50})
        .then((res) => setDataTeam(res.datos))
        .catch((err) => setErrors(err));
  };

  useEffect(() => {
    getData();
  }, [reloadComponent]);

  // Delete Team
  const deleteTeam = (id) => {
    let p_delete = {id_team: id};
    ServiceRest("agent_portal/Team/eliminarTeam", p_delete).then((resp) => {
      if (!resp.error) {
        getData()
      } else {
        const msg = `Reporte el codigo: ${resp.data.id_log} para revision. Detalle: ${resp.detail.message}`;
        setErrors(msg);
        alert(hasError);
      }
    });
  };


  const [cart, setCart] = useState(false);


  function addItemToCart(e) {
    setCart(true)

  }

  return (
      <div>

        <div className="container-fluid">


          { (cart) ?

              <FormEAlertsRegistro id_lead = {id_lead} setCart = {addItemToCart}/>
              : <div className="cart">

                <button type="button" className="btn btn-primary" id="chooseActionPlan" onClick={addItemToCart}
                        name="FormEAlertsShow">Add E-Alert
                </button>

                {dataTeam && (

                    <div>
                      <div className="table-responsive">

                        <table className="table table-bordered table-hover">
                          <thead>
                          <tr>
                            <th scope="col">Subject</th>
                            <th scope="col">Price Range</th>
                            <th scope="col">Frequency</th>
                            <th scope="col">Last Sent</th>
                            <th scope="col">Action</th>
                          </tr>
                          </thead>
                          <tbody>
                          {dataTeam.map((e, i) => (
                              <tr key={i} style={{fontSize: '10pt'}}>
                                <td>{e.subject}</td>
                                <td>{(e.price_from !== null)? e.price_from:'Automatic'}</td>
                                <td>{e.alert_frequency}</td>
                                <td></td>
                                <td>
                                  <div>
                                    <button type="button" className="btn btn-sm">
                                      <i className="fa fa-edit fa-2x"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-sm"
                                        onClick={(value) => deleteTeam(e.id_team)}
                                    >
                                      <i
                                          style={{color: "#DC143C"}}
                                          className="fa fa-trash-o fa-2x"
                                          aria-hidden="true"
                                      ></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                )}


              </div> }

        </div>


      </div>
  );
};

export default FormEAlerts;
