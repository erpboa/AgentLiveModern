/****************************************************************************************
*@file FormAddNote.js
*@author  (Maylee Perez Pastor)
*@date 12-08-2020 
*@description Componente Add FormAddNote
*****************************************************************************************/


import React, { useState, useEffect, useContext } from "react";
import { ServiceRest } from "../../services/ServiceRest";
import { ReloadComponent } from "../../contexts/ReloadComponent";

import './styles/FormAddNoteStyle.css';

const FormAddNote = (props) => {
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
    <div  id="container-all-addNote">
        <div id="container-logCall-det">
            <form>
                <div className="form-group">
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Add notes about this lead and @Albert Hernandez or @Jason Glassman"></textarea>
                </div>
                <div class="row">                    
                    <div class="col">                        
                    </div>
                    <div class="col">  
                    <a href="http://success.greatagentusa.com//hc/en-us/articles/360010934433-Turning-On-Off-Leads" alt="greatagentusa.com">Learn more about Notes</a>
                    </div>
                    <div class="col">
                        <button type="button" /*onClick={insertTeam}*/ className="btn btn-primary" id="bn-logCall-footer" >
                            Add Note
                        </button>
                    </div>
                </div>
                
            </form>
            
        </div>
    </div>
  );
};

export default FormAddNote;
