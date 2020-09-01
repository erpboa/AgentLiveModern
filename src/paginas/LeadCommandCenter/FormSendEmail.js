/****************************************************************************************
*@file FormSendEmail.js
*@author  (Maylee Perez Pastor)
*@date 12-08-2020 
*@description Componente Add FormSendEmail
*****************************************************************************************/


import React, { useState, useEffect, useContext } from "react";
import { ServiceRest } from "../../services/ServiceRest";
import { ReloadComponent } from "../../contexts/ReloadComponent";

const FormSendEmail = (props) => {
  const { reloadComponent, setReloadComponent } = useContext(ReloadComponent);
  const [hasError, setErrors] = useState(false);
  const [dataTeam, setDataTeam] = useState();

  // List data table
  const getData = async () => {
    ServiceRest("agent_portal/Team/listarTeam")
      .then((res) => setDataTeam(res.datos))
      .catch((err) => setErrors(err));
  };

  useEffect(() => {
    getData();
  }, [reloadComponent]);

  // Delete Team
  const deleteTeam = (id) => {
    let p_delete = { id_team: id };
    ServiceRest("agent_portal/Team/eliminarTeam", p_delete).then((resp) => {
      if (!resp.error) {
        getData()
      } else {
        const msg = `Reporte el codigo: ${resp.data.id_log} para revision. Detalle: ${resp.detail.message}`;
        setErrors(msg);
        alert(hasError);
      }
    });
  };
  return (
      <div className="col-md-9">
        <div className="card card-primary card-outline">
          <div className="card-header">
            <h3 className="card-title">Compose New Message</h3>
          </div>
          {/* /.card-header */}
          <div className="card-body">
            <div className="form-group">
              <input className="form-control" placeholder="To:" />
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Subject:" />
            </div>
            <div className="form-group">
              <textarea id="compose-textarea" className="form-control" style={{height: 300}} defaultValue={"                      <h1><u>Heading Of Message</u></h1>\n                      <h4>Subheading</h4>\n                      <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain\n                        was born and I will give you a complete account of the system, and expound the actual teachings\n                        of the great explorer of the truth, the master-builder of human happiness. No one rejects,\n                        dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know\n                        how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again\n                        is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain,\n                        but because occasionally circumstances occur in which toil and pain can procure him some great\n                        pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise,\n                        except to obtain some advantage from it? But who has any right to find fault with a man who\n                        chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that\n                        produces no resultant pleasure? On the other hand, we denounce with righteous indignation and\n                        dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so\n                        blinded by desire, that they cannot foresee</p>\n                      <ul>\n                        <li>List item one</li>\n                        <li>List item two</li>\n                        <li>List item three</li>\n                        <li>List item four</li>\n                      </ul>\n                      <p>Thank you,</p>\n                      <p>John Doe</p>\n                    "} />
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
