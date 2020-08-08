/****************************************************************************************
*@file LeadRouting.js
*@author  (breydi vasquez )
*@date 07-08-2020 
*@description Componente LeadRouting
*****************************************************************************************/

import React from "react";
import InsertLeadRouting from "./InsertLeadRouting";
import useModalInsert from "./useModalInsert";

const LeadRouting = (props) => {
  const { isShowing, toggle } = useModalInsert();

  return (
    <div>
    <div className="d-flex flex-row-reverse">
      <div className="d-flex flex-row-reverse">
        <div className="p-2">
          <button type="button" className="btn btn-primary" >
            Save Changes
          </button>
        </div>
        <div className="p-2">
          <button type="button" className="btn btn-warning" onClick={toggle}>
            + Add Rule
          </button>
        </div>
        <div className="p-2">
          <button type="button" className="btn  btn-secondary " onClick={toggle}>
             Cancel
          </button>
        </div>
      </div>
      <div>        
      </div>
    </div>
    
      <InsertLeadRouting isShowing={isShowing} hide={toggle} />
    </div>
  );
};

export default LeadRouting;
