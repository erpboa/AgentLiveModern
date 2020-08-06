import React, {useEffect, useState, useContext} from 'react';
import '../../components/styles/formLogin.css';
import '../../components/styles/stylesMenu.css';
import './styles/LeadCommandCenterStyle.css';
import '../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css';
import Footer from '../../components/Footer';
import PxpClient from 'pxp-client';
import {ServiceRest} from "../../services/ServiceRest";
import {ReloadComponent} from "../../contexts/ReloadComponent";
import {NavLink} from 'react-router-dom';

const ContenidoLeadCommandCenter = (props) => {


/***************Creamos el hook de estado para almacenar el resultado************/
const [data, setData] = useState();
const [carga, setCarga] = useState(false);
/*******************************************************************************/
/*Recuperamos el componente para hacer el reload de la tabla*/
const {reloadComponent,setReloadComponent} = useContext(ReloadComponent);



/*Aqui obtenemos el listado de los leads Registrados*/
  const getData = e => {
    /*Llammamos a la funcion ServiceRest para obtener el listado*/
    var listado = ServiceRest('agent_portal/Lead/listarLead');
    /************************************************************/
      listado.then((value) => {
        if (!value.error) {
          setData(value.datos.map((data) =>
                      <tr>
                        <td>
                          1
                        </td>
                        <td>
                          stage
                        </td>
                        <td>
                          {data.type_lead}
                        </td>
                        <td>
                          <NavLink className="nav-link" to={`Calendar/Lead:${data.id_lead}`}><div>{data.first_name}</div></NavLink>
                        </td>
                        <td>
                          {data.phone}
                        </td>
                        <td>
                          call goal
                        </td>
                        <td>
                          task
                        </td>
                        <td>
                          calls
                        </td>
                        <td>
                          emails
                        </td>
                        <td>
                          texts
                        </td>
                        <td>
                          alerts
                        </td>
                        <td>
                          A
                        </td>
                        <td>
                          Last Visit
                        </td>
                        <td>
                          eye
                        </td>
                        <td>
                          home
                        </td>
                        <td>
                          heart
                        </td>
                        <td>
                          Price
                        </td>
                        <td>
                          registered
                        </td>
                        <td>
                          agent activity
                        </td>
                        <td>
                          lead activity
                        </td>
                        <td>
                          close date
                        </td>
                        <td>
                          Birthday
                        </td>
                        <td>
                          Address
                        </td>
                        <td>
                          tags
                        </td>
                      </tr>
                  ));
        } else {
          const msg = value.detail.message;
          alert(msg);
        }
      });
    };
/********************************************/

/*El use effect es el que se encarga de que es lo primero que renderizara al
cargar la pagina por lo tanto llamamos a la funcion del listado*/

/************************************************************/
   useEffect(() => {
       getData();
    }, [reloadComponent]);
/*************************************************************************/


  return (

    <div id="layoutSidenav_content">
        <main>
            <div className="container-fluid" id="TablaLead">
                <table className="table table-bordered">
                  <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Stage</th>
                    <th scope="col">Type</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">CallGoal</th>
                    <th scope="col">Tasks</th>
                    <th scope="col">Calls</th>
                    <th scope="col">Emails</th>
                    <th scope="col">Texts</th>
                    <th scope="col">E-Alerts</th>
                    <th scope="col">A</th>
                    <th scope="col">Last Visit</th>
                    <th scope="col"><i className="fa fa-eye" aria-hidden="true"></i></th>
                    <th scope="col"><i className="fa fa-home" aria-hidden="true"></i></th>
                    <th scope="col"><i className="fa fa-heart" aria-hidden="true"></i></th>
                    <th scope="col">Price</th>
                    <th scope="col">Registered</th>
                    <th scope="col">Agent Activity</th>
                    <th scope="col">Lead Activity</th>
                    <th scope="col">Close Date</th>
                    <th scope="col">Birthday</th>
                    <th scope="col">Address</th>
                    <th scope="col">Tags</th>
                  </tr>
                  </thead>
                <tbody>
                  {data}
                </tbody>
                </table>

            </div>
        </main>
        <Footer/>
    </div>

  );
}
export default ContenidoLeadCommandCenter;
