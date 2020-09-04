/****************************************************************************************
 *@file FormAddNote.js
 *@author  (Maylee Perez Pastor)
 *@date 12-08-2020
 *@description Componente Add FormAddNote
 *****************************************************************************************/


import React, { useState, useEffect, useContext } from "react";
import { ServiceRest } from "../../services/ServiceRest";
import { ReloadComponent } from "../../contexts/ReloadComponent";

import './styles/FormAddNoteStyle.css';
import $ from "jquery";

const FormAddNote = (props) => {
    const { reloadComponent, setReloadComponent } = useContext(ReloadComponent);
    const [hasError, setErrors] = useState(false);

    const id_lead = props.match.params.id_lead;

    console.log('llegaid', id_lead)

    /*Utilizaremos los hooks de estado para cambiar el valor*/
    const [descripcion, setdescripcion] = useState();
    /********************************************************/

    // List data table
    /*const getData = async () => {
      ServiceRest("agent_portal/Note/listarNote")
        .then((res) => setDataNote(res.datos))
        .catch((err) => setErrors(err));
    };*/
    // List data table
    const getData = e => {
        var params = { start: 0, limit: 50, id_lead:id_lead};
        var listado = ServiceRest('agent_portal/Note/listarNote',params);

        listado.then((value) => {
            /*Enviamos el Valor a las variables para mostrar en el componente */
            if (value.datos.length > 0 ){
                setdescripcion(value.datos[0].descripcion);
            }
            /**********************************************************************/
        });
    }

    useEffect(() => {
        if (id_lead != null || id_lead != '') {
            getData();
        }

    }, []);

    /*useEffect(() => {
      getData();
    }, [reloadComponent]);*/




    /***************Insertar un nuevo Note********************/
    /*Creamos la variable que almacenara los Campos del Lead*/
    const [dataNoteInsert, setNoteInsert] = useState();
    //console.log('lleganote2',dataNoteInsert)


    /********Llamamos a la funcion para recuperar los datos de cada Campo cuando se cambie del input*****/
    const enviarDatos = (e) => {
        //console.log('e', e.target.value)
        setNoteInsert(e.target.value);
    };
    /****************************************************************************************************/

    /*******Aqui llamamos al boton de Agregar un nuevo Lead y mandar los datos al ERP*******/
    const insertNote = async (e) => {
        var params = { start: 0, limit: 50, id_lead:id_lead, descripcion:dataNoteInsert};
        var insertar = ServiceRest('agent_portal/Note/insertarNote',params);
        console.log('lleganote3344 ',insertar)
        insertar.then((resp) => {
            console.log('lleganoteeeee2s', resp.error)
            if (resp.error) {
                const msg = `Reporte el codigo: ${resp.data.id_log} para revision. Detalle: ${resp.detail.message}`;
                alert(msg);
            }
        })


    };


    return (
        <div>

            <div id="container-all-addNote">
                <div id="container-logCall-det">
                    <form id="formularioLead" className="was-validated" validate="true">

                        <div className="form-group">
                                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                            placeholder="Add notes about this lead and @Albert Hernandez or @Jason Glassman"
                                            name="descripcion" onChange={enviarDatos} defaultValue={descripcion}/>
                        </div>

                        <div className="row">
                            <div className="col">
                            </div>
                            <div className="col">
                                <a href="http://success.greatagentusa.com//hc/en-us/articles/360010934433-Turning-On-Off-Leads"
                                   alt="greatagentusa.com">Learn more about Notes</a>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-primary"
                                        id="bn-addNote-footer" onClick={insertNote}>Add Note
                                </button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>

        </div>

    );
};

export default FormAddNote;
