import React, { useContext, useState, useEffect } from 'react';
import { Form, Field, Input, Select, Segment, Label, Radio, Checkbox, TextArea, Button, Dropdown, Modal, Icon, Card, Table } from 'semantic-ui-react';
import '../../components/styles/formLogin.css';
import '../../components/styles/stylesMenu.css';
import '../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css';
import "semantic-ui-css/semantic.min.css";
import {ServiceRest} from "../../services/ServiceRest";
import {ReloadComponent} from "../../contexts/ReloadComponent";

/*importamos las librerias de PNotify*/
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import * as PNotifyDesktop from '@pnotify/desktop';
import * as PNotifyBootstrap4 from '@pnotify/bootstrap4';
import '@pnotify/core/dist/BrightTheme.css';
import * as PNotifyFontAwesome5 from '@pnotify/font-awesome5';
import * as PNotifyAnimate from '@pnotify/animate';
defaultModules.set(PNotifyBootstrap4, {});
defaultModules.set(PNotifyFontAwesome5, {});
defaultModules.set(PNotifyMobile, {});
/*****************************************/

const CommunitySettings = ({ data, setListing }) => {


    const [firstOpen, setFirstOpen] = useState(false)
    const [secondOpen, setSecondOpen] = useState(false)
    const [community, setCommunity] = useState({name_community: "", parcel_number: ""});
    const [listCommunity, setListCommunity] = useState([]);
    const [listingPreview, setListingPreview] = useState([]);

    const {reloadComponent, setReloadComponent} = useContext(ReloadComponent);

    useEffect(() => {
        ServiceRest('agent_portal/GreatSheet/listarCommunity').then((resp) => {
            setListCommunity(resp.datos);
        });
    }, []);

    const saveCommunity = () => {
        document.getElementById("formularioListing").reset();

        ServiceRest("agent_portal/GreatSheet/saveCommunity", community)
            .then((resp) => { console.log('resp', resp);
                const myNotice = alert({
                    text: "Save Community.",
                    type: 'success',
                    textTrusted: true,
                    closerHover: true,
                    modules: new Map([
                        ...defaultModules,
                    ])
                });

                ServiceRest('agent_portal/GreatSheet/listarCommunity').then((resp) => {
                    setListCommunity(resp.datos);
                });
            })
            .catch((e) => console.error(e));
    };

    const editCommunity = (e) => {
    };

    const previewCommunity = (e) => {
        ServiceRest("agent_portal/GreatSheet/previewCommunity", community)
            .then((resp) => {
                const listings = resp.data.live_modern;
                setListingPreview(listings.listing);
            })
            .catch((e) => console.error(e));
    };

    const deleteCommunity = (id_community) => {
        ServiceRest("agent_portal/GreatSheet/deleteCommunity", { id_community: id_community})
            .then((resp) => {
                const myNotice = alert({
                    text: "Delete Community.",
                    type: 'success',
                    textTrusted: true,
                    closerHover: true,
                    modules: new Map([
                        ...defaultModules,
                    ])
                });

                ServiceRest('agent_portal/GreatSheet/listarCommunity').then((resp) => {
                    setListCommunity(resp.datos);
                });

            })
            .catch((e) => console.error(e));
    };

    const loadCommunity = (e) => {
        setCommunity({...community,[e.target.name]: e.target.value});
    };

    const acceptConfiguration = async (e) => {
        if (reloadComponent == undefined || reloadComponent == false) {
            setReloadComponent(true);
        } else {
            setReloadComponent(false);
        }

        e.preventDefault();
        console.log("ACCEP CONFIGURATION!!!");
        const modal1 = document.querySelectorAll("[id]", "modalCommunity");
        console.log(modal1);
    };

    return (
        <Segment className="Community-container">
        <button
    id="BotonNewCommunity"
    className="btn btn-primary"
    data-toggle="modal"
    data-target="#modalCommunity"
    type="button">
        Add Community
    </button>
    {/**MODAL 1: Add Community**/}
<div className="modal fade" id="modalCommunity" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title">Add New Community</h5>
    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div className="modal-body">
        <form id="formularioListing" className="was-validated" validate="true">
        <div className="form-row">
        <label>Name Community</label>
    <Input name="name_community" onChange={loadCommunity}/>
    </div>
    <div className="form-row">
        <label>Parcel Number</label>
    <Input name="parcel_number" onChange={loadCommunity}/>
    </div>
    <div>
    <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={saveCommunity}>Save Community</button>
    <button
    type="button"
    className="btn btn-primary"
    id="BotonPreview"
    data-toggle="modal"
    data-target="#modalCommunityPreview"
    type="button"
    onClick={previewCommunity}
        >
        > Preview
        </button>
        </div>
        </div>
        </form>
        </div>
        </div>
        </div>
        </div>

    {/**MODAL 2: Preview**/}
<div className="modal fade listing-card-modal" id="modalCommunityPreview" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title">Community Settings Preview</h5>
    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div className="modal-body">
        <form id="formularioListing" onSubmit={acceptConfiguration} className="was-validated" validate="true">
        <div class="section card-container">
        <div class="row">
        <div class="ffd-search-listing-items">
        {
            listingPreview.map(li => (
                <div class="x-col listing property">
            <a data-fieldtype="ffdsearch_link" id="">
            <div class="img_overlay_wrap">
            <div class="after"></div>
            <div class="img-wrapper">

            {/*<div class="status Active">
                                <span>Active</span>
                    </div>*/}
            <div
            class="content"
            style={{
        "background" : `url(${li.ffd_media[0]})`,
            "backgroundSize": "cover",
            "backgroundRepeat" : "no-repeat",
            "backgroundPosition" : "center"
    }}>
</div>
    <div class="listing-overlay"></div>
        </div>
        <div class="details-wrapper">
        <span class="price">
        {li.ffd_listingprice_pb}
        </span>
        <span class="location">
        {li.ffd_address_pb}
        </span>
        <div class="stats">
        <div class="beds">
        <span class="count">{li.ffd_bedrooms_pb} bed | </span>
    </div>
    <div class="baths">
        <span class="count">{li.ffd_fullbathrooms_pb} bath | </span>
    </div>
    <div class="sqft">
        <span class="count" data-test="Condominium,1,373,">
        {li.ffd_propertytype === 'Land' ? li.ffd_lotsize_pb : li.ffd_living_sq_ft} sqft
    </span>
    </div>
    </div>
    </div>
    </div>
    </a>
    </div>
))
}
</div>
    </div>
    </div>
    <div>
    <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button
    type="button"
    /*type="submit"*/
    onClick={acceptConfiguration}
    data-dismiss="modal"
    className="btn btn-primary">
        OK
        </button>
        </div>
        </div>
        </form>
        </div>
        </div>
        </div>
        </div>
        <Segment>
        <Table celled selectable>
    <Table.Header>
    <Table.Row>
    <Table.HeaderCell>Name Community</Table.HeaderCell>
    <Table.HeaderCell>Parcel Number</Table.HeaderCell>
    <Table.HeaderCell>Actions</Table.HeaderCell>
    </Table.Row>
    </Table.Header>
    <Table.Body>
    {
        listCommunity.map(listC => (
            <Table.Row id={listC.id_community}>
        <Table.Cell>{listC.name_community}</Table.Cell>
        <Table.Cell>{listC.parcel_number}</Table.Cell>
        <Table.Cell>
        <Button icon onClick={(value) => editCommunity(listC.id_community)}><Icon name='edit' /></Button>
        <Button icon onClick={(value) => deleteCommunity(listC.id_community)}><Icon name='trash' /></Button>
        </Table.Cell>
        </Table.Row>
))
}
</Table.Body>
    </Table>
    </Segment>
    </Segment>
);
}

export default CommunitySettings;