/****************************************************************************************
*@file FormActionPlants.js
*@author  (Maylee Perez Pastor)
*@date 12-08-2020 
*@description Componente Add FormActionPlants
*****************************************************************************************/


import React, { useState, useEffect, useContext } from "react";
import { ServiceRest } from "../../services/ServiceRest";
import { ReloadComponent } from "../../contexts/ReloadComponent";

const FormActionPlants = (props) => {
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
      {dataTeam && (  
        <div className="container-fluid">        
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Plans Already Activated</th>
                <th scope="col">Activated</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {dataTeam.map((e, i) => (
                <tr key={i}>
                  <td>{e.name}</td>
                  <td>{e.distribution_type}</td>
                  <td></td>
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

export default FormActionPlants;
