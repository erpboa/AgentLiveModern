import React, {useEffect, useState, useContext} from 'react';
import '../../components/styles/formLogin.css';
import '../../components/styles/stylesMenu.css';
import './styles/LeadCommandCenterStyle.css';
import '../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css';
import Footer from '../../components/Footer';
import Paginacion from '../../components/Paginacion';
import PxpClient from 'pxp-client';
import {ServiceRest} from "../../services/ServiceRest";
import {ReloadComponent} from "../../contexts/ReloadComponent";
import {NavLink} from 'react-router-dom';
import TablaLead from './TablaLead';

const ContenidoLeadCommandCenter = (props) => {


/***************Creamos el hook de estado para almacenar el resultado************/
const [data, setData] = useState();
const [carga, setCarga] = useState(false);
/*******************************************************************************/
/*Recuperamos el componente para hacer el reload de la tabla*/
const {reloadComponent,setReloadComponent} = useContext(ReloadComponent);
/************************************************************/

/*Crearemos la paginacion para los datos*/
const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(6);
const [posts, setPosts] = useState([]);


const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

const paginate = pageNumber => setCurrentPage(pageNumber);
/*******************************************************************/



/*Aqui obtenemos el listado de los leads Registrados*/
  // const getData = e => {
  //   /*Llammamos a la funcion ServiceRest para obtener el listado*/
  //   var listado = ServiceRest('agent_portal/Lead/listarLead');
  //   /************************************************************/
  //     listado.then((value) => {
  //       if (!value.error) {
  //         //setData(value.datos.slice(indexOfFirstPost, indexOfLastPost));
  //         console.log("aqui el dat ssso es",value.datos.slice(indexOfFirstPost, indexOfLastPost));
  //         console.log("aqui el dat ssso es",data);
  //         // setData(value.datos.map((data) =>
  //         //             <Tr key = {data.id_lead}>
  //         //               <Td>
  //         //                 1
  //         //               </Td>
  //         //               <Td>
  //         //                 stage
  //         //               </Td>
  //         //               <Td>
  //         //                 {data.type_lead}
  //         //               </Td>
  //         //               <Td>
  //         //                 <NavLink className="nav-link" to={`CommandInfo/Lead${data.id_lead}`}><div>{data.first_name}</div></NavLink>
  //         //               </Td>
  //         //               <Td>
  //         //                 {data.phone}
  //         //               </Td>
  //         //               <Td>
  //         //                 call goal
  //         //               </Td>
  //         //               <Td>
  //         //                 task
  //         //               </Td>
  //         //               <Td>
  //         //                 calls
  //         //               </Td>
  //         //               <Td>
  //         //                 emails
  //         //               </Td>
  //         //               <Td>
  //         //                 texts
  //         //               </Td>
  //         //               <Td>
  //         //                 1 sent
  //         //               </Td>
  //         //               <Td>
  //         //                 A
  //         //               </Td>
  //         //               <Td>
  //         //                 Last Visit
  //         //               </Td>
  //         //               <Td>
  //         //                 eye
  //         //               </Td>
  //         //               <Td>
  //         //                 home
  //         //               </Td>
  //         //               <Td>
  //         //                 heart
  //         //               </Td>
  //         //               <Td>
  //         //                 Price
  //         //               </Td>
  //         //               <Td>
  //         //                 registered
  //         //               </Td>
  //         //               <Td>
  //         //                 agent activity
  //         //               </Td>
  //         //               <Td>
  //         //                 lead activity
  //         //               </Td>
  //         //               <Td>
  //         //                 close date
  //         //               </Td>
  //         //               <Td>
  //         //                 Birthday
  //         //               </Td>
  //         //               <Td>
  //         //                 Address
  //         //               </Td>
  //         //               <Td>
  //         //                 tags
  //         //               </Td>
  //         //             </Tr>
  //         //         ));
  //
  //       } else {
  //         const msg = value.detail.message;
  //         alert(msg);
  //       }
  //     });
  //   };
/********************************************/

/*El use effect es el que se encarga de que es lo primero que renderizara al
cargar la pagina por lo tanto llamamos a la funcion del listado*/

/************************************************************/
   useEffect(() => {
     const getData = async () => {
        setLoading(true);
        const res = ServiceRest('agent_portal/Lead/listarLead');
        res.then((value) => {
          setPosts(value.datos);
          setLoading(false);
        });
      };
      getData();
    }, [reloadComponent]);
/*************************************************************************/

return (

    <div id="layoutSidenav_content">
        <main id="contenedorPrincipal">
            <div className="container-fluid" id="contenedorDetalle">
            <TablaLead posts={currentPosts} loading={loading}/>
              <div id="paginacion">
                  <Paginacion
                      postsPerPage={postsPerPage}
                      totalPosts={posts.length}
                      paginate={paginate}
                    />                    
              </div>
            </div>
        </main>
        <Footer/>
    </div>

  );
}
export default ContenidoLeadCommandCenter;
