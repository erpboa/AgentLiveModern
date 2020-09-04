/****************************************************************************************
 *@file FormActionPlants.js
 *@author  (Maylee Perez Pastor)
 *@date 12-08-2020
 *@description Componente Add FormActionPlants
 *****************************************************************************************/


import React, {useState, useEffect, useContext} from "react";
import {ServiceRest} from "../../services/ServiceRest";
import {ReloadComponent} from "../../contexts/ReloadComponent";

import './styles/FormActionPlants.css';

const FormActionPlants = (props) => {
  const {reloadComponent, setReloadComponent} = useContext(ReloadComponent);
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
  return (
      <div>
        {dataTeam && (
            <div className="container-fluid">

              <div>
                <button data-toggle="modal" className="btn btn-primary" data-target="#chooseActionPlanForm"
                        id="chooseActionPlan" type="button">Choose Action Plan
                </button>

                <div className="modal fade" data-backdrop="static" data-keyboard="false"
                     id="chooseActionPlanForm" role="dialog" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Action Plan
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>

                      <div className="modal-body">
                        <form id="formularioTeam">
                          <div className="form-row">

                            <div className="col">
                              <nav class="navbar navbar-light bg-light">
                                <form class="form-inline">
                                  <input class="form-control mr-sm-2" type="search"
                                         placeholder="Search" aria-label="Search"/>
                                  <button class="btn btn-outline-success my-2 my-sm-0"
                                          type="submit">Search
                                  </button>
                                </form>
                              </nav>

                              <div>
                              </div>

                              <div>
                                <nav id="navbar-example2"
                                     className="navbar navbar-light bg-light">
                                  <a className="dropdown-item" href="#one">one</a>
                                </nav>
                                <div data-spy="scroll" data-target="#navbar-example2" data-offset="0">
                                </div>
                              </div>
                            </div>

                          </div>
                        </form>
                      </div>

                      <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                            type="button"
                            //onClick={insertTeam}
                            className="btn btn-primary"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>


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
