/****************************************************************************************
 *@file FormSendEmail.js
 *@author  (Maylee Perez Pastor)
 *@date 12-08-2020
 *@description Componente Add FormSendEmail
 *****************************************************************************************/


import React, {useState, useEffect, useContext} from "react";
import {ServiceRest} from "../../services/ServiceRest";
import {ReloadComponent} from "../../contexts/ReloadComponent";

import './styles/FormSendEmailStyle.css';
import $ from "jquery";

const FormSendEmail = (props) => {
  const {reloadComponent, setReloadComponent} = useContext(ReloadComponent);
  const [hasError, setErrors] = useState(false);

  const value_id_lead =props.match.params.id_lead;

  /*************** List data table ********************/



  useEffect(() => {
    if (value_id_lead != null || value_id_lead != '') {
      //getData();
    }

  }, []);


  /***************Insertar un nuevo Lead********************/
  /*Creamos la variable que almacenara los Campos del Lead*/
  const [dataLeadInsert, setLeadInsert] = useState();

  /********Llamamos a la funcion para recuperar los datos de cada Campo cuando se cambie del input*****/
  const enviarDatos = (e) => {
    setLeadInsert({...dataLeadInsert, [e.target.name]: e.target.value,});
  };
  /****************************************************************************************************/

  /*******Aqui llamamos al boton de Agregar un nuevo call y mandar los datos al ERP*******/
  const insertLead = async (e) => {
    if (reloadComponent == undefined || reloadComponent == false) {
      setReloadComponent(true);
    } else {
      setReloadComponent(false);
    }
    e.preventDefault();
    /*Llamamos al servicio ServiceRest para mandar la url y los parametros para hacer inserccion*/
    var insertar = ServiceRest('agent_portal/Call/insertarCall', dataLeadInsert);
    insertar.then((resp) => {
      if (!resp.error) {
        $("#modalLead").modal("hide");
      } else {
        const msg = `Reporte el codigo: ${resp.data.id_log} para revision. Detalle: ${resp.detail.message}`;
        alert(msg);
      }
    })


  };


  return (




      <div className="tab-content">


        <div className="card card-primary card-outline">

          {/* /.card-header */}
          <div className="card-body">
            <div className="form-group">
              <input className="form-control" placeholder="To:" />
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Subject:" />
            </div>
            <div className="form-group">
                                    <textarea id="compose-textarea" className="form-control" style={{height: 300}}
                                              defaultValue={"                      <h1><u>Heading Of Message</u></h1>\n                      <h4>Subheading</h4>\n                      " +
                                              "<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain\n                        " +
                                              "was born and I will give you a complete account of the system, and expound the actual teachings\n                        " +
                                              "of the great explorer of the truth, the master-builder of human happiness. No one rejects,\n                        " +
                                              "dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know\n                        " +
                                              "how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again\n                        " +
                                              "is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain,\n                        " +
                                              "but because occasionally circumstances occur in which toil and pain can procure him some great\n                        " +
                                              "pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise,\n                        " +
                                              "except to obtain some advantage from it? But who has any right to find fault with a man who\n                        " +
                                              "chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that\n                        " +
                                              "produces no resultant pleasure? On the other hand, we denounce with righteous indignation and\n                        " +
                                              "dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so\n                        " +
                                              "blinded by desire, that they cannot foresee</p>\n                      <ul>\n                        " +
                                              "<li>List item one</li>\n                        " +
                                              "<li>List item two</li>\n                        <" +
                                              "li>List item three</li>\n                        " +
                                              "<li>List item four</li>\n                      " +
                                              "</ul>\n                      " +
                                              "<p>Thank you,</p>\n                      " +
                                              "<p>John Doe</p>\n                    "} />
            </div>
            <div className="form-group">
              <div className="btn btn-default btn-file">
                <i className="fas fa-paperclip" /> Attachment
                <input type="file" name="attachment" />
              </div>
              <p className="help-block">Max. 32MB</p>
            </div>
          </div>
          {/* /.card-body */}
          <div className="card-footer">
            <div className="float-right">
              <button type="button" className="btn btn-default"><i className="fas fa-pencil-alt" /> Draft</button>
              <button type="submit" className="btn btn-primary"><i className="far fa-envelope" /> Send</button>
            </div>
            <button type="reset" className="btn btn-default"><i className="fas fa-times" /> Discard</button>
          </div>
          {/* /.card-footer */}
        </div>
        {/* /.card */}
      </div>





  );
};

export default FormSendEmail;
