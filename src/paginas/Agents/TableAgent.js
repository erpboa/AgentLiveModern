/****************************************************************************************
*@file TableAgent.js
*@author  (breydi vasquez )
*@date 07-08-2020 
*@description Componente table agent
*****************************************************************************************/


import React, { useState, useContext } from "react";
import { ServiceRest } from "../../services/ServiceRest";
import { ReloadComponent } from "../../contexts/ReloadComponent";
import { CheckBoxComponent } from '../../components/CheckBox';

export const TableAgent = (props) => {
  let action_rest = 'agent_portal/Agent/modCheckboxAgent'
  const { reloadComponent, setReloadComponent } = useContext(ReloadComponent);
  const [hasError, setErrors] = useState(false);

  
  // Delete Agent
  const deleteAgent = (id) => {
    let p_delete = { id_agent: id };
    ServiceRest("agent_portal/Agent/eliminarAgent", p_delete).then((resp) => {
      if (!resp.error) {          
        if (reloadComponent == undefined || reloadComponent == false) {
          setReloadComponent(true);
        } else {
          setReloadComponent(false);
        }         
      } else {
        const msg = `Report code:: ${resp.data.id_log} for review. Detail: ${resp.detail.message}`;
        setErrors(msg);
        alert(hasError);
      }
    })
  }
  
  const TypeAgent = (e) => {
    let icon_fa 
    let type_fa
    switch (e.el) {
      case 'agent': 
      icon_fa = 'fa fa-user'
      type_fa = 'Agent'
        break
      case 'real_estate_broker':
        icon_fa = 'fa fa-user'
        type_fa = 'Broker'         
        break
      case 'lender': 
      icon_fa = 'fa fa-user'
        type_fa = 'Lender'    
       break
    }
return (
    <div>      
            
        <i className={icon_fa}></i> {type_fa} 
    </div>
    )
  }

  return (
    <div className="container-fluid">
      <table className="table table-bordered table-hover">
        <thead style={{fontSize:13}}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Acess Level</th>
            <th scope="col">Receive Sellers</th>
            <th scope="col">Last Seller Lead</th>
            <th scope="col">Receive Buyers</th>
            <th scope="col">Last Buyer Lead</th>
            <th scope="col">Receive Renters</th>
            <th scope="col">Last Renter Lead</th>
            <th scope="col">Lender</th>
            <th scope="col">Allow Exports</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map((e, i) => (
              <tr key={i}>                
                <td>
                  {e.name} {e.email_address}
                </td>
                <td>
                  <TypeAgent el={e.agent_type}/>
                </td>
                <td>
                  <CheckBoxComponent  type='seller' action={action_rest}  id_component = {e.id_agent} el={e.receive_seller} id={i} size="switch switch-sm"/>
                </td>
                <td></td>
                <td>
                  <CheckBoxComponent  type='buyer'  action={action_rest}   id_component = {e.id_agent} el={e.receive_buyer} id={i} size="switch switch-sm"/>
                </td>
                <td></td>
                <td>
                  <CheckBoxComponent  type='renter' action={action_rest}   id_component = {e.id_agent} el={e.receive_renter} id={i} size="switch switch-sm" />
                </td>
                <td></td>
                <td></td>
                <td>
                  <CheckBoxComponent  type='export' action={action_rest}   id_component = {e.id_agent} el={e.allow_export} id={i} size="switch switch-sm" />
                </td>
                <td width="3px">
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={(value) => deleteAgent(e.id_agent)}                    
                  >
                    <i style={{color: '#DC143C'}} className="fa fa-trash-o fa-2x" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
