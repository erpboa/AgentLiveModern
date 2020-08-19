import React, { useState, useEffect } from "react";
import { dataTeam } from "./team.json";

export const SelectAgent = (props) => {

  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false)
   
  const addAgent = (e) => {
    e.preventDefault();    
    setVisible(false)

    setItems(
        items.concat(
            { 
                "id_agent": e.target.value                
            })            
        )    
        dataTeam.agents.push(`{ 
      "id_agent": ${e.target.value}}`)            
  }

  return (
    <div>
      <div className="form-row">
        <div className="col">
          <label id="Letras">
            Agents
            <strong className="text-danger" title="This is required">
              *
            </strong>
          </label>
          <select className="form-control" name="id_agent" onChange={addAgent}>
            <option hidden defaultValue>
              Select
            </option>
            {props.combo}
          </select>
        </div>
        <div className="col">
          <label>&nbsp;</label>
          <select className="form-control" name="lead_per_round" hidden={visible}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="col" id="Letras">
          <label>&nbsp;</label>
          <div hidden={visible}>lead per round (100)%</div>
        </div>
        <div className="col">
          <label>&nbsp;</label>
          <div>
            <button type="button" className="btn btn-sm" hidden={visible} >
              <i
                style={{ color: "white" }}
                className="fa fa-trash-o fa-2x"
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </div>
      </div>
      {items.map((e, i) => {                
        return (
          <div className="form-row" key={i}>
            <div className="col">
              <label id="Letras">
                Agents
                <strong className="text-danger" title="This is required">
                  *
                </strong>
              </label>
              <select
                className="form-control"
                name="id_agent"
                onChange={addAgent}
              >
                <option hidden defaultValue>
                  Select
                </option>
                {props.combo}
              </select>
            </div>
            <div className="col">
              <label>&nbsp;</label>
              <select className="form-control" name="lead_per_round" hidden={visible}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="col" id="Letras">
              <label>&nbsp;</label>
              <div hidden={visible}>lead per round (100)%</div>
            </div>
            <div className="col">
              <label>&nbsp;</label>
              <div>
                <button type="button" className="btn btn-sm" hidden={visible} >
                  <i
                    style={{ color: "white" }}
                    className="fa fa-trash-o fa-2x"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
