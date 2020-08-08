/****************************************************************************************
*@file CheckBox.js
*@author  (breydi vasquez )
*@date 07-08-2020 
*@description Component checkbox
*****************************************************************************************/
import React, { useContext } from "react";
import "./styles/checkBox.css";
import { ServiceRest } from "../services/ServiceRest";
import { ReloadComponent } from "../contexts/ReloadComponent";

export const CheckBoxComponent = (props) => {
    const { reloadComponent, setReloadComponent } = useContext(ReloadComponent);

    let size = props.size
    let receive  = props.el

    const check = receive === "si" ? true : false
    
    const key = `${props.type}${props.id}`
    
    const onUpdateCheck = (e, data) => {

        ServiceRest(data.action, {id_component: data.id_component, control: data.type, checked: data.el})
        .then((resp) => {
            if (!resp.error) {                                
              setReloadComponent(true);              
            } else {
              const msg = `Reporte el codigo: ${resp.data.id_log} para revision. Detalle: ${resp.detail.message}`;              
              alert(msg);
            }})
    }

  return (
    <div>
      <div className="form-group">
        <span className={size}>
          <input type="checkbox" className="switch" id={key} 
          defaultChecked={check} 
          onClick={(e)=> onUpdateCheck(e, props)}
          />
          <label htmlFor={key}></label>
        </span>
      </div>
    </div>
  );
};
