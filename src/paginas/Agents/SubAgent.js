/****************************************************************************************
*@file SubAgent.js
*@author  (breydi vasquez )
*@date 07-08-2020 
*@description Componente SubAgent
*****************************************************************************************/

import React, { useState, useEffect, useContext } from "react";
import { ServiceRest } from "../../services/ServiceRest";
import { ReloadComponent } from "../../contexts/ReloadComponent";
import { TableAgent } from "./TableAgent";


const SubAgent = () => {
  const {reloadComponent, setReloadComponent} = useContext(ReloadComponent);
  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState();

  // List data table  
  const getData = async () => {
    ServiceRest('agent_portal/Agent/listarAgent')
      .then((res) => setData(res.datos))
      .catch((err) => setErrors(err));
  };

  useEffect(() => {
    getData();
  }, [reloadComponent]);



  return (
    <div >      
      {data && <TableAgent data={data}/>}
    </div>
  );
};

export default SubAgent;
