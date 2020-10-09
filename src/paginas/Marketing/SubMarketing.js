import React from "react";
import { Link } from "react-router-dom";

export const SubMarketing = () => {
  return (
    <div >
      <div className="row">
        <div className="col-1" style={{ marginLeft: "20px" }}>
          <h4 className="fas fa-angle-left">&nbsp;&nbsp;&nbsp;</h4>
          <h4 className="fas fa-angle-right"></h4>
        </div>
        <div >Viewing 26 - 50 of 454 action plans</div>
        <div>
          &nbsp;&nbsp;<b>Show</b>
        </div>
        <div className="col-2">
          <select className="form-control ">
            <option hidden defaultValue>
              Select
            </option>
            <option value="popular_action">Popular Action Plans</option>
            <option value="all_action">All Action Plans</option>
            <option value="great_agent_template">Great Agent Templates</option>
          </select>
        </div>
        <div className="col-2">
        <div className="input-group">
            <input className="form-control py-2 border-right-0 border" type="search" placeholder="Search" id="example-search-input" />
            <span className="input-group-append">
                <div className="input-group-text bg-transparent"><i className="fa fa-search"></i></div>
            </span>
        </div>
        </div>
        <div className="col-4">
        <Link to="/Marketing/CreateAction" className="btn float-right" style={{background:'#00b5ad', color:'#fff', fontWeight:'bold'}}>Create Action Plan</Link>
  
        </div>
       
      </div>

    <br></br>
      <div className="container-fluid">
        <table className="table table-bordered table-hover">
          <thead style={{ fontSize: 13 }}>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Target Type</th>
              <th scope="col">Steps</th>
              <th scope="col">Running</th>
              <th scope="col">Last Updated</th>
              <th scope="col">Last Used</th>
              <th scope="col">Auto Start</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};
