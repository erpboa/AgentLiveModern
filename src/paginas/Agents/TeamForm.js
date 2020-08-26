import React from "react";

const TeamForm = ({  
  handleChange,
  handleDeleteClick,
  team,
  usernameList,
  insertTeam
}) => {
  const onCanceModal = () => {
  team.agents = []
  team.name = ''
  team.distribution_type = ''
  }
  return (
    <>
      <div className="modal-body">
        <form id="formularioTeam">
          <div className="form-row">
            <div className="col-3">
              <label id="Letras">
                Name
                <strong className="text-danger" title="This is required">
                  *
                </strong>
              </label>
              <input
                type="text"
                className="form-control"
                value={team.name}
                name={"name"}
                placeholder="Name"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col">
              <label htmlFor="agents" id="Letras">
                <br></br>
                Agents
                <strong className="text-danger" title="This is required">
                  *
                </strong>
              </label>
              <br></br>
              
              {team.agents &&
                team.agents.map((agent,i) => {
                  
                  return (
                    <div className="row" id="Letras" key={i}>
                      <div className="col-3">{agent.name}</div>
                      <div className="col-2">
                        <select className="form-control" 
                          name="lead_per_round"   
                          id={agent.id_agent}                                        
                          onChange={handleChange}>
                          <option defaultValue>Select</option> 
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="col-3">lead per round (100)%</div>
                      <div className="col-1">
                        <button
                          type="button"
                          className="btn btn-sm"
                          onClick={handleDeleteClick("agents", agent.id_agent)}
                        >
                          <i
                            style={{ color: "white" }}
                            className="fa fa-trash-o fa-2x"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </div>                      
                    </div>
                    
                  );
                })}                
            </div>
          </div>
          <br></br>
          <div className="form-row">
            <div className="col-3">
              <select
                className="form-control"
                name={"agents"}
                value={""}
                onChange={handleChange}
              >
                <option defaultValue>Select</option>
                {usernameList.map(({ id_agent, name }) => (
                  <option key={id_agent} value={id_agent}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br></br>
          <div className="form-row">
            <div className="col">
              <label id="Letras">
                Distribution
                <strong className="text-danger" title="This is required">
                  *
                </strong>
              </label>
              <select
                className="form-control"
                onChange={handleChange}
                value={team.distribution_type}
                name={"distribution_type"}
              >
                <option defaultValue>Select</option>                
                <option value="round_robin">
                  Round Robin: Weighted distribution of leads to agents in
                  sequential order
                </option>
                <option value="claim_lead">
                  Claim Lead: Multiple agents contacted, first one who claims
                  lead gets it
                </option>
              </select>
            </div>
          </div>
        </form>
        <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"  
                onClick={onCanceModal}              
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={insertTeam}
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
      </div>
    </>
  );
};

export default TeamForm;
