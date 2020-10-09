/****************************************************************************************
*@file LeadRouting.js
*@author  (breydi vasquez )
*@date 07-08-2020 
*@description Componente LeadRouting
*****************************************************************************************/

import React from "react";

export const  TableLeadRouting = ({ listLeadRouting, onDeleteLeadRouting }) => {
    


return(
    
        <div
          className="accordion md-accordion"
          id="accordionEx"          
        >
          <div className="card">
            <div className="card-header" role="tab" id="headingOne1">
              <div>
                <h5 className="mb-0" className="btn float-left">
                  <i
                    className="fas fa-angle-right rotate-icon"
                    data-toggle="collapse"
                    data-parent="#accordionEx"
                    href="#collapseOne1"
                    aria-expanded="false"
                    aria-controls="collapseOne1"
                  ></i>
                   <span ></span>
                </h5>
                <div className="row">
                  <div className="col-sm-1">
                  <button type="button" className="btn btn-primary">
                  <span className="badge badge-light">1</span>          
                </button>
                  </div>
                  <div className="col-sm-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Rule Name"
                      name="name_rule"
                      value={listLeadRouting.name_rule}                      
                    />
                  </div>
                  <div className="col-sm-7" style={{color: '#000'}}> 1 Conditions</div>                  
                  <div className="col-sm-2" >
                    <button type="button" className="btn btn-sm"
                    onClick={() => onDeleteLeadRouting(listLeadRouting.id_lead_routing)}
                    >
                      <i className="fa fa-trash-o fa-3x" aria-hidden="true"></i>
                    </button>
                    <h5 className="mb-0" className="btn float-right">
                    <i
                      className="fas fa-angle-left rotate-icon"
                      data-toggle="collapse"
                      data-parent="#accordionEx"
                      href="#collapseOne1"
                      aria-expanded="false"
                      aria-controls="collapseOne1"
                    ></i>
                  </h5>
                  </div>

                </div>
              </div>
            </div>

            <div
              style={{ background: "#fff" }}
              id="collapseOne1"
              className="collapse "
              role="tabpanel"
              aria-labelledby="headingOne1"
              data-parent="#accordionEx"
            >
              <div
                id="collapseOne1"
                className="collapse "
                role="tabpanel"
                aria-labelledby="headingOne1"
                data-parent="#accordionEx"
              >
                <div className="card-body">
                  <div className="select_1">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="input-group">
                          <div>Leads who meet &nbsp;&nbsp;</div>
                          <select className="form-control"  name="lead_who_meat">
                            <option hidden defaultValue>Select</option>
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
                      <div className="col-md-3">
                        <select className="form-control" >
                          <option hidden defaultValue>
                            Select
                          </option>                          
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-1">                    
                        <div className="form-group">
                          <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="import_matching" name="import_match_lead"
                            defaultChecked                             
                            />
                            <label htmlFor="import_matching"></label>
                          </span>                        
                      </div>
                    </div>
                    <div className="col-md-6">
                      import matching leads and route to
                    </div>
                  </div>
                  <hr />
                  <div className="select_3">
                    <div className="row">
                      <div className="col-md-2">
                        <label>Assign Primary Agent</label>
                        <select
                          className="form-control"                          
                        >
                          <option hidden defaultValue>
                            Select
                          </option>                          
                        </select>
                      </div>
                      <div className="col-md-2">
                        <label>Assign Lender</label>
                        <select className="form-control" >
                          <option hidden defaultValue>
                            Select
                          </option>
                          <option value="price">Sanders Park</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="select_4">
                    <div className="row">
                      <div className="col-md-1">
                        <div className="form-group">
                          <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="re_route_lead" name="re_route_lead"                                                           
                            />
                            <label htmlFor="re_route_lead"></label>
                          </span> 
                      </div>
                      </div>
                      <div className="col-md-5">
                        Re-route lead if the rule matches the lead after routing
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
)
}

