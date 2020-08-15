/****************************************************************************************
*@file FormLogCall.js
*@author  (Maylee Perez Pastor)
*@date 12-08-2020 
*@description Componente Add FormLogCall
*****************************************************************************************/


import React, { useState, useEffect, useContext } from "react";
import { ServiceRest } from "../../services/ServiceRest";
import { ReloadComponent } from "../../contexts/ReloadComponent";

import './styles/FormLogCallStyle.css';
 
const FormLogCall = (props) => {
  const { reloadComponent, setReloadComponent } = useContext(ReloadComponent);
  const [hasError, setErrors] = useState(false);
  //const [dataTeam, setDataTeam] = useState();

  // List data table
  const getData = async () => {
    ServiceRest("agent_portal/Team/listarTeam")
      //.then((res) => setDataTeam(res.datos))
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
    <div id="container-all-logCall">
        
        <div >        
            <div id="container-logCall">
                <button type="button" className="btn btn-outline-success" id="bn-container-logCall"> Talked to Lead</button>
                <button type="button" className="btn btn-outline-secondary" id="bn-container-logCall">Left Voicemail</button>
                <button type="button" className="btn btn-outline-dark" id="bn-container-logCall">Call Attempt</button>
            </div>
            <div  id="container-logCall">
                <button type="button" className="btn btn-outline-warning" id="bn-container-logCall">Bad Time</button>
                <button type="button" className="btn btn-outline-danger" id="bn-container-logCall">Opted Out</button>
                <button type="button" className="btn btn-outline-danger" id="bn-container-logCall">Wrong Number</button>   
            </div>
        </div>
        <div id="container-logCall-det">
            <form>
                <div className="form-group">
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Add call notes here"></textarea>
                </div>
            </form>
            
        </div>
        <div id="container-logCall-footer">
            <form className="form-inline">
                <div class="row">
                    <div class="col">
                        <div className="alert alert-secondary" role="alert" id= "text-phone">
                            to: 
                        </div>
                    </div>
                    <div class="col">                        
                    </div>
                    <div class="col">                        
                    </div>
                    <div class="col">                        
                    </div>
                    <div class="col">
                        <button type="button" /*onClick={insertTeam}*/ className="btn btn-primary" id="bn-logCall-footer" >
                            Save
                        </button>
                    </div>
                </div>
                
            </form>
        </div>
      
    </div>
  );
};

export default FormLogCall;
