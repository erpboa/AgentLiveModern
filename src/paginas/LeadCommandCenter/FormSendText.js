/****************************************************************************************
 *@file FormSendText.js
 *@author  (Maylee Perez Pastor)
 *@date 12-08-2020
 *@description Componente Add FormSendText
 *****************************************************************************************/


import React, { useState, useEffect, useContext } from "react";
import { ServiceRest } from "../../services/ServiceRest";
import { ReloadComponent } from "../../contexts/ReloadComponent";

import './styles/FormSendTextStyle.css';

const FormSendText = (props) => {
  const { reloadComponent, setReloadComponent } = useContext(ReloadComponent);
  const [hasError, setErrors] = useState(false);
  const [dataTeam, setDataTeam] = useState();


  // List data table
  const getData = async () => {
    ServiceRest("agent_portal/Team/listarTeam")
        .then((res) => setDataTeam(res.datos))
        .catch((err) => setErrors(err));
  };

  useEffect(() => {
    getData();
  }, [reloadComponent]);

  // Delete Team
  const deleteTeam = (id) => {
    let p_delete = { id_team: id };
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
  return (
      <div>
        <div className="container-fluid">

          <h5>Text History</h5>
          <div className="card w-100">
            <div className="card-body" id="size_card_tex">
              <p className="card-text"> </p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Message</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Type message here"> </textarea>
          </div>

          <div>
          </div>

        </div>
      </div>
  );
};

export default FormSendText;
