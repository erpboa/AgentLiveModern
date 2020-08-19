/****************************************************************************************
*@file Password.js
*@author  (breydi vasquez )
*@date 07-08-2020 
*@description Componente Password
*****************************************************************************************/


import React, { useState } from "react";
import { ServiceRest } from "../../services/ServiceRest";

export const Password = (props) => {
  const [dataAgent, setDataAgents] = useState();

  const onChangeValue = (e) => {
    setDataAgents({ ...dataAgent, [e.target.name]: e.target.value });
  };
  const onUpdatePassword = (e) => {
    e.preventDefault();
    
    const update = ServiceRest("sis_seguridad/Configurar/configurar", dataAgent);
    update.then((resp) => {
      if (resp.error) {        
        const msg = `Report code:: ${resp.data.id_log} for review. Detail: ${resp.detail.message}`;
        alert(msg);
      }
    });
  };

  return (
    <div className="col-lg-6">
    <div className="card">
      <div className="card-header d-flex align-items-center">
      <h6 style={{color:"blue"}}> Change Password</h6>
      </div>
      <div className="card-body">        
        <form className="form-horizontal">
          <div className="form-group row">
            <div className="col-sm-2"> 
              <label>Password</label>
            </div>
            <div className="col-sm-10">
              <input  type="password" name="password" placeholder="Pasword" className="form-control form-control-warning" onChange={onChangeValue} /><small className="form-text"></small>
            </div>
          </div>
          <div className="form-group row">       
            <div className="col-sm-10 offset-sm-2">
              <input type="submit" value="Save Password" className="btn btn-primary" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};
