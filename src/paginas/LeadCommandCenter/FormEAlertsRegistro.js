/****************************************************************************************
 *@file FormEAlertsRegistro.js
 *@author  (Maylee Perez Pastor)
 *@date 12-08-2020
 *@description Componente Add FormEAlertsRegistro
 *****************************************************************************************/


import React, {useState, useEffect, useContext} from "react";
import {ServiceRest} from "../../services/ServiceRest";
import {ReloadComponent} from "../../contexts/ReloadComponent";

import './styles/FormEAlertsStyle.css';
import {NavLink} from "react-router-dom";

import FormEAlerts from "./FormEAlerts";

const FormEAlertsRegistro = (props) => {
    const {reloadComponent, setReloadComponent} = useContext(ReloadComponent);
    const [hasError, setErrors] = useState(false);
    const [dataTeam, setDataTeam] = useState();
    const [dataProperty, setProperty] = useState();
    const [dataEalertInsert, setEalertInsert] = useState(	{'id_lead': "",
    'exterior_features': "",
    'state': "",
    'stories_total_to': "",
    'neighborhood': "",
    'garages_total_from': "",
    'listing_status': "",
    'interior_features': "",
    'alert_frequency': "",
    'property_type': "",
    'style': "",
    'subject': "",
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
    'bathrooms_to': ""
    });
    const [filterE, setFilter] = useState();
    const [count, setCount] = useState();

    const id_lead = props.id_lead;
    const v_setCart = props.setCart;

    //console.log('kllea va', id_lead)
    /*******************************************************************/
    //listar email lead
    const [email, setemail] = useState();
    //console.log('llegaemail ', email)
    const getDataEmail = e => {
        var params = { start: 0, limit: 50, id_lead:id_lead};
        var listado = ServiceRest('agent_portal/Lead/listarLead',params);

        listado.then((value) => {
            /*Enviamos el Valor a las variables para mostrar en el componente*/
            //console.log('llegacall33445list ',value.datos)
            if (value.datos.length > 0 ){
                setemail(value.datos[0].email);
            }

        });
    }

    /*******************************************************************/

    /*******************************************************************/
    //listar Alert
    const [dataEAlertPriceFrom, setEAlertPriceFrom] = useState();
    const [dataEAlertPriceTo, setEAlertPriceTo] = useState();
    console.log('llegaalert22 ', dataEAlertPriceFrom)
    const ListDataEAlert = e => {
        console.log('llegaalert22eeee', e)
        var params = { start: 0, limit: 50, id_lead:id_lead};
        var listado = ServiceRest('agent_portal/Alerts/listarAlerts',params);

        listado.then((value) => {
            /*Enviamos el Valor a las variables para mostrar en el componente*/
            console.log('llegacall33445listalert ',value.datos )

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
        ServiceRest("agent_portal/Alerts/apiAlertsProperty")
        .then((res) => {
            setProperty(JSON.parse(res.datos[0].jsondata))
            setCount(res.total)            
        })
        .catch((err) => setErrors(err));
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
    }, [reloadComponent]);

    /******************Lista del Combo Tipo property**********************/
    /*Aqui Creamos el Hook para el Estado Inicial para el Combo*/
    const [listaComboProperty, setListaComboProperty] = useState();

    /*Funcion para llamar al Servicio del ERP y Listar el Combo*/
    const llamarComboProperty = e => {
        console.log('llega setListeee')
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_property_type'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/

        listado.then((value) => {
            setListaComboProperty(value.datos)
            console.log('llega value.datos', value.datos)
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
    //console.log('lleganote2',dataNoteInsert)


    /********Llamamos a la funcion para recuperar los datos de cada Campo cuando se cambie del input*****/
    const enviarDatos = (e) => {
        //console.log('e', e.target.value)
        setEAlertInsert(e.target.value);
    };
    /****************************************************************************************************/

    /*******Aqui llamamos al boton de Agregar un nuevo Lead y mandar los datos al ERP*******/
    const insertEAlerts = (e) => {
        var params = { start: 0, limit: 50, id_lead:id_lead, descripcion:dataEALertInsert};
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
    /*******************************************************************/

    /*******************************************************************/
    const onHandleInput = (e) => {     
        
        setEalertInsert({...dataEalertInsert,[e.target.name]: e.target.value}) ;
        
        switch (e.target.name) {
            case 'year_build_from':
                    setFilter({...filterE, 'ffd_yearbuilt_pb': e.target.value})                  
                break;
            case 'bedrooms_from':
                    setFilter({...filterE, 'ffd_bedrooms_pb': e.target.value}) 
                break;                 
        }
        console.log("data", dataEalertInsert);
        ServiceRest("agent_portal/Alerts/apiAlertsPropertyCount", filterE)
        .then((res) => {            
            setCount(res.datos[0].contador)            
        })
    }

    const onInsertEalert = (e) => {
        e.preventDefault()
        dataEalertInsert.id_lead= id_lead
        
        var insertar = ServiceRest('agent_portal/Alerts/insertarAlerts', dataEalertInsert);
        insertar.then((resp) => {
            console.log(dataEalertInsert);
            console.log(resp);
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
    console.log('llegaTemplate2',dataTemplateInsert)


    /********Llamamos a la funcion para recuperar los datos de cada Campo cuando se cambie del input*****/
    const enviarDatosTemplate = (e) => {
        //console.log('e', e.target.value)
        setTemplateInsert(e.target.value);
    };
    /****************************************************************************************************/
//console.log('llega ', dataEalertInsert)
    /*******Aqui llamamos al boton de Agregar un nuevo Lead y mandar los datos al ERP*******/
    const insertTemplates = async (e) => {
        var params = { start: 0, limit: 50, id_lead:id_lead, name_template:dataTemplateInsert};
        var insertar = ServiceRest('agent_portal/AlertsTemplate/insertarAlertsTemplate',params);
        //console.log('llegaTemplate3344 ',insertar)
        insertar.then((resp) => {
            //console.log('llegaTemplateeeeee2s', resp.error)
            if (resp.error) {
                const msg = `Reporte el codigo: ${resp.data.id_log} para revision. Detalle: ${resp.detail.message}`;
                alert(msg);
            }
        })




    };
    /*******************************************************************/

    /*******************************************************************/
    const handleDelete = e => {
        console.log('llega delete')
    };
    /*******************************************************************/

    //const [btnCancel, setCancel] = useState(false);


    function buttonCancel(e) {


    }
    /*******************************************************************/



    return (
        <div>


            <div className="container-fluid">


                <form id='Formulario_EAlert'>

                    <div className="form-group row">
                        <button type="button" className="btn btn-secondary" id="btn_alert_cancel" onClick={buttonCancel}>Cancel</button>


                            {/*<a>Load Templates</a>*/}
                            <form onClick={llamarTemplate}>

                                <select id="btn_alert_template" className="form-control" onChange={ListDataEAlert}>
                                    <option hidden defaultValue>Select an EAlert Template</option>
                                    {listaComboTemplate}
                                </select>

                            </form>


                        <button type="button" className="btn btn-success" id="btn_alert_preview">Preview</button>
                        <button className="btn btn-primary" type="submit" id="btn_alert_save" onClick={onInsertEalert}>Save</button>
                    </div>

                    <h6 className='style_subtitulos'>Location </h6>
                    <div className="form-group row">
                        <form className="form-inline">
                            <div id="style-position-left">
                                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref" id="label_left">City</label>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" id="size_city">
                                        <option selected>Enter any city</option>
                                        <option value="1"></option>
                                        <option value="2"></option>
                                        <option value="3"></option>
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" id="size_city">
                                        <option selected>Specify any state</option>
                                        <option value="1"></option>
                                        <option value="2"></option>
                                        <option value="3"></option>
                                    </select>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="form-group row">

                        <div id="style-position-left">
                            <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref" id="label_left">Zip</label>
                        </div>
                        <div id="style-position-right" >
                            <select  className="form-control" name="id_agent"
                                //onChange={onAddAgent}
                            >
                                <option hidden defaultValue>Enter any zip</option>

                            </select>
                        </div>

                    </div>

                    <div className="form-group row">
                        <form className="form-inline">
                            <div id="style-position-left">
                                <label className="my-1 mr-2"
                                       htmlFor="inlineFormCustomSelectPref" id="label_left">Neighborhood</label>
                            </div>
                            <div id="style-position-right">
                                <select  className="form-control" name="id_agent"
                                    //onChange={onAddAgent}
                                >
                                    <option hidden defaultValue>Enter any neighborhood</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="form-group row">
                        <form className="form-inline">
                            <div id="style-position-left">
                                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref" id="label_left">Popular
                                    Locations</label>
                            </div>
                            <div id="style-position-right">
                                <select  className="form-control" name="id_agent"
                                    //onChange={onAddAgent}
                                >
                                    <option hidden defaultValue>Enter any location</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="form-group row">
                        <form className="form-inline">
                            <div id="style-position-left">
                                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref" id="label_left">County</label>
                            </div>
                            <div id="style-position-right">
                                <select  className="form-control" name="id_agent"
                                    //onChange={onAddAgent}
                                >
                                    <option hidden defaultValue>Enter any county</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="form-group row">
                        <form className="form-inline">
                            <div id="style-position-left">
                                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref" id="label_left">School</label>
                            </div>
                            <div id="style-position-right">
                                <select  className="form-control" name="id_agent"
                                    //onChange={onAddAgent}
                                >
                                    <option hidden defaultValue>Enter any school</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    
                    <h6 id='style_subtitulos'>Price Range <label className="count_alert">Properties {count}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">
                            <input type="text" className="form-control" placeholder="From" onChange={onHandleInput}
                            name="price_from" defaultValue={dataEAlertPriceFrom}/>

                            <input type="text" className="form-control" placeholder="To"  onChange={onHandleInput}
                            name="price_to" />
                        </form>
                    </div>

                    
                    <h6 id='style_subtitulos'>Property Type <label className="count_alert">Properties {count}</label></h6>

                    <div className="form-group row">

                        <form className="form-inline" id='form_reg_alert'>

                            { listaComboProperty && listaComboProperty.map((value, i) =>(
                                <div className="form-check" key={i}>
                                        <input className="form-check-input" type="checkbox" value="" id='form_reg_alert_1' onChange={onHandleInput} 
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
                    
                    <h6 id='style_subtitulos'>Listing Status <label className="count_alert">Properties {count}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">

                            { listaComboListingStatus && listaComboListingStatus.map((value, i) =>(
                                <div className="form-check" key={i}>
                                    <input className="form-check-input" type="checkbox" value="" id='form_reg_alert_1' onChange={onHandleInput}
                                    name="listing_status" />
                                    <label className="form-check-label">
                                        <option className="form-check-label" value = {value.descripcion} id='form_reg_alert_2'>
                                            {value.descripcion}
                                        </option>
                                    </label>
                                </div>

                            ))}

                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Bedrooms <label className="count_alert">Properties {count}</label></h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="bedrooms_from"
                                            onChange={onHandleInput}>
                                        <option hidden defaultValue>From</option>
                                        <option value="any">Any</option>
                                        {dataProperty && dataProperty.value_data[0].bedroom.map((data,i) => (
                                            <option value={data} key={i}>{data}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="bedrooms_to"
                                            onChange={onHandleInput}>
                                        <option hidden defaultValue>to</option>
                                        <option value="any">Any</option>
                                        {dataProperty && dataProperty.value_data[0].bedroom.map((data,i) => (
                                            <option value={data} key={i}>{data}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Bathrooms <label className="count_alert">Properties {count}</label></h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="bathrooms_from"
                                            onChange={onHandleInput} >
                                        <option hidden defaultValue>From</option>
                                        <option value="1">Any</option>
                                        {dataProperty && dataProperty.value_data[0].bathroom.map((data,i) => (
                                            <option value={data} key={i}>{data}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2"
                                            onChange={onHandleInput} name="bathrooms_to">
                                        <option hidden defaultValue>to</option>
                                        <option value="any">Any</option>
                                        {dataProperty && dataProperty.value_data[0].bathroom.map((data,i) => (
                                            <option value={data} key={i}>{data}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Square Footage <label className="count_alert">Properties {count}</label></h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2"
                                    onChange={onHandleInput} name="square_footage_from"
                                            >
                                        <option selected>From</option>
                                        <option value="1">Any</option>
                                        <option value="2">500</option>
                                        <option value="3">550</option>
                                        <option value="3">600</option>
                                        <option value="3">650</option>
                                        <option value="3">700</option>
                                        <option value="3">750</option>
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2"
                                        onChange={onHandleInput} name="square_footage_to"
                                            >
                                        <option selected>to</option>
                                        <option value="1">Any</option>
                                        <option value="2">500</option>
                                        <option value="3">550</option>
                                        <option value="3">600</option>
                                        <option value="3">650</option>
                                        <option value="3">700</option>
                                        <option value="3">750</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Year Build <label className="count_alert">Properties {count}</label></h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="year_build_from"
                                            onChange={onHandleInput}>
                                        <option hidden defaultValue>From</option>
                                        <option value="any">Any</option>
                                        {dataProperty && dataProperty.value_data[0].yearbuilt.map((data,i) => (
                                            <option value={data} key={i}>{data}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="year_build_to"
                                            onChange={onHandleInput}>
                                        <option hidden defaultValue>to</option>
                                        <option value="any">Any</option>
                                        {dataProperty && dataProperty.value_data[0].yearbuilt.map((data,i) => (
                                            <option value={data} key={i}>{data}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Acreage <label className="count_alert">Properties {count}</label></h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10"> 
                                    <select className="custom-select my-1 mr-sm-2" name="acreage_from"
                                            onChange={onHandleInput}>
                                        <option hidden defaultValue>From</option>
                                        <option value="any">Any</option>
                                        {dataProperty && dataProperty.value_data[0].ffd_acres_calc.map((data,i) => (
                                            <option value={data} key={i}>{data}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="acreage_to"
                                            onChange={onHandleInput}>
                                        <option hidden defaultValue>to</option>
                                        {dataProperty && dataProperty.value_data[0].ffd_acres_calc.map((data,i) => (
                                            <option value={data} key={i}>{data}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Stories total <label className="count_alert">Properties {count}</label></h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="stories_total_from"
                                            onChange={onHandleInput}>
                                        <option selected>From</option>
                                        <option value="1">Any</option>
                                        <option value="2">1900</option>
                                        <option value="3">1930</option>
                                        <option value="3">1940</option>
                                        <option value="3">650</option>
                                        <option value="3">700</option>
                                        <option value="3">750</option>
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="stories_total_to"
                                            onChange={onHandleInput}>
                                        <option selected>to</option>
                                        <option value="1">Any</option>
                                        <option value="2">1900</option>
                                        <option value="3">1930</option>
                                        <option value="3">1940</option>
                                        <option value="3">650</option>
                                        <option value="3">700</option>
                                        <option value="3">750</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Garages total <label className="count_alert">Properties {count}</label></h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="garages_total_from"
                                            onChange={onHandleInput}>
                                        <option selected>From</option>
                                        <option value="1">Any</option>
                                        <option value="2">1900</option>
                                        <option value="3">1930</option>
                                        <option value="3">1940</option>
                                        <option value="3">650</option>
                                        <option value="3">700</option>
                                        <option value="3">750</option>
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2" name="garages_total_to"
                                            onChange={onHandleInput}>
                                        <option selected>to</option>
                                        <option value="1">Any</option>
                                        <option value="2">1900</option>
                                        <option value="3">1930</option>
                                        <option value="3">1940</option>
                                        <option value="3">650</option>
                                        <option value="3">700</option>
                                        <option value="3">750</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Days Listed <label className="count_alert">Properties {count}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline" onClick={llamarComboDaysListed}>
                            <div>
                                <select  className="form-control" name="days_listed"
                                    onChange={onHandleInput} //onChange={onAddAgent}
                                >
                                    <option hidden defaultValue>Enter any property</option>
                                    {listaComboDaysListed}
                                </select>
                            </div>
                        </form>
                    </div>
                    
                    <h6 id='style_subtitulos'>Community Features <label className="count_alert">Properties {count}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">

                            { listaComboCommunityFeatures && listaComboCommunityFeatures.map((value, i) =>(
                                <div className="form-check" key={i}>
                                    <input className="form-check-input" type="checkbox" value={value.id_catalogo}
                                    name="community_features"
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
                    
                    <h6 id='style_subtitulos'>Property Features <label className="count_alert">Properties {count}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">

                            { listaComboPropertyFeature && listaComboPropertyFeature.map((value, i) =>(
                                <div className="form-check" key={i}>
                                    <input className="form-check-input" type="checkbox" value="" id="form_reg_alert_1" 
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
                    
                    <h6 id='style_subtitulos'>Waterfront <label className="count_alert">Properties {count}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">

                            { listaComboWaterfront && listaComboWaterfront.map((value, i) =>(
                                <div className="form-check"  key={i}>
                                    <input className="form-check-input" type="checkbox" value="" id="form_reg_alert_1"
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
                    
                    <h6 id='style_subtitulos'>View <label className="count_alert">Properties {count}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">

                            { listaComboView && listaComboView.map((value, i) =>(
                                <div className="form-check"  key={i}>
                                    <input className="form-check-input" type="checkbox" value="" id="form_reg_alert_1"
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
                    
                    <h6 id='style_subtitulos'>Exterior features <label className="count_alert">Properties {count}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">

                            { listaComboExteriorFeatures && listaComboExteriorFeatures.map((value, i) =>(
                                <div className="form-check"  key={i}>
                                    <input className="form-check-input" type="checkbox" value="" id="form_reg_alert_1" 
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
                    
                    <h6 id='style_subtitulos'>Interior Features <label className="count_alert">Properties {count}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">

                            { listaComboInteriorFeaturess && listaComboInteriorFeaturess.map((value, i) =>(
                                <div className="form-check"  key={i}>
                                    <input className="form-check-input" type="checkbox" value="" id="form_reg_alert_1" 
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
                    
                    <h6 id='style_subtitulos'>Style <label className="count_alert">Properties {count}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">

                            { listaComboStyle && listaComboStyle.map((value, i) =>(
                                <div className="form-check"  key={i}>
                                    <input className="form-check-input" type="checkbox" value="" id="form_reg_alert_1"
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
                    
                    <h6 id='style_subtitulos'>Financing <label className="count_alert">Properties {count}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">

                            { listaComboFinancing && listaComboFinancing.map((value, i) =>(
                                <div className="form-check"  key={i}>
                                    <input className="form-check-input" type="checkbox" value="" id="form_reg_alert_1" 
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
                    
                    <h6 id='style_subtitulos'>Keywords <label className="count_alert">Properties {count}</label></h6>
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
                    
                    <h6 id='style_subtitulos'>Save This e-Alert <label className="count_alert">Properties {count}</label></h6>
                    <div className="form-group row">
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <a>E-Alert Content Type</a>
                                    <form>

                                            <select id="size_save_alert2" className="form-control" onChange={onHandleInput}>
                                                <option selected>Buller</option>
                                                <option value="1">Seller</option>
                                            </select>

                                    </form>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <a>E-Alert Frequency</a>
                                    <form onClick={llamarComboEAlertFrequency}>

                                            <select id="size_save_alert2" className="form-control" onChange={onHandleInput}>
                                                <option hidden defaultValue>Enter any property</option>
                                                {listaComboEAlertFrequency}
                                            </select>

                                    </form>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <h6 className='style_subtitulos'>Sending Settings </h6>
                    <div className="form-group row">
                        <form>

                            <div className="tag-item" >
                                {email}
                                <button
                                    type="button"
                                    className="button"
                                    onClick={handleDelete()}
                                >

                                </button>
                            </div>

                            <input id="inputemail"
                                //className={"input " + (this.state.error && " has-error")}
                                //value={this.state.value}
                                   placeholder="Type or paste email addresses and press `Enter`..."
                                //onKeyDown={this.handleKeyDown}
                                //onChange={this.handleChange}
                                //onPaste={this.handlePaste}
                            />

                        </form>
                    </div>

                    <div className="form-group row">
                        <button type="button" className="btn btn-secondary" id="btn_alert_cancel">Cancel</button>
                        <button data-toggle="modal" type="button" className="btn btn-secondary" id="btn_alert_savetem" data-target="#chooseSavetemplate">Save As Template</button>
                        <button type="button" className="btn btn-success" id="btn_alert_preview">Preview</button>
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
