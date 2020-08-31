/****************************************************************************************
*@file LeadRouting.js
*@author  (breydi vasquez )
*@date 07-08-2020 
*@description Componente LeadRouting
*****************************************************************************************/

import React, { useEffect, useState } from "react";
import InsertLeadRouting from "./InsertLeadRouting";
import useModalInsert from "./useModalInsert";
import { ServiceRest } from "../../services/ServiceRest";

const LeadRouting = (props) => {
  const { isShowing, toggle } = useModalInsert()
  const [listaCombo, setListaCombo] = useState("Select");
  const [listaCatalog, setCatalog] = useState();
  const [dataLeadRouting, setLeadRouting] = useState();

  const handleInputChange = (e) => {
    setLeadRouting({
      ...dataLeadRouting,
      [e.target.name]: e.target.value,
    });
  };

  const insertDataLeadRout = (e) => {    
    
    ServiceRest("agent_portal/LeadRouting/insertarLeadRouting", dataLeadRouting)
    .then((resp) => {
      if(resp.error){
        const msg = `Report code:: ${resp.data.id_log} for review. Detail: ${resp.detail.message}`;
        alert(msg);
      }
    })
    .catch((e) => console.error(e))
  }

  useEffect(() => {
    // const tableList = await ServiceRest()
    ServiceRest("agent_portal/Agent/listarAgent")
    .then((value) => {
      setListaCombo(
        value.datos.map((comboLead, i) => {
          return (
              <option value={comboLead.id_agent} key={comboLead.id_agent}>
              {comboLead.name}
            </option> 
            
          )
        })
      )
    })
    var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'tlead_routing'};
    ServiceRest('parametros/Catalogo/listarCatalogoCombo', params)
    .then((value) => {
      setCatalog(
        value.datos.map(e => {
          return (
              <option value={e.descripcion} key={e.id_catalogo}>
              {e.descripcion}
            </option> 
            
          )
        })
      )
    })
  },[])

  return (
    <div>
    <div className="d-flex flex-row-reverse">
      <div className="d-flex flex-row-reverse">
        <div className="p-2">
          <button type="button" className="btn btn-primary"
          onClick={insertDataLeadRout} >
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
    
      <InsertLeadRouting isShowing={isShowing} hide={toggle} listaCombo={listaCombo} listaCatalog={listaCatalog} handleInputChange={handleInputChange}/>
      {/* <TableLeadRouting listLeadRouting={listLeadRouting} listaCombo={listaCombo}/> */}
    </div>
  );
};

export default LeadRouting;
