import React, {useContext,useEffect,useState} from 'react';
import '../../components/styles/formLogin.css';
import '../../components/styles/stylesMenu.css';
import '../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css';
import Footer from '../../components/Footer';
import {UserContext} from "../../contexts/UserContext";
import {CambiarEstados} from "../../contexts/CambiarEstados";
import {Redirect} from "react-router-dom";
import MenuSuperior from '../../components/MenuSuperior';
import MenuLateral from '../../components/MenuLateral';
import Card from '../../components/Card';
import './styles/LeadCommandCenterStyle.css';

//import './style.css';
import AvatarEjemplo from '../../image/AvatarEjemplo.png';
import {ServiceRest} from "../../services/ServiceRest";
import MenuPrincipal from '../../components/MenuPrincipal';

const CommandInfo = (props) => {
  const {userContext} = useContext(UserContext);
  const {cambiarEstados} = useContext(CambiarEstados);

  /*Aqui recuperamos el id del lead que seleccionamos en la tabla principal*/
  const id_lead = props.match.params.id_lead;
  /**************************************************************************/

  /*Utilizaremos los hooks de estado para cambiar el valor*/
  const [nombre_lead, setNombreLead] = useState();
  const [telefono, setTelefono] = useState();
  const [correo, setCorreo] = useState();
  const [type_lead, setTypeLead] = useState();
  /********************************************************/


  /*Llamamos a la funcion para recuperar la informacion del Lead*/
  const getDataLead = e => {
    var params = { start: 0, limit: 50, id_lead:id_lead};
    var listado = ServiceRest('agent_portal/Lead/listarLead',params);
    listado.then((value) => {                
                /*Enviamos el Valor a las variables para mostrar en el componente Card*/
                setNombreLead(value.datos[0].first_name+' '+value.datos[0].last_name);
                setTelefono(value.datos[0].phone);
                setCorreo(value.datos[0].email);
                setTypeLead(value.datos[0].type_lead);
                /**********************************************************************/
    });
  }
  /**************************************************************/

  useEffect(() => {
      if (id_lead != null || id_lead != '') {
        getDataLead();
      }

   }, []);

  return (
    <div >
    {userContext === null && <Redirect to="/" />}
      <MenuPrincipal Titulo="Lead Info" Componente={<Card foto={AvatarEjemplo}
                    nombre={nombre_lead}
                    telefono={telefono}
                    correo={correo}
                    type_lead={type_lead}
                    id_lead = {id_lead}
              />}/>
    </div>
  );
}
export default CommandInfo;
