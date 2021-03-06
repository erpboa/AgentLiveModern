/****************************************************************************************
 *@file FormEAlertsRegistro.js
 *@author  (Maylee Perez Pastor)
 *@date 12-08-2020
 *@description Componente Add FormEAlertsRegistro
 *****************************************************************************************/


import React, {useState, useEffect, useContext} from "react";
import {ServiceRest} from "../../services/ServiceRest";
import {ReloadComponent} from "../../contexts/ReloadComponent";
import {Coordinates} from "../../contexts/Coordinates";
import './styles/FormEAlertsStyle.css';
import {NavLink} from "react-router-dom";

import {data_elaert} from './ealert.json';


import FormEAlerts from "./FormEAlerts";

import MapGoogle from '../../components/MapGoogle';
import {onPreviewSearchLM } from './searchFlterLivemoDern.js';
import $ from "jquery";
import { Loader } from 'semantic-ui-react';

const property_type=[],community_features=[],property_features=[],waterfront=[],view=[],exterior_features=[],interior_features=[],style=[],financing=[], listing_status=["Active", "Coming soon"];
let resp_estruc

const FormEAlertsRegistro = (props) => {   
    
    let origin = props.addItemToCart
    const {reloadComponent, setReloadComponent} = useContext(ReloadComponent);
    const [dataLiMo, setDataLiMo] = useState(null);
    const [hasError, setErrors] = useState(false);
    const [dataTeam, setDataTeam] = useState();
    const [dataProperty, setProperty] = useState();
    const [seeMap, setSeeMap] = useState(true);
    const [dataEalertInsert, setEalertInsert] = useState(	{'id_lead': "",
    'exterior_features': "",
    'state': "",
    'stories_total_to': "",
    'neighborhood': "",
    'garages_total_from': "",
    'listing_status': JSON.stringify({data: listing_status}),
    'interior_features': "",
    'alert_frequency': "",
    'property_type': "",
    'style': "",
    'subject': "",
    'email_addresses': "",
    'view': "",
    'square_footage_to': "",
    'waterfront': "",
    'type_content': "",
    'square_footage_from': "",
    'year_build_from': "",
    'school': "",
    'garages_total_to': "",
    'acreage_from': "",
    'bedrooms_from': "",
    'days_listed': "",
    'keywords': "",
    'financing': "",
    'zip': "",
    'property_features': "",
    'city': "",
    'price_to': "",
    'estado_reg': "",
    'location': "",
    'community_features': "",
    'popular_locations': "",
    'acreage_to': "",
    'year_build_to': "",
    'stories_total_from': "",
    'draw_on_map': "",
    'country': "",
    'price_from': "",
    'bedrooms_to': "",
    'bathrooms_from': "",
    'bathrooms_to': "",
    'specify_city': "",
    'county': "",
    'url_preview': ""    
    });
    const [filterE, setFilter] = useState({
    'ffd_listingprice_pb_from': "",
    'ffd_listingprice_pb_to': "",
    'ffd_propertytype': "",
    'ffd_listing_status': JSON.stringify({data: listing_status}),
    'ffd_yearbuilt_pb_from': "",
    'ffd_yearbuilt_pb_to': "",
    'ffd_bedrooms_pb_from': "",
    'ffd_bedrooms_pb_to': "",
    'ffd_fullbathrooms_pb_from': "",
    'ffd_fullbathrooms_pb_to': "",
    'ffd_acres_calc_from': "",
    'ffd_acres_calc_to': "",
    'ffd_garages_from': "",
    'ffd_garages_to': "",
    'ffd_days_on_market': "",
    'ffd_community_features': "",
    'ffd_stories_from': "",
    'ffd_stories_to': "",
    'ffd_waterfront': "",
    'ffd_view': "",
    'ffd_exterior_features': "",
    'ffd_interior_features': "",
    'postal_code' : "",
    'street_number':"",
    'locality' : "",
    'state' : "",
    'ffd_zip': "",
    'ffd_specify_city': "",
    'ffd_neighborhood': "",
    'ffd_popular_locations': "",
    'ffd_county': "",
    'ffd_school': ""    
    });
    const [count, setCount] = useState();
    const {coordinates} = useContext(Coordinates);

    const [load, setLoad] = useState(true);

    const id_lead = props.id_lead;
    const v_setCart = props.setCart;

    
    /*******************************************************************/
    //listar email lead
    const [email, setemail] = useState();
    
    const getDataEmail = e => {
        var params = { start: 0, limit: 50, id_lead:id_lead};
        var listado = ServiceRest('agent_portal/Lead/listarLead',params);

        listado.then((value) => {
            /*Enviamos el Valor a las variables para mostrar en el componente*/
            
            if (value.datos.length > 0 ){
                setemail(value.datos[0].email);
                dataEalertInsert.email_addresses = value.datos[0].email
                dataEalertInsert.subject = 'Newest Listings Matching Your Home Search'
            }

        });
    }

    /*******************************************************************/

    /*******************************************************************/
    //listar Alert
    const [dataEAlertPriceFrom, setEAlertPriceFrom] = useState();
    const [dataEAlertPriceTo, setEAlertPriceTo] = useState();
    
    const ListDataEAlert = e => {
        
        var params = { start: 0, limit: 50, id_lead:id_lead};
        var listado = ServiceRest('agent_portal/Alerts/listarAlerts',params);

        listado.then((value) => {
            /*Enviamos el Valor a las variables para mostrar en el componente*/            

            if (value.datos.length > 0 ){
                setEAlertPriceFrom(value.datos[0].price_from);
                setEAlertPriceTo(value.datos[0].price_to);
            }

        });
    }

    /*******************************************************************/


    // List data table
    const getData = () => {
        ServiceRest("agent_portal/Team/listarTeam")
            .then((res) => setDataTeam(res.datos))
            .catch((err) => setErrors(err));
    };

    const getApiAlertProperty = () => {
        setEalertInsert({...dataEalertInsert,'listing_status': filterE.ffd_listing_status});
        ServiceRest("agent_portal/Alerts/apiAlertsPropertyCount", filterE)
        .then((res) => {      
            setLoad(false);                             
            setCount(res.data.live_modern)
        })
        .catch(e => {            
            console.log('An issue occurred Contact the IT department')
        })
    }

    const getDataLiveModernToFilters = async () => {
        ServiceRest("agent_portal/Alerts/combosFilterEalert")
        .then((res) => {                                   
            setDataLiMo(JSON.parse(res.data.live_modern));                      
        })
        .catch(e => {            
            console.log('An issue occurred Contact the IT department')
        })
    }

    useEffect(() => {
        getData();
        getDataEmail();
        llamarComboProperty();
        llamarComboListingStatus();
        llamarComboCommunityFeatures();
        llamarComboPropertyFeatures();
        llamarComboWaterfront();
        llamarComboView();
        llamarComboExteriorFeatures();
        llamarComboInteriorFeatures();
        llamarComboStyle();
        llamarComboFinancing();
        getApiAlertProperty();
        getDataLiveModernToFilters();
    }, [reloadComponent]);

    /******************Lista del Combo Tipo property**********************/
    /*Aqui Creamos el Hook para el Estado Inicial para el Combo*/
    const [listaComboProperty, setListaComboProperty] = useState();

    /*Funcion para llamar al Servicio del ERP y Listar el Combo*/
    const llamarComboProperty = e => {        
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_property_type'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/

        listado.then((value) => {
            setListaComboProperty(value.datos)            
        });
        document.getElementById("Formulario_EAlert").reset();
    }

    const [listaComboListingStatus, setListaComboListingStatus] = useState();
    const llamarComboListingStatus = e => {
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_listing_status'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/
        listado.then((value) => {
            setListaComboListingStatus(value.datos)
        });
        document.getElementById("Formulario_EAlert").reset();
    }

    const [listaComboDaysListed, setListaComboDaysListed] = useState();
    const llamarComboDaysListed = e => {
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_days_listed'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/
        listado.then((value) => {
            setListaComboDaysListed(value.datos.map((comboLead) =>
                <option key={comboLead.descripcion} value = {comboLead.descripcion}>
                    {comboLead.descripcion}
                </option>
            ));
        });
        document.getElementById("Formulario_EAlert").reset();
    }

    const [listaComboCommunityFeatures, setListaComboCommunityFeatures] = useState();
    const llamarComboCommunityFeatures = e => {
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_community_features'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/
        listado.then((value) => {
            setListaComboCommunityFeatures(value.datos)
        });
        document.getElementById("Formulario_EAlert").reset();
    }

    const [listaComboPropertyFeature, setListaComboPropertyFeature] = useState();
    const llamarComboPropertyFeatures = e => {
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_property_features'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/
        listado.then((value) => {
            setListaComboPropertyFeature(value.datos)
        });
        document.getElementById("Formulario_EAlert").reset();
    }

    const [listaComboWaterfront, setListaComboWaterfront] = useState();
    const llamarComboWaterfront = e => {
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_waterfront'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/
        listado.then((value) => {
            setListaComboWaterfront(value.datos)
        });
        document.getElementById("Formulario_EAlert").reset();
    }

    const [listaComboView, setListaComboView] = useState();
    const llamarComboView = e => {
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_view'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/
        listado.then((value) => {
            setListaComboView(value.datos)
        });
        document.getElementById("Formulario_EAlert").reset();
    }
    const [listaComboExteriorFeatures, setListaComboExteriorFeatures] = useState();
    const llamarComboExteriorFeatures = e => {
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_exterior_features'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/
        listado.then((value) => {
            setListaComboExteriorFeatures(value.datos)
        });
        document.getElementById("Formulario_EAlert").reset();
    }
    const [listaComboInteriorFeaturess, setListaComboInteriorFeatures] = useState();
    const llamarComboInteriorFeatures = e => {
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_interior_Features'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/
        listado.then((value) => {
            setListaComboInteriorFeatures(value.datos)
        });
        document.getElementById("Formulario_EAlert").reset();
    }
    const [listaComboStyle, setListaComboStyle] = useState();
    const llamarComboStyle = e => {
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_style'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/
        listado.then((value) => {
            setListaComboStyle(value.datos)
        });
        document.getElementById("Formulario_EAlert").reset();
    }
    const [listaComboFinancing, setListaComboFinancing] = useState();
    const llamarComboFinancing = e => {
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_financing'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/
        listado.then((value) => {
            setListaComboFinancing(value.datos)
        });
        document.getElementById("Formulario_EAlert").reset();
    }
    const [listaComboEAlertFrequency, setListaComboEAlertFrequency] = useState();
    const llamarComboEAlertFrequency = e => {
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_frequency'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/
        listado.then((value) => {
            setListaComboEAlertFrequency(value.datos.map((comboLead) =>
                <option key={comboLead.descripcion} value = {comboLead.descripcion}>
                    {comboLead.descripcion}
                </option>
            ));
        });
        document.getElementById("Formulario_EAlert").reset();
    }

    const [listaCombo, setListaCombo] = useState();
    /*******************************************************************/
    const [listaComboTemplate, setListaTemplate] = useState();
    const llamarTemplate = e => {
        var params = { start: 0, limit: 50, id_lead:id_lead};
        var listado = ServiceRest('agent_portal/AlertsTemplate/listarAlertsTemplate',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/
        listado.then((value) => {
            setListaTemplate(value.datos.map((comboLead) =>

                <option key={comboLead.name_template} value = {comboLead.name_template}>
                    {comboLead.name_template}
                </option>

            ));
        });
        document.getElementById("Formulario_EAlert").reset();
    }
    /*******************************************************************/
    /***************Insertar un nuevo Note********************/
    /*Creamos la variable que almacenara los Campos del Lead*/
    const [dataEALertInsert, setEAlertInsert] = useState();
    


    /********Llamamos a la funcion para recuperar los datos de cada Campo cuando se cambie del input*****/
    const enviarDatos = (e) => {
        
        setEAlertInsert(e.target.value);
    };
    /****************************************************************************************************/

    /*******Aqui llamamos al boton de Agregar un nuevo Lead y mandar los datos al ERP*******/
    const insertEAlerts = (e) => {
        var params = { start: 0, limit: 50, id_lead:id_lead, descripcion:dataEALertInsert};
        var insertar = ServiceRest('agent_portal/Note/insertarNote',params);        
        insertar.then((resp) => {            
            if (resp.error) {
                const msg = `Reporte el codigo: ${resp.data.id_log} para revision. Detalle: ${resp.detail.message}`;
                alert(msg);
            }
        })


    };
    /*******************************************************************/

    /*******************************************************************/

    const estructureDataInsert = (data, typeArray) => {          
        switch (typeArray) {
            case 'listing_status': 
                const indice_0 = listing_status.indexOf(`${data}`);                 
                indice_0 === -1 ? listing_status.push(data):listing_status.splice(indice_0, 1);
                resp_estruc = {data: listing_status}
                break;
            case 'property_type':
                const indice_1 = property_type.indexOf(`${data}`);                 
                indice_1 === -1 ? property_type.push(data):property_type.splice(indice_1, 1);
                resp_estruc = {data: property_type}
                break;
            case 'community_features':
                const indice_2 = community_features.indexOf(`${data}`);                 
                indice_2 === -1 ? community_features.push(data):community_features.splice(indice_2, 1);
                resp_estruc = {data: community_features}
                break;
            case 'property_features':
                const indice_3 = property_features.indexOf(`${data}`);                 
                indice_3 === -1 ? property_features.push(data):property_features.splice(indice_3, 1);
                resp_estruc = {data: property_features}
                break;
            case 'waterfront':
                const indice_4 = waterfront.indexOf(`${data}`);                 
                indice_4 === -1 ? waterfront.push(data):waterfront.splice(indice_4, 1);
                resp_estruc = {data: waterfront}
                break;
            case 'exterior_features':
                const indice_5 = exterior_features.indexOf(`${data}`);                 
                indice_5 === -1 ? exterior_features.push(data):exterior_features.splice(indice_5, 1);
                resp_estruc = {data: exterior_features}
                break;
            case 'interior_features':
                const indice_6 = interior_features.indexOf(`${data}`);                 
                indice_6 === -1 ? interior_features.push(data):interior_features.splice(indice_6, 1);
                resp_estruc = {data: interior_features}
                break;
            case 'style':
                const indice_7 = style.indexOf(`${data}`);                 
                indice_7 === -1 ? style.push(data):style.splice(indice_7, 1);
                resp_estruc = {data: style}
                break;
            case 'financing':
                const indice_8 = financing.indexOf(`${data}`);                 
                indice_8 === -1 ? financing.push(data):financing.splice(indice_8, 1);
                resp_estruc = {data: financing}
                break;
            case 'view':
                const indice_9 = view.indexOf(`${data}`);
                indice_9 === -1 ? view.push(data):view.splice(indice_9, 1);
                resp_estruc = {data: view}
                break;
        }
        return JSON.stringify(resp_estruc)
    }
    const onHandleInput = (e) => {
            setLoad(true);
            let selecValuefil = null               
            const  myarr  =  ["listing_status", "property_type" , "community_features" , "property_features" , "waterfront" , "view" ,  "exterior_features" , "interior_features" , "style" , "financing" ];
            const find_data = myarr.find(v => v === e.target.name) 
                  
                if(find_data!==undefined){                
                    selecValuefil = estructureDataInsert(e.target.value, find_data)                           
                }else{                    
                    selecValuefil = e.target.value                    
                }            
                
            setEalertInsert({...dataEalertInsert,[e.target.name]: selecValuefil})
                    
        switch (e.target.name) {
            case 'price_from':                
                filterE.ffd_listingprice_pb_from= selecValuefil 
                break;
            case 'price_to':
                filterE.ffd_listingprice_pb_to= selecValuefil 
                break;
            case 'property_type':
                filterE.ffd_propertytype= selecValuefil 
                break;
            case 'listing_status': 
                filterE.ffd_listing_status= selecValuefil 
                    break;
            case 'year_build_from':
                filterE.ffd_yearbuilt_pb_from= selecValuefil 
                break;
            case 'year_build_to':
                filterE.ffd_yearbuilt_pb_to= selecValuefil 
                break;
            case 'bedrooms_from':
                filterE.ffd_bedrooms_pb_from= selecValuefil 
                break;
            case 'bedrooms_to':                
                filterE.ffd_bedrooms_pb_to= selecValuefil 
                break;
            case 'bathrooms_from':
                filterE.ffd_fullbathrooms_pb_from= selecValuefil 
                break;
            case 'bathrooms_to':
                filterE.ffd_fullbathrooms_pb_to= selecValuefil 
                break;
            case 'acreage_from':
                filterE.ffd_acres_calc_from= selecValuefil 
                break;
            case 'acreage_to':
                filterE.ffd_acres_calc_to= selecValuefil 
                break;
            case 'garages_total_from':
                filterE.ffd_garages_from= selecValuefil 
                break;
            case 'garages_total_to':
                filterE.ffd_garages_to= selecValuefil 
                break;
            case 'days_listed':
                filterE.ffd_days_on_market= selecValuefil 
                break;
            case 'community_features':
                filterE.ffd_community_features= selecValuefil 
                break;
            case 'stories_total_from':
                filterE.ffd_stories_from= selecValuefil 
                break;
            case 'stories_total_to':
                filterE.ffd_stories_to= selecValuefil 
                break;
            /*case 'property_features':
                filterE.ffd_community_features= selecValuefil 
                break;*/
            case 'waterfront':
                filterE.ffd_waterfront= selecValuefil 
                break;
            case 'view':
                filterE.ffd_view= selecValuefil 
                break;
            case 'exterior_features':
                filterE.ffd_exterior_features= selecValuefil 
                break;
            case 'interior_features':
                filterE.ffd_interior_features= selecValuefil 
                break;
            case 'zip':
                filterE.ffd_zip = selecValuefil
                filterE.ffd_specify_city = ""
                filterE.ffd_neighborhood = ""
                filterE.ffd_popular_locations = ""
                filterE.ffd_county = ""
                filterE.ffd_school = ""
                break;
            case 'specify_city':
                filterE.ffd_specify_city = selecValuefil
                filterE.ffd_zip = ""
                filterE.ffd_neighborhood = ""
                filterE.ffd_popular_locations = ""
                filterE.ffd_county = ""
                filterE.ffd_school = ""
                break;
            case 'neighborhood':
                filterE.ffd_neighborhood = selecValuefil
                filterE.ffd_specify_city = ""
                filterE.ffd_zip = ""
                filterE.ffd_popular_locations = ""
                filterE.ffd_county = ""
                filterE.ffd_school = ""
                break;
            case 'popular_locations':
                filterE.ffd_popular_locations = selecValuefil
                filterE.ffd_specify_city = ""
                filterE.ffd_zip = ""                
                filterE.ffd_neighborhood = ""                
                filterE.ffd_county = ""
                filterE.ffd_school = ""                
                break;
            case 'county':
                filterE.ffd_county = selecValuefil
                filterE.ffd_specify_city = ""
                filterE.ffd_zip = ""
                filterE.ffd_popular_locations = ""
                filterE.ffd_neighborhood = ""
                filterE.ffd_school = ""
            case 'school':
                filterE.ffd_school = selecValuefil
                filterE.ffd_specify_city = ""
                filterE.ffd_zip = ""
                filterE.ffd_popular_locations = ""
                filterE.ffd_county = ""
                filterE.ffd_neighborhood = ""
                break;                
        }
                   
        ServiceRest("agent_portal/Alerts/apiAlertsPropertyCount", filterE)
        .then((res) => {
            setLoad(false);
            setCount(res.data.live_modern)
        })
        .catch(e => {            
            console.log('An issue occurred Contact the IT department')
        })                            
    }

    const onFilterMap = (e) => {
        setLoad(true);console.log('filterE onFilterMap', filterE);        
        filterE.postal_code = e.postal_code;
        filterE.locality = e.locality;
        filterE.state = e.state;
        filterE.street_number = e.street_number;
        setEalertInsert({...dataEalertInsert,'filterMap': e})
        ServiceRest("agent_portal/Alerts/apiAlertsPropertyCount", filterE)
        .then((res) => {
            setLoad(false);
            setCount(res.data.live_modern);
        })
        .catch(e => {            
            console.log('An issue occurred Contact the IT department')
        })
    }

    const onPreview = () => {
        console.log('filterE onPreview', filterE, 'dataEalertInsert', dataEalertInsert);
        onPreviewSearchLM(coordinates, dataEalertInsert, 'preview')
    }

    const onFormatEmail = e => {
        e.preventDefault() 
        if(e.target.name == 'email_addresses'){
            dataEalertInsert.email_addresses = e.target.value
        }else{
            dataEalertInsert.subject = e.target.value
        }               
    }
    const onInsertEalert = (e) => {
        e.preventDefault()                         
        dataEalertInsert.id_lead= id_lead    
        dataEalertInsert.draw_on_map = JSON.stringify(coordinates)         
        dataEalertInsert.email_addresses = dataEalertInsert.email_addresses === ''?email:dataEalertInsert.email_addresses
        dataEalertInsert.subject = dataEalertInsert.subject === ''?'Newest Listings Matching Your Home Search':dataEalertInsert.subject
        dataEalertInsert.url_preview = onPreviewSearchLM(coordinates, dataEalertInsert, 'save')        
        const insertar = ServiceRest('agent_portal/Alerts/insertarAlerts', dataEalertInsert);
        insertar.then((resp) => {            
            console.log(resp);
            origin(e, false)
        })
    }

    /***********************para cerrar el modal************************/

    /*const onCanceModal = () => {
        //chooseSavetemplate.modal('hide');
        this.setState({modal: hide})
    }*/
    /**************************.*****************************************/


    /***************Insertar un nuevo Template********************/
    /*Creamos la variable que almacenara los Campos del Lead*/
    const [dataTemplateInsert, setTemplateInsert] = useState();
    


    /********Llamamos a la funcion para recuperar los datos de cada Campo cuando se cambie del input*****/
    const enviarDatosTemplate = (e) => {        
        setTemplateInsert(e.target.value);
    };
    /****************************************************************************************************/

    /*******Aqui llamamos al boton de Agregar un nuevo Lead y mandar los datos al ERP*******/
    const insertTemplates = async (e) => {
        var params = { start: 0, limit: 50, id_lead:id_lead, name_template:dataTemplateInsert};
        var insertar = ServiceRest('agent_portal/AlertsTemplate/insertarAlertsTemplate',params);
        
        insertar.then((resp) => {
            
            if (!resp.error) {
                window.$('#chooseSavetemplate').modal('hide');
            }else{
                const msg = `Reporte el codigo: ${resp.data.id_log} para revision. Detalle: ${resp.detail.message}`;
                alert(msg);
            }
        })




    };
    /*******************************************************************/

    /*******************************************************************/
    const handleDelete = e => {
        
    };
    /*******************************************************************/

    //const [btnCancel, setCancel] = useState(false);


    function buttonCancel(e) {


    }
    const onlyOneChek = (e) => {   
        setLoad(true);
        const arrDisabled = ["zip", "specify_city", "neighborhood", "popular_locations", "county", "school"]
        if(e.target.name==='specify_city'){            
            document.getElementById('state_city').disabled = false            
        }else{
            document.getElementById('state_city').disabled = true
        }
        arrDisabled.map(val => {            
            if(val === e.target.name){                
                document.getElementById(`${val}`).disabled = false            
            }else{
                document.getElementById(`${val}`).disabled = true
            }
        })        
        if(e.target.name==="map") {
            setSeeMap(true)
            filterE.ffd_zip = ""                    
            filterE.ffd_specify_city = ""
            filterE.ffd_neighborhood = ""
            filterE.ffd_popular_locations = ""
            filterE.ffd_county = ""
            filterE.ffd_school = ""
        }else{
            setSeeMap(false)
            filterE.postal_code = "";
            filterE.locality = "";
            filterE.state = "";                
            filterE.street_number = "";                
        }        
        window.$('.slectOne').change(function(){
            if(this.checked){                 
                window.$('.slectOne').not(this).prop('checked', false)                
            }    
        });
        ServiceRest("agent_portal/Alerts/apiAlertsPropertyCount", filterE)
        .then((res) => {
            setLoad(false);
            setCount(res.data.live_modern)
        })
        .catch(e => {            
            console.log('An issue occurred Contact the IT department')
        })
    }
    const onFilterMapClear = () => {
        setLoad(true)
        filterE.postal_code	= ""
        filterE.locality = ""
        filterE.state = ""
        filterE.street_number = ""
        ServiceRest("agent_portal/Alerts/apiAlertsPropertyCount", filterE)
        .then((res) => {
            setLoad(false);
            setCount(res.data.live_modern)
        })
        .catch(e => {            
            console.log('An issue occurred Contact the IT department')
        })
    }
    /*******************************************************************/



    return (
        <div>


            <div className="container-fluid">


                <form id='Formulario_EAlert'>

             

                    {/*<h6 id='style_subtitulos'>Location </h6>                                                */}
                    <div className="form-group row">

                        <button type="button" className="btn btn-secondary" id="btn_alert_cancel" onClick={buttonCancel}>Cancel</button>


                            {/*<a>Load Templates</a>*/}
                            <form onClick={llamarTemplate}>

                                <select id="btn_alert_template" className="form-control" onChange={ListDataEAlert}>
                                    <option hidden defaultValue>Select an EAlert Template</option>
                                    {listaComboTemplate}
                                </select>

                            </form>


                        <button type="button" className="btn btn-success" id="btn_alert_preview" onClick={onPreview}>Preview</button>
                        <button className="btn btn-primary" type="submit" id="btn_alert_save" onClick={onInsertEalert}>Save</button>


                    </div>
                    <h6 className='style_subtitulos'>Location <label className="count_alert">{load?<Loader size='mini' active inline />:<span>{count} properties found</span>}</label> </h6>
                    <div className="form-group row">
                    <div style={{width:'100%'}}>
                        <input type="radio"  name="map" className="slectOne" defaultChecked onChange={onlyOneChek}/>


                        <label className="my-1 mr-2"> Draw On Map</label>
                        <div>
                            {seeMap && <MapGoogle onFilterMap={onFilterMap} onFilterMapClear={onFilterMapClear} />}
                        </div>
                        <br />
                        <br />
                    </div>
                        <form className="form-inline">
                        <input type="radio"  name="specify_city" className="slectOne" onChange={onlyOneChek}/>
                            <div id="style-position-left">                            
                                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref" id="label_left"> City</label>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="specify_city" onChange={onHandleInput}
                                    id="specify_city" disabled>
                                        <option hidden defaultValue>Enter any city</option>
                                        { dataLiMo &&  dataLiMo.talerts_city.map((e,i) => (
                                            <option key={i} value={e}> {e}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="state_city" id="state_city"  
                                    onChange={onHandleInput} disabled>
                                        <option hidden defaultValue>Specify any state</option>
                                        { dataLiMo &&  dataLiMo.talerts_stateorprovince.map((e,i) => (
                                            <option key={i} value={e}> {e}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="form-group row">
                        <input type="radio"  name="zip" className="slectOne" onChange={onlyOneChek}/>
                        <div id="style-position-left">
                            <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref" id="label_left"> Zip</label>
                        </div>
                        <div id="style-position-right" >
                            <select  className="form-control" name="zip" id="zip"  
                                onChange={onHandleInput} disabled
                            >
                                <option hidden defaultValue>Enter any zip</option>
                                { dataLiMo &&  dataLiMo.talerts_postalcode.map((e,i) => (
                                            <option key={i} value={e}> {e}</option>
                                        ))}
                            </select>
                        </div>

                    </div>

                    <div className="form-group row">
                        <form className="form-inline">
                            <input type="radio"  name="neighborhood" className="slectOne" onChange={onlyOneChek}/>
                            <div id="style-position-left">
                                <label className="my-1 mr-2"
                                       htmlFor="inlineFormCustomSelectPref" id="label_left"> Neighborhood</label>
                            </div>
                            <div id="style-position-right">
                                <select  id="neighborhood" className="form-control" name="neighborhood" 
                                   id="neighborhood"
                                   onChange={onHandleInput} disabled
                                >
                                    <option hidden defaultValue>Enter any neighborhood</option>
                                    { dataLiMo &&  dataLiMo.talerts_lotfeatures.map((e,i) => (
                                            <option key={i} value={e}> {e}</option>
                                        ))}                                    
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="form-group row">
                        <form className="form-inline">
                        <input type="radio"  name="popular_locations" className="slectOne" onChange={onlyOneChek}/>
                            <div id="style-position-left">
                                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref" id="label_left"> Popular
                                    Locations</label>
                            </div>
                            <div id="style-position-right">
                                <select  id="popular_locations" className="form-control" name="popular_locations" 
                                    onChange={onHandleInput}  id="popular_locations" disabled
                                >
                                    <option hidden defaultValue>Enter any location</option>
                                    { dataLiMo &&  dataLiMo.talerts_subdivisionname.map((e,i) => (
                                            <option key={i} value={e}> {e}</option>
                                        ))} 
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="form-group row">
                        <form className="form-inline">
                            <input type="radio"  name="county" className="slectOne" onChange={onlyOneChek}/>
                            <div id="style-position-left">
                                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref" id="label_left"> County</label>
                            </div>
                            <div id="style-position-right">
                                <select  id="county" className="form-control" name="county"
                                     onChange={onHandleInput}  id="county" disabled
                                >
                                    <option hidden defaultValue>Enter any county</option>                                    
                                        { dataLiMo &&  dataLiMo.talerts_country.map((e,i) => (
                                            <option key={i} value={e}> {e}</option>
                                        ))}
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="form-group row">
                        <form className="form-inline">
                            <input type="radio"  name="school" className="slectOne" onChange={onlyOneChek}/>
                            <div id="style-position-left">
                                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref" id="label_left"> School</label>
                            </div>
                            <div id="style-position-right">
                                <select  id="school" className="form-control" name="school" 
                                    onChange={onHandleInput}  id="school" disabled
                                >
                                    <option hidden defaultValue>Enter any school</option>
                                    { dataLiMo &&  dataLiMo.talerts_highschool.map((e,i) => (
                                            <option key={i} value={e}> {e}</option>
                                        ))}
                                </select>
                            </div>
                        </form>
                    </div>

                    
                    <h6 id='style_subtitulos'>Price Range <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">                                
                                    {/* <select className="custom-select my-1 mr-sm-2" name="price_from"
                                            onChange={onHandleInput}>
                                        <option hidden defaultValue>Min price</option>
                                        <option value="any">Any</option>
                                        {data_elaert.price.min_price.map((data,i) => (
                                            <option value={data.id} key={i}>${data.label}</option>
                                        ))}
                                    </select>
                                
                                    <select className="custom-select my-1 mr-sm-2" name="price_to"
                                            onChange={onHandleInput}>
                                        <option hidden defaultValue>Max price</option>
                                        {data_elaert.price.max_price.map((data,i) => (
                                            <option value={data.id} key={i}>${data.label}</option>
                                        ))}
                                    </select> */}
                                                                                  
                            <input type="text" className="form-control" placeholder="From" onBlur={onHandleInput}
                            name="price_from" defaultValue={dataEAlertPriceFrom}/>

                            <input type="text" className="form-control" placeholder="To"  onBlur={onHandleInput}
                            name="price_to" /> 
                        </form>
                    </div>

                    
                    <h6 id='style_subtitulos'>Property Type <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>

                    <div className="form-group row">

                        <form className="form-inline" id='form_reg_alert'>

                            { listaComboProperty && listaComboProperty.map((value, i) =>(
                                
                                <div className="form-check" key={i}>
                                        <input className="form-check-input" type="checkbox" value={value.descripcion} id='form_reg_alert_1' onClick={onHandleInput} 
                                        name="property_type" />
                                        <label className="form-check-label">
                                            <option className="form-check-label" value = {value.descripcion} id='form_reg_alert_2'>
                                            {value.descripcion}
                                            </option>
                                        </label>
                                </div>

                            ))}

                        </form>

                    </div>
                    
                    <h6 id='style_subtitulos'>Listing Status <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">

                            { listaComboListingStatus && listaComboListingStatus.map((value, i) => {
                                let listing_check = false
                                if(value.descripcion === 'Active'|| value.descripcion === 'Coming soon'){
                                    listing_check = true
                                }

                                return (
                                
                                <div className="form-check" key={i}>
                                    <input className="form-check-input" type="checkbox" value={value.descripcion} id='form_reg_alert_1' onChange={onHandleInput}
                                    name="listing_status" defaultChecked={listing_check}/>
                                    <label className="form-check-label">
                                        <option className="form-check-label" value = {value.descripcion} id='form_reg_alert_2'>
                                            {value.descripcion}
                                        </option>
                                    </label>
                                </div>

                            )})}

                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Bedrooms <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="bedrooms_from"
                                            onChange={onHandleInput}>
                                        <option hidden defaultValue>From</option>
                                        <option value="any">Any</option>
                                        {data_elaert.bedroom.map((data,i) => (
                                            <option value={data.id} key={i}>{data.label}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="bedrooms_to"
                                            onChange={onHandleInput}>
                                        <option hidden defaultValue>To</option>
                                        <option value="any">Any</option>
                                        {data_elaert.bedroom.map((data,i) => (
                                            <option value={data.id} key={i}>{data.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div> 
                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Bathrooms <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="bathrooms_from"
                                            onChange={onHandleInput} >
                                        <option hidden defaultValue>From</option>                                        
                                        <option value="any">Any</option>
                                        {data_elaert.bathroom.map((data,i) => (
                                            <option value={data.id} key={i}>{data.label}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2"
                                            onChange={onHandleInput} name="bathrooms_to">
                                        <option hidden defaultValue>To</option>
                                        <option value="any">Any</option>
                                        {data_elaert.bathroom.map((data,i) => (
                                            <option value={data.id} key={i}>{data.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div> 
                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Square Footage <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2"
                                    onChange={onHandleInput} name="square_footage_from"
                                            >
                                        <option hidden defaultValue>From</option>
                                        <option value="any">Any</option>
                                        {data_elaert.square_footage.map((data,i) => (
                                            <option value={data.id} key={i}>{data.label}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2"
                                        onChange={onHandleInput} name="square_footage_to"
                                            >
                                        <option hidden defaultValue>To</option>
                                        <option value="any">Any</option>
                                        {data_elaert.square_footage.map((data,i) => (
                                            <option value={data.id} key={i}>{data.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Year Build <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="year_build_from"
                                            onChange={onHandleInput}>
                                        <option hidden defaultValue>From</option>
                                        <option value="any">Any</option>
                                        {data_elaert.year_build.map((data,i) => (
                                            <option value={data.id} key={i}>{data.label}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="year_build_to"
                                            onChange={onHandleInput}>
                                        <option hidden defaultValue>To</option>
                                        <option value="any">Any</option>
                                        {data_elaert.year_build.map((data,i) => (
                                            <option value={data.id} key={i}>{data.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Acreage <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10"> 
                                    <select className="custom-select my-1 mr-sm-2" name="acreage_from"
                                            onChange={onHandleInput}>
                                        <option hidden defaultValue>From</option>
                                        <option value="any">Any</option>
                                        {data_elaert.acreage.map((data,i) => (
                                            <option value={data.id} key={i}>{data.label}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="acreage_to"
                                            onChange={onHandleInput}>
                                        <option hidden defaultValue>To</option>
                                        <option value="any">Any</option>
                                        {data_elaert.acreage.map((data,i) => (
                                            <option value={data.id} key={i}>{data.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Stories total <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="stories_total_from"
                                            onChange={onHandleInput}>
                                        <option hidden defaultValue>From</option>
                                        <option value="any">Any</option>
                                        {data_elaert.stories_total.map((data,i) => (
                                            <option value={data.id} key={i}>{data.label}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                             <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="stories_total_to"
                                            onChange={onHandleInput}>
                                        <option hidden defaultValue>To</option>
                                        <option value="any">Any</option>
                                        {data_elaert.stories_total.map((data,i) => (
                                            <option value={data.id} key={i}>{data.label}</option>
                                        ))}                                        
                                    </select>
                                </div>
                            </div> 
                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Garages total <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="garages_total_from"
                                            onChange={onHandleInput}>
                                        <option hidden defaultValue>From</option>
                                        <option value="any">Any</option>
                                        {data_elaert.garages_total.map((data,i) => (
                                            <option value={data.id} key={i}>{data.label}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="garages_total_to"
                                            onChange={onHandleInput}>
                                        <option hidden defaultValue>To</option>
                                        <option value="any">Any</option>
                                        {data_elaert.garages_total.map((data,i) => (
                                            <option value={data.id} key={i}>{data.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div> 
                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Days Listed <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div className="form-group row">
                        {/* <form className="form-inline" onClick={llamarComboDaysListed}> */}
                        <form className="form-inline">
                            <div>
                                <select  className="form-control" name="days_listed"
                                    onChange={onHandleInput} //onChange={onAddAgent}
                                >
                                    
                                    <option hidden defaultValue>Any</option>
                                    <option value="any">Any</option>                                    
                                    {data_elaert.days_listed.map((data,i) => (
                                            <option value={data.id} key={i}>{data.label}</option>
                                    ))}
                                    {/* <option hidden defaultValue>Enter any property</option>
                                    {listaComboDaysListed} */}
                                </select>
                            </div>
                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Community Features <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">

                            { listaComboCommunityFeatures && listaComboCommunityFeatures.map((value, i) =>(
                                <div className="form-check" key={i}>
                                    <input className="form-check-input" type="checkbox" value={value.descripcion}
                                    name="community_features"
                                    onClick={onHandleInput} />
                                    <label className="form-check-label">
                                        <option className="form-check-label" value = {value.descripcion} id='form_reg_alert_2'>
                                            {value.descripcion}
                                        </option>
                                    </label>
                                </div>

                            ))}

                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Property Features <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">

                            { listaComboPropertyFeature && listaComboPropertyFeature.map((value, i) =>(
                                <div className="form-check" key={i}>
                                    <input className="form-check-input" type="checkbox" value={value.descripcion} id="form_reg_alert_1" 
                                    name="property_features"
                                    onChange={onHandleInput} />
                                    <label className="form-check-label">
                                        <option className="form-check-label" value = {value.descripcion} id='form_reg_alert_2'>
                                            {value.descripcion}
                                        </option>
                                    </label>
                                </div>

                            ))}

                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Waterfront <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">

                            { listaComboWaterfront && listaComboWaterfront.map((value, i) =>(
                                <div className="form-check"  key={i}>
                                    <input className="form-check-input" type="checkbox" value={value.descripcion} id="form_reg_alert_1"
                                    name="waterfront"
                                    onChange={onHandleInput}/>
                                    <label className="form-check-label">
                                        <option className="form-check-label" value = {value.descripcion} id='form_reg_alert_2'>
                                            {value.descripcion}
                                        </option>
                                    </label>
                                </div>

                            ))}

                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>View <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">

                            { listaComboView && listaComboView.map((value, i) =>(
                                <div className="form-check"  key={i}>
                                    <input className="form-check-input" type="checkbox" value={value.descripcion} id="form_reg_alert_1"
                                    name="view"
                                    onChange={onHandleInput} />
                                    <label className="form-check-label">
                                        <option className="form-check-label" value = {value.descripcion} id='form_reg_alert_2'>
                                            {value.descripcion}
                                        </option>
                                    </label>
                                </div>

                            ))}

                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Exterior features <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">

                            { listaComboExteriorFeatures && listaComboExteriorFeatures.map((value, i) =>(
                                <div className="form-check"  key={i}>
                                    <input className="form-check-input" type="checkbox" value={value.descripcion} id="form_reg_alert_1" 
                                    name="exterior_features"
                                    onChange={onHandleInput}/>
                                    <label className="form-check-label">
                                        <option className="form-check-label" value = {value.descripcion} id='form_reg_alert_2'>
                                            {value.descripcion}
                                        </option>
                                    </label>
                                </div>

                            ))}

                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Interior Features <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">

                            { listaComboInteriorFeaturess && listaComboInteriorFeaturess.map((value, i) =>(
                                <div className="form-check"  key={i}>
                                    <input className="form-check-input" type="checkbox" value={value.descripcion} id="form_reg_alert_1" 
                                    name="interior_features"
                                    onChange={onHandleInput} />
                                    <label className="form-check-label">
                                        <option className="form-check-label" value = {value.descripcion} id='form_reg_alert_2'>
                                            {value.descripcion}
                                        </option>
                                    </label>
                                </div>

                            ))}

                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Style <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">

                            { listaComboStyle && listaComboStyle.map((value, i) =>(
                                <div className="form-check"  key={i}>
                                    <input className="form-check-input" type="checkbox" value={value.descripcion} id="form_reg_alert_1"
                                    name="style"
                                    onChange={onHandleInput} />
                                    <label className="form-check-label">
                                        <option className="form-check-label" value = {value.descripcion} id='form_reg_alert_2'>
                                            {value.descripcion}
                                        </option>
                                    </label>
                                </div>

                            ))}

                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Financing <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">

                            { listaComboFinancing && listaComboFinancing.map((value, i) =>(
                                <div className="form-check"  key={i}>
                                    <input className="form-check-input" type="checkbox" value={value.descripcion} id="form_reg_alert_1" 
                                    name="financing"
                                    onChange={onHandleInput} />
                                    <label className="form-check-label">
                                        <option className="form-check-label" value = {value.descripcion} id='form_reg_alert_2'>
                                            {value.descripcion}
                                        </option>
                                    </label>
                                </div>

                            ))}

                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Keywords <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">
                            <input type="text" className="form-control" placeholder="Keywords" 
                            name="keywords"
                            onChange={onHandleInput}
                            />
                            <p>Keywords are matched to text in the public remarks, street address, postal code,
                                MLS number and neighborhood fields on a listing's full details page</p>
                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Save This e-Alert <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <a>E-Alert Content Type</a>
                                    <form>

                                            <select id="size_save_alert2" className="form-control" 
                                            name="type_content" onChange={onHandleInput}>
                                                <option hidden defaultValue>Select</option>
                                                <option value="buller">Buller</option>
                                                <option value="seller">Seller</option>
                                            </select>

                                    </form>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <a>E-Alert Frequency</a>
                                    <form onClick={llamarComboEAlertFrequency}>

                                            <select id="size_save_alert2" className="form-control" 
                                            name="alert_frequency" onChange={onHandleInput}>
                                                <option hidden defaultValue>Enter any property</option>
                                                {listaComboEAlertFrequency}
                                            </select>

                                    </form>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <h6 className='style_subtitulos'>Sending Settings <label className="count_alert">Properties {load?<Loader size='mini' active inline />:<span>{count}</span>}</label></h6>
                    <form>
                    <div className="form-group row">
                        <label for="email_addresses" className="col-sm-2 col-form-label">To</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" 
                        name="email_addresses" 
                        defaultValue={email}
                        onChange={onFormatEmail}
                        placeholder="Type or paste email addresses and press `Enter`..."
                         />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="subject" className="col-sm-2 col-form-label">Subject</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" 
                           name="subject"
                           placeholder="Subject"
                           onChange={onFormatEmail}
                           defaultValue='Newest Listings Matching Your Home Search'
                        />
                        </div>
                    </div>
                    </form>                    

                    <div className="form-group row">
                        <button type="button" className="btn btn-secondary" id="btn_alert_cancel">Cancel</button>
                        <button data-toggle="modal" type="button" className="btn btn-secondary" id="btn_alert_savetem" data-target="#chooseSavetemplate">Save As Template</button>
                        <button type="button" className="btn btn-success" id="btn_alert_preview" onClick={onPreview}>Preview</button>

                        <button className="btn btn-primary" type="submit" id="btn_alert_save" onClick={onInsertEalert}>Save</button>
                    </div>

                    <div className="modal fade" data-backdrop="static" data-keyboard="false"
                         id="chooseSavetemplate" role="dialog" aria-labelledby="exampleModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Save eAlert Template
                                    </h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div className="modal-body">
                                    <form>
                                        <div className="form-row">

                                            <div className="col">
                                                <label>Template name</label>
                                                <input type="text" className="form-control" id="formGroupExampleInput" name="first_name" placeholder="Type the name of your template" onChange={enviarDatosTemplate} required />


                                            </div>

                                        </div>
                                    </form>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                        //onClick={onCanceModal}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        onClick={insertTemplates}
                                        className="btn btn-primary"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>



                </form>

            </div>

        </div>
    );

};

export default FormEAlertsRegistro;
