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

const FormEAlertsRegistro = (props) => {
    const {reloadComponent, setReloadComponent} = useContext(ReloadComponent);
    const [hasError, setErrors] = useState(false);
    const [dataTeam, setDataTeam] = useState();

    const id_lead = props.id_lead;

    // List data table
    const getData = async () => {
        ServiceRest("agent_portal/Team/listarTeam")
            .then((res) => setDataTeam(res.datos))
            .catch((err) => setErrors(err));
    };

    useEffect(() => {
        getData();
    }, [reloadComponent]);

    /******************Lista del Combo Tipo property**********************/
    /*Aqui Creamos el Hook para el Estado Inicial para el Combo*/
    const [listaCombo, setListaCombo] = useState('Select');
    /***********************************************************/
    /*Funcion para llamar al Servicio del ERP y Listar el Combo*/
    const llamarComboProperty = e => {
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_property_type'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/
        listado.then((value) => {
            setListaCombo(value.datos.map((comboLead) =>
                <option key={comboLead.descripcion} value = {comboLead.descripcion}>
                    {comboLead.descripcion}
                </option>
            ));
        });
        document.getElementById("Formulario_EAlert").reset();
    }
    const llamarComboDaysListed = e => {
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_days_listed'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/
        listado.then((value) => {
            setListaCombo(value.datos.map((comboLead) =>
                <option key={comboLead.descripcion} value = {comboLead.descripcion}>
                    {comboLead.descripcion}
                </option>
            ));
        });
        document.getElementById("Formulario_EAlert").reset();
    }
    const llamarComboListingStatus = e => {
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_listing_status'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/
        listado.then((value) => {
            setListaCombo(value.datos.map((comboLead) =>
                <option key={comboLead.descripcion} value = {comboLead.descripcion}>
                    {comboLead.descripcion}
                </option>
            ));
        });
        document.getElementById("Formulario_EAlert").reset();
    }
    const llamarComboCommunityFeatures = e => {
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_community_features'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/
        listado.then((value) => {
            setListaCombo(value.datos.map((comboLead) =>
                <option key={comboLead.descripcion} value = {comboLead.descripcion}>
                    {comboLead.descripcion}
                </option>
            ));
        });
        document.getElementById("Formulario_EAlert").reset();
    }
    const llamarComboPropertyFeatures = e => {
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_property_features'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/
        listado.then((value) => {
            setListaCombo(value.datos.map((comboLead) =>
                <option key={comboLead.descripcion} value = {comboLead.descripcion}>
                    {comboLead.descripcion}
                </option>
            ));
        });
        document.getElementById("Formulario_EAlert").reset();
    }
    const llamarComboWaterfront = e => {
        var params = { start: 0, limit: 50, codSubsistema:'AP', catalogo_tipo:'talerts_waterfront'};
        var listado = ServiceRest('parametros/Catalogo/listarCatalogoCombo',params);
        /*Formateamos el Promise de resultado para mandar el dato al combo*/
        listado.then((value) => {
            setListaCombo(value.datos.map((comboLead) =>
                <option key={comboLead.descripcion} value = {comboLead.descripcion}>
                    {comboLead.descripcion}
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
    const insertEAlerts = async (e) => {
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

    return (
        <div>


            <div className="container-fluid">
                <form id='Formulario_EAlert'  >

                    <div className="form-group row">
                        <button type="button" className="btn btn-secondary" id="btn_alert_cancel">Cancel</button>
                        <NavLink className="nav-link" to="#" id="btn_alert_savetem"><a href="#">Load Templates</a></NavLink>
                        <button type="button" className="btn btn-success" id="btn_alert_preview">Preview</button>
                        <button className="btn btn-primary" type="submit" id="btn_alert_save">Save</button>
                    </div>

                    <h6 id='style_subtitulos'>Location</h6>
                    <div className="form-row">
                        <form className="form-inline">
                            <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">City</label>
                            <div id="formatoform_city">
                                <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                                    <option selected>Enter any city</option>
                                    <option value="1"></option>
                                    <option value="2"></option>
                                    <option value="3"></option>
                                </select>
                                <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                                    <option selected>Specify any state</option>
                                    <option value="1"></option>
                                    <option value="2"></option>
                                    <option value="3"></option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="form-group row">

                        <div id="style-position-left">
                            <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref" id="label_left">Zip</label>
                        </div>
                        <div id="style-position-right" >
                            <select id="size_option" className="form-control" name="id_agent"
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
                                <select id="size_option" className="form-control" name="id_agent"
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
                                <select id="size_option" className="form-control" name="id_agent"
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
                                <select id="size_option" className="form-control" name="id_agent"
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
                                <select id="size_option" className="form-control" name="id_agent"
                                    //onChange={onAddAgent}
                                >
                                    <option hidden defaultValue>Enter any school</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    <h6 id='style_subtitulos'>Price Range</h6>
                    <div className="form-group row">
                        <form className="form-inline">
                            <input type="text" className="form-control" placeholder="From"/>
                            <span>  </span>
                            <input type="text" className="form-control" placeholder="To"/>
                        </form>
                    </div>

                    <h6 id='style_subtitulos'>Property Type</h6>
                    <div className="form-group row">
                        <form className="form-inline" onClick={llamarComboProperty}>
                            <div>
                                <select id="size_option" className="form-control" name="property_type" onChange={enviarDatos}>
                                    <option hidden defaultValue>Enter any property</option>
                                    {listaCombo}
                                </select>
                            </div>
                        </form>
                    </div>
                    <h6 id='style_subtitulos'>Listing Status</h6>
                    <div className="form-group row">
                        <form className="form-inline" onClick={llamarComboListingStatus}>
                            <div>
                                <select id="size_option" className="form-control" name="listing_status" onChange={enviarDatos}>>
                                    <option hidden defaultValue>Enter any listing</option>
                                    {listaCombo}
                                </select>
                            </div>
                        </form>
                    </div>
                    <h6 id='style_subtitulos'>Bedrooms</h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2"
                                            id="inlineFormCustomSelectPref">
                                        <option selected>From</option>
                                        <option value="1">Any</option>
                                        <option value="2">1</option>
                                        <option value="3">2</option>
                                        <option value="3">3</option>
                                        <option value="3">4</option>
                                        <option value="3">5</option>
                                        <option value="3">6</option>
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2"
                                            id="inlineFormCustomSelectPref">
                                        <option selected>to</option>
                                        <option value="1">Any</option>
                                        <option value="2">1</option>
                                        <option value="3">2</option>
                                        <option value="3">3</option>
                                        <option value="3">4</option>
                                        <option value="3">5</option>
                                        <option value="3">6</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <h6 id='style_subtitulos'>Bathrooms</h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2"
                                            id="inlineFormCustomSelectPref">
                                        <option selected>From</option>
                                        <option value="1">Any</option>
                                        <option value="2">1</option>
                                        <option value="3">2</option>
                                        <option value="3">3</option>
                                        <option value="3">4</option>
                                        <option value="3">5</option>
                                        <option value="3">6</option>
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2"
                                            id="inlineFormCustomSelectPref">
                                        <option selected>to</option>
                                        <option value="1">Any</option>
                                        <option value="2">1</option>
                                        <option value="3">2</option>
                                        <option value="3">3</option>
                                        <option value="3">4</option>
                                        <option value="3">5</option>
                                        <option value="3">6</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <h6 id='style_subtitulos'>Square Footage</h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2"
                                            id="inlineFormCustomSelectPref">
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
                                            id="inlineFormCustomSelectPref">
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
                    <h6 id='style_subtitulos'>Year Build</h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2"
                                            id="inlineFormCustomSelectPref">
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
                                    <select className="custom-select my-1 mr-sm-2"
                                            id="inlineFormCustomSelectPref">
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
                    <h6 id='style_subtitulos'>Acreage</h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2"
                                            id="inlineFormCustomSelectPref">
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
                                    <select className="custom-select my-1 mr-sm-2"
                                            id="inlineFormCustomSelectPref">
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
                    <h6 id='style_subtitulos'>Stories total</h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2"
                                            id="inlineFormCustomSelectPref">
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
                                    <select className="custom-select my-1 mr-sm-2"
                                            id="inlineFormCustomSelectPref">
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
                    <h6 id='style_subtitulos'>Garages total</h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2"
                                            id="inlineFormCustomSelectPref">
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
                                    <select className="custom-select my-1 mr-sm-2"
                                            id="inlineFormCustomSelectPref">
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
                    <h6 id='style_subtitulos'>Days Listed</h6>
                    <div className="form-group row">
                        <form className="form-inline" onClick={llamarComboDaysListed}>
                            <div>
                                <select id="size_option" className="form-control" name="id_agent"
                                    //onChange={onAddAgent}
                                >
                                    <option hidden defaultValue>Enter any property</option>
                                    {listaCombo}
                                </select>
                            </div>
                        </form>
                    </div>
                    <h6 id='style_subtitulos'>Community Features</h6>
                    <div className="form-group row">
                        <form className="form-inline" onClick={llamarComboCommunityFeatures}>
                            <div>
                                <select id="size_option" className="form-control" name="id_agent"
                                    //onChange={onAddAgent}
                                >
                                    <option hidden defaultValue>Enter any property</option>
                                    {listaCombo}
                                </select>
                            </div>
                        </form>
                    </div>
                    <h6 id='style_subtitulos'>Property Features</h6>
                    <div className="form-group row">
                        <form className="form-inline" onClick={llamarComboPropertyFeatures}>
                            <div>
                                <select id="size_option" className="form-control" name="property_type" onChange={enviarDatos}>
                                    <option hidden defaultValue>Enter any property</option>
                                    {listaCombo}
                                </select>
                            </div>
                        </form>
                    </div>
                    <h6 id='style_subtitulos'>Waterfront</h6>
                    <div className="form-group row">
                        <form className="form-inline" onClick={llamarComboWaterfront}>
                            <div>
                                <select id="size_option" className="form-control" name="id_agent"
                                    //onChange={onAddAgent}
                                >
                                    <option hidden defaultValue>Enter any property</option>
                                    {listaCombo}
                                </select>
                            </div>
                        </form>
                    </div>
                    <h6 id='style_subtitulos'>View</h6>
                    <div className="form-group row">
                        <form className="form-inline">
                            <div>
                                <select id="size_option" className="form-control" name="id_agent"
                                    //onChange={onAddAgent}
                                >
                                    <option hidden defaultValue>Enter any property</option>

                                </select>
                            </div>
                        </form>
                    </div>
                    <h6 id='style_subtitulos'>Exterior features</h6>
                    <div className="form-group row">
                        <form className="form-inline">
                            <div>
                                <select id="size_option" className="form-control" name="id_agent"
                                    //onChange={onAddAgent}
                                >
                                    <option hidden defaultValue>Enter any property</option>

                                </select>
                            </div>
                        </form>
                    </div>
                    <h6 id='style_subtitulos'>Interior Features</h6>
                    <div className="form-group row">
                        <form className="form-inline">
                            <div>
                                <select id="size_option" className="form-control" name="id_agent"
                                    //onChange={onAddAgent}
                                >
                                    <option hidden defaultValue>Enter any property</option>

                                </select>
                            </div>
                        </form>
                    </div>
                    <h6 id='style_subtitulos'>Style</h6>
                    <div className="form-group row">
                        <form className="form-inline">
                            <div>
                                <select id="size_option" className="form-control" name="id_agent"
                                    //onChange={onAddAgent}
                                >
                                    <option hidden defaultValue>Enter any property</option>

                                </select>
                            </div>
                        </form>
                    </div>
                    <h6 id='style_subtitulos'>Financing</h6>
                    <div className="form-group row">
                        <form className="form-inline">
                            <div>
                                <select id="size_option" className="form-control" name="id_agent"
                                    //onChange={onAddAgent}
                                >
                                    <option hidden defaultValue>Enter any property</option>

                                </select>
                            </div>
                        </form>
                    </div>

                    <h6 id='style_subtitulos'>Keywords</h6>
                    <div className="form-group row">
                        <form className="form-inline">
                            <input type="text" className="form-control" placeholder="Keywords"/>
                            <p>Keywords are matched to text in the public remarks, street address, postal code,
                                MLS number and neighborhood fields on a listing's full details page</p>
                        </form>
                    </div>

                    <h6 id='style_subtitulos'>Save This e-Alert</h6>
                    <div>
                        <form className="form-inline">
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2"
                                            id="inlineFormCustomSelectPref">
                                        <option selected>Buller</option>
                                        <option value="1">Seller</option>
                                    </select>

                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <select className="custom-select my-1 mr-sm-2"
                                            id="inlineFormCustomSelectPref">
                                        <option selected>Daily</option>
                                        <option value="1">Never</option>
                                        <option value="2">Instantly</option>
                                        <option value="3">Daily</option>
                                        <option value="3">Twice a week</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <h6 id='style_subtitulos'>Sending Settings</h6>
                    <div className="form-group row">
                        <form>

                        </form>
                    </div>

                    <div className="form-group row">
                        <button type="button" className="btn btn-secondary" id="btn_alert_cancel">Cancel</button>
                        <button type="button" className="btn btn-secondary" id="btn_alert_savetem">Save As Template</button>
                        <button type="button" className="btn btn-success" id="btn_alert_preview">Preview</button>
                        <button className="btn btn-primary" type="submit" id="btn_alert_save">Save</button>
                    </div>

                </form>
            </div>

        </div>
    );

};

export default FormEAlertsRegistro;
