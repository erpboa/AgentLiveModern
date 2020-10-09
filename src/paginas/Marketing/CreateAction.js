import React from "react";

export const CreateAction = () => {
  return (
    <div>
      <h2>New Action Plan</h2>
      <div className="container-fluid">
      <form>
        <div className="row">
          <div className="col-sm-6">
            <input type="text" className="form-control" placeholder="Plan Name" />
            <textarea className="form-control" placeholder="Add a plan description, What is this plan used for?"/>  
          </div>
          <div className="col-sm-2">
          <labe>Target Plan Type</labe>
          <select  className="selectpicker" data-live-search="true">
					<option hidden defaultValue></option>
					<option>Any</option>
					<option>Seller</option>
					<option>Buyer/Seller</option>				  
					<option>Lease</option>				  
	</select>
          </div>
          <div className="row">
          <div className="col">
            
          </div>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
};
