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
const [postsPerPage,setPostsPerpage] = useState(20);
const [posts, setPosts] = useState([]);
const [cantDatos, setCantDatos] = useState();

const [siguienteData, setSiguienteData] = useState(0);
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = posts;

const paginate = pageNumber => {
  setCurrentPage(pageNumber);
  setSiguienteData((pageNumber - 1) * (postsPerPage));
}


const cambiarLimit = value => {
  setPostsPerpage(value);
}

/*******************************************************************/

/*El use effect es el que se encarga de que es lo primero que renderizara al
cargar la pagina por lo tanto llamamos a la funcion del listado*/

/************************************************************/
   useEffect(() => {
       const getData = () => {
        setLoading(true);
        let params = {start:siguienteData,limit:postsPerPage}; 
        const res = ServiceRest('agent_portal/Lead/listarLeadCommandCenter',params);        
        res.then((value) => {     
          if (!res.error) {             
          setPosts(value.datos);
          setLoading(false);
          setCantDatos(value.total)
          } else {
            setPosts();
          }
        });
      };
      getData();
    }, [reloadComponent,siguienteData,postsPerPage]);

/*************************************************************************/

return (

    <div>

      {posts && (<TablaLead posts={currentPosts} loading={loading} paginacion={<Paginacion
                      postsPerPage={postsPerPage}
                      totalPosts={cantDatos}
                      paginate={paginate}     
                      cambiarLimit={cambiarLimit}                
                    />}/>)}
             



    </div>

  );
}
export default ContenidoLeadCommandCenter;
