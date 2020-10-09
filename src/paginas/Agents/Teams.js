/****************************************************************************************
*@file Teams.js
*@author  (breydi vasquez )
*@date 07-08-2020 
*@description Componente Add Teams
*****************************************************************************************/


import React, { useState, useEffect, useContext } from "react";
import { ServiceRest } from "../../services/ServiceRest";
import { ReloadComponent } from "../../contexts/ReloadComponent";

const Teams = (props) => {
  const { reloadComponent, setReloadComponent } = useContext(ReloadComponent);
  const [hasError, setErrors] = useState(false);
  const [dataTeam, setDataTeam] = useState();

  // List data table
  const getData = () => {
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
        const msg = `Report code:: ${resp.data.id_log} for review. Detail: ${resp.detail.message}`;
        setErrors(msg);
        alert(hasError);
      }
    });
  };
  return (
    <div>
      {dataTeam && (  
        <div className="container-fluid">        
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Distribution Type</th>
                <th scope="col">Agent</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataTeam.map((e, i) => (
                <tr key={i}>
                  <td>{e.name}</td>
                  <td>{(e.distribution_type)}</td>
                  <td>{' ' + e.agents}</td>
                  <td>
                    <div>                    
                      <button type="button" className="btn btn-sm">
                        <i className="fa fa-edit fa-2x"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => deleteTeam(e.id_team)}
                      >
                        <i
                          style={{ color: "#DC143C" }}
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
    </div>
  );
};

export default Teams;
