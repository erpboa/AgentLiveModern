/****************************************************************************************
 *@file FormLogCall.js
 *@author  (Maylee Perez Pastor)
 *@date 12-08-2020
 *@description Componente Add FormLogCall
 *****************************************************************************************/


import React, {useState, useEffect, useContext} from "react";
import {ServiceRest} from "../../services/ServiceRest";
import {ReloadComponent} from "../../contexts/ReloadComponent";

import './styles/FormLogCallStyle.css';
import $ from "jquery";

const FormLogCall = (props) => {
    const {reloadComponent, setReloadComponent} = useContext(ReloadComponent);
    const [hasError, setErrors] = useState(false);

    const value_id_lead = props.id_lead;

    /*************** List data table ********************/

    /*Utilizaremos los hooks de estado para cambiar el valor*/
    const [notes, setnotes] = useState();
    const [type, settype] = useState('active');
    console.log('llegacall33445list2 ',type)


    const getData = e => {
        var params = { start: 0, limit: 50, id_lead:value_id_lead};
        var listado = ServiceRest('agent_portal/Call/listarCall',params);

        listado.then((value) => {
            /*Enviamos el Valor a las variables para mostrar en el componente*/
            //console.log('llegacall33445list ',value.datos)
            if (value.datos.length > 0 ){
                setnotes(value.datos[0].notes);
                settype(value.datos[0].type);
            }

        });
    }

    useEffect(() => {
        if (value_id_lead != null || value_id_lead != '') {
            getData();
        }

    }, []);


    /***************Insertar un nuevo Lead********************/
    /*Creamos la variable que almacenara los Campos del Lead*/
    const [dataCallInsert, setCallInsert] = useState();

    /********Llamamos a la funcion para recuperar los datos de cada Campo cuando se cambie del input*****/
    const enviarDatos = (e) => {
        setCallInsert({...dataCallInsert,[e.target.name]: e.target.value});
    };
    /****************************************************************************************************/

    /*******Aqui llamamos al boton de Agregar un nuevo call y mandar los datos al ERP*******/
    const insertCall = async (e) => {
        var params = { start: 0, limit: 50, id_lead:value_id_lead, notes:dataCallInsert.notes,type:dataCallInsert.type };
        /*Llamamos al servicio ServiceRest para mandar la url y los parametros para hacer inserccion*/
        var insertar = ServiceRest('agent_portal/Call/insertarCall', params);

        insertar.then((resp) => {
            if (resp.error) {
                const msg = `Reporte el codigo: ${resp.data.id_log} para revision. Detalle: ${resp.detail.message}`;
                alert(msg);
            }
        })


    };


    return (
        <div id="container-all-logCall">

            <form id="formularioLead" className="was-validated" validate="true">

                <div className="tab-content">
                    <div id="container-logCall">
                        <button type="button" className="btn btn-outline-success" id="bn-container-logCall" onClick={enviarDatos} name="type" value="TalkedTo" > Talked to Lead </button>
                        <button type="button" className="btn btn-outline-secondary" id="bn-container-logCall" onClick={enviarDatos} name="type" value="LeftVoicemail">Left Voicemail </button>
                        <button type="button" className="btn btn-outline-dark" id="bn-container-logCall" onClick={enviarDatos} name="type" value="CallAttempt">Call Attempt</button>
                    </div>
                    <div id="container-logCall">
                        <button type="button" className="btn btn-outline-warning" id="bn-container-logCall" onClick={enviarDatos} name="type" value="BadTime">Bad Time </button>
                        <button type="button" className="btn btn-outline-danger" id="bn-container-logCall" onClick={enviarDatos} name="type" value="OptedOut">Opted Out </button>
                        <button type="button" className="btn btn-outline-danger" id="bn-container-logCall" onClick={enviarDatos} name="type" value="WrongNumber">Wrong Number </button>
                    </div>
                </div>

                <div id="container-logCall-det">
                    <form>
                        <div className="form-group" >
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="notes"
                                      placeholder="Add call notes here" onChange={enviarDatos} defaultValue={notes}/>
                        </div>
                    </form>

                </div>

                <div className="row" id="container-logCall-footer">
                    <div className="col">
                        <div className="alert alert-secondary" role="alert" id="text-phone">
                            to: {props.telefono}
                        </div>
                    </div>
                    <div className="col">
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-primary"
                                id="bn-logCall-footer" onClick={insertCall}>Save
                        </button>
                    </div>

                </div>

            </form>


        </div>
    );
};

export default FormLogCall;
