/****************************************************************************************
*@file LeadRouting.js
*@author  (breydi vasquez )
*@date 07-08-2020 
*@description Componente LeadRouting
*****************************************************************************************/

import React, { useEffect, useState, useContext } from "react";
import InsertLeadRouting from "./InsertLeadRouting";
import useModalInsert from "./useModalInsert";
import { TableLeadRouting } from "./TableLeadRouting";
import { ServiceRest } from "../../services/ServiceRest";

const LeadRouting = (props) => {
  const { isShowing, toggle } = useModalInsert()
  const [listaCombo, setListaCombo] = useState("Select");
  const [listaCatalog, setCatalog] = useState();
  const [dataLeadRouting, setLeadRouting] = useState();
  const [dataDB, setDB] = useState();

  const handleInputChange = (e) => {
    setLeadRouting({
      ...dataLeadRouting,
      [e.target.name]: e.target.value,
    });
  };
  const [hasError, setErrors] = useState(false);

  const onDeleteLeadRouting = (id) => {
      let p_delete = { id_lead_routing: id };
      ServiceRest("agent_portal/LeadRouting/eliminarLeadRouting", p_delete).then((resp) => {
        if (!resp.error) {
          getData()
        } else {
          const msg = `Report code:: ${resp.data.id_log} for review. Detail: ${resp.detail.message}`;
          setErrors(msg);
          alert(hasError);
        }
      })
  }
  const insertDataLeadRout = (e) => {    
    e.preventDefault();
    ServiceRest("agent_portal/LeadRouting/insertarLeadRouting", dataLeadRouting)
    .then((resp) => {
      if(resp.error){
        const msg = `Report code:: ${resp.data.id_log} for review. Detail: ${resp.detail.message}`;
        alert(msg);
      }else{
        getData()
        toggle()
      }
    })
    .catch((e) => console.error(e))
  }

  const getData = () => {
    ServiceRest("agent_portal/LeadRouting/listarLeadRouting")
      .then((res) => setDB(res.datos))
      .catch((err) => setErrors(err));
  };

  useEffect(() => {
    getData();   
        
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

    const params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'tlead_routing'};
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

      {dataDB && dataDB.map((e,i) => (
      <TableLeadRouting key={i} listLeadRouting={e} onDeleteLeadRouting={onDeleteLeadRouting} />
      ))} 
    </div>
  );
};

export default LeadRouting;
