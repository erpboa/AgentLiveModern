import React, {useEffect,useState} from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import {NavLink} from 'react-router-dom';
import Modal from '../../components/Modal';

const TablaLead = ({ posts, loading }) => {

  const [estadoCheck, setEstadoCheck] = useState(false);
  const [id_lead,setIdLead] = useState([]);

  /*Aqui llamamos el id Modal para tener un modal dianmico*/
  var formularioCalled = <form id="formularioLead">
                            <div className="form-group">
                              <label id="Letras" for="exampleFormControlTextarea1">Add Call Notes</label>
                              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                          </form>;
  var formularioMails = <form id="formularioLead">
                            <div class="form-group row">
                              <label id="Letras" class="col-sm-2 col-form-label">For</label>
                              <div class="col-sm-10">
                                <input type="text" className="form-control" id="formGroupExampleInput" value="email@example.com"/>
                              </div>
                            </div>
                            <div className="form-group">
                              <label id="Letras" for="exampleFormControlTextarea1">Mail</label>
                              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                          </form>;

  const [idModalCalled,setIdModalCalled] = useState("modalLlamadas");
  const [idModalEmails,setIdModalEmails] = useState("modalEmails");
  const [datosModalCalled,setDatosModalCalled] = useState({id_modal:idModalCalled,titulo:"Called",contenido:formularioCalled});
  const [datosModalEmails,setDatosModalEmails] = useState({id_modal:idModalEmails,titulo:"Emails",contenido:formularioMails});
  /********************************************************/

/*Pendiente para hacer los modCheckboxAgent*/
  const cambiar = (id_leads) => {
    setIdLead([...id_lead,id_leads]);
  }
  /*******************************************/

return (
    <div>
    <Table className="table table-responsive table-bordered" id="TablaContenedor">
        <Thead id="ColoresPaneles" >
          <Tr>
            <Th className="AnchoCabTabla" id="Letras">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                  <label className="form-check-label">
                  </label>
              </div>
            </Th>
            <Th className="AnchoCabTabla" id="Letras">Stage</Th>
            <Th className="AnchoCabTabla" id="Letras">Type</Th>
            <Th className="AnchoCabTabla" id="Letras">Name</Th>
            <Th className="AnchoCabTabla" id="Letras">Phone</Th>
            <Th className="AnchoCabTabla" id="Letras">CallGoal</Th>
            <Th className="AnchoCabTabla" id="Letras">Tasks</Th>
            <Th className="AnchoCabTabla" id="Letras">Calls</Th>
            <Th className="AnchoCabTabla" id="Letras">Emails</Th>
            <Th className="AnchoCabTabla" id="Letras"><i className="fa fa-bolt" aria-hidden="true">A</i></Th>
            <Th className="AnchoCabTabla" id="Letras">LastVisit</Th>
            <Th className="AnchoCabTabla" id="Letras"><i className="fa fa-eye" aria-hidden="true"></i></Th>
            <Th className="AnchoCabTabla" id="Letras"><i className="fa fa-home" aria-hidden="true"></i></Th>
            <Th className="AnchoCabTabla" id="Letras"><i className="fa fa-heart" aria-hidden="true"></i></Th>
            <Th className="AnchoCabTabla" id="Letras">Price</Th>
            <Th className="AnchoCabTabla" id="Letras">Registered</Th>
            <Th className="AnchoCabTabla" id="Letras">Agent Activity</Th>
            <Th className="AnchoCabTabla" id="Letras">Lead Activity</Th>
            <Th className="AnchoCabTabla" id="Letras">Close Date</Th>
            <Th className="AnchoCabTabla" id="Letras">Birthday</Th>
            <Th className="AnchoCabTabla" id="Letras">Address</Th>
            <Th className="AnchoCabTabla" id="Letras">Tags</Th>
          </Tr>
        </Thead>
        <Tbody id="CuerpoTabla">
        {posts.map(post => (
          <Tr key = {post.id_lead}>
              <Td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox"
                value={estadoCheck}
                name={post.id_lead}
                onClick={(value) => cambiar(post.id_lead)} id="defaultUnchecked"/>
                  <label className="form-check-label">
                  </label>
              </div>
              </Td>
              <Td>
                stage
              </Td>
              <Td>
                {post.type_lead}
              </Td>
              <Td>
                <NavLink data-toggle="tooltip" data-placement="top" title={`${post.full_name}`} className="nav-link" to={`CommandInfo/Lead${post.id_lead}`}><div>{post.full_name}</div></NavLink>
              </Td>
              <Td>
                {post.phone}
              </Td>
              <Td>
                call goal
              </Td>
              <Td>
                <NavLink data-toggle="tooltip" data-placement="top" className="nav-link" to="#"><div>+ add {post.descripcion_tarea}</div></NavLink>
              </Td>
              <Td>
                <button type="button" id="BotonContenedor" className="btn btn-success" data-toggle="modal" data-target="#modalLlamadas" name="modalLlamadas" onClick={(value) => setDatosModalCalled(datosModalCalled)}><i className="fa fa-phone" id="ContenidoIcono" ></i>{post.llamadas}</button>
              </Td>
              <Td>
              <button type="button" id="BotonContenedor" className="btn btn-warning" data-toggle="modal" data-target="#modalEmails" name="modalEmails" onClick={(value) => setDatosModalEmails(datosModalEmails)}><i className="fa fa-share" id="ContenidoIcono" ></i>{post.emails}</button>
              </Td>
              <Td>
                <i className="fa fa-bolt" aria-hidden="true">{post.action_plan}</i>
              </Td>
              <Td>
                 {post.ultima_visita}
              </Td>
              <Td>
              <i className="fa fa-eye" aria-hidden="true"></i> {post.vistas}
              </Td>
              <Td>
              <i className="fa fa-home" aria-hidden="true"></i> {post.casas}
              </Td>
              <Td>
              <i className="fa fa-heart" aria-hidden="true"></i> {post.likes}
              </Td>
              <Td>
                {post.price}
              </Td>
              <Td>
                {post.fecha_reg}
              </Td>
              <Td>
                {post.activity_agent}<br/>
                <b id="nombreAgent">{post.agent_name}</b>
              </Td>
              <Td>
                {post.lead_activity}
              </Td>
              <Td>
                <button type="button" className="btn btn-link">Add</button>
              </Td>
              <Td>
                <button type="button" className="btn btn-link">Add</button>
              </Td>
              <Td>
                {post.address}
              </Td>
              <Td>
                {post.tags}
              </Td>
            </Tr>
        ))}
        </Tbody>
      </Table>
      <Modal datos={datosModalCalled}/>
      <Modal datos={datosModalEmails}/>
      </div>
  );

}
export default TablaLead;
