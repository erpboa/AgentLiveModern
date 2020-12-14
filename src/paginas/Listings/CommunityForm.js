import React, { Fragment, useState, useContext } from 'react';
import { Dimmer, Loader, Form, Field, Input, Select, Segment, Label, Radio, Checkbox, TextArea, Button, Dropdown, Modal, Icon, Card, Image, Table, Header, Content, Description, Actions } from 'semantic-ui-react';
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

//import uuid from 'uuid/v4';
//import PropTypes from 'prop-types';
//import { makeStyles } from '@material-ui/core/styles';

/*function getModalStyle() {
    const top = 50 ;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));*/

const CommunityForm = ({createCommunity}) => {

    // Crear State de Citas
    const [community, setCommunity] = useState({
        name_community: "",
        parcel_number: ""
    });

    const [open, setOpen] = useState(false);

    const [ error, actualizarError ] = useState(false);

    const [showModal, setShowModal] = useState(false);

    // Función que se ejecuta cada que el usuario escribe en un input
    const updateState = e => {
        setCommunity({
            ...community,
            [e.target.name]: e.target.value
        })
    }


    // Extract the values
    const { name_community, parcel_number } = community;

    const [listingPreview, setListingPreview] = useState([]);
    const {reloadComponent, setReloadComponent} = useContext(ReloadComponent);
    const [loadPreview, setLoadPreview] = useState(false);

    // When user presses add community
    const submitCommunity = e => {
        e.preventDefault();

        // Validate
        if(name_community.trim() === '' || parcel_number.trim() === ''){
            actualizarError(true);
            return;
        }
        // Delete previous message
        actualizarError(false);

        // Create community
        createCommunity(community);

        // Restart the form
        setCommunity({
            name_community: '',
            parcel_number: ''
        });

    }

    const handleOpen = () => { console.log('handleOpen');
        setOpen(true);
    }
    const handleClose = () => { console.log('handleClose');
        setOpen(false);
    }

    const previewCommunity = (e) => {
        setLoadPreview(true);
        setListingPreview([]);
        /******************************** VALIDAR *******************************/
        if(name_community.trim() === '' || parcel_number.trim() === ''){
            actualizarError(true);
            return;
        }
        actualizarError(false);
        /******************************** VALIDAR *******************************/
        ServiceRest("agent_portal/GreatSheet/previewCommunity", community)
            .then((resp) => {
                setLoadPreview(false);
                const listings = resp.data.live_modern;
                setListingPreview(listings.listing);
            })
            .catch((e) => console.error(e));
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
        <Fragment>
            {error ? <div className="ui red message">Required fields.</div> : null }
            <Form id="form-community" className="ui form" onSubmit={submitCommunity}>
                <Form.Field>
                    <label>Name Community</label>
                    <input type="text" id="name_community" name="name_community" placeholder="Name Community" onChange={updateState} value={name_community}/>
                </Form.Field>
                <Form.Field>
                    <label>Parcel Number</label>
                    <input type="text" id="parcel_number" name="parcel_number" placeholder="Parcel Number" onChange={updateState} value={parcel_number}/>
                </Form.Field>
                <button type="button" className="btn btn-primary" type="submit">Save Community</button>
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
            </Form>

            {/************************************************ preview ************************************************************/}
            <div className="modal fade listing-card-modal" id="modalCommunityPreview" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Community Settings Preview</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form id="formularioListing" onSubmit={acceptConfiguration} className="was-validated"
                                  validate="true">
                                <div className="section card-container">
                                    <div className="row">
                                        <div className="ffd-search-listing-items">
                                            {loadPreview ? <Segment>
                                                    <Dimmer active inverted>
                                                        <Loader size='large'>Loading</Loader>
                                                    </Dimmer>

                                                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                                                </Segment>:
                                            null}
                                            {
                                                listingPreview.map(li => (
                                                    <div className="x-col listing property">
                                                        <a data-fieldtype="ffdsearch_link" id="">
                                                            <div className="img_overlay_wrap">
                                                                <div className="after"></div>
                                                                <div className="img-wrapper">
                                                                    <div
                                                                        className="content"
                                                                        style={{
                                                                            "background": `url(${li.ffd_media[0]})`,
                                                                            "backgroundSize": "cover",
                                                                            "backgroundRepeat": "no-repeat",
                                                                            "backgroundPosition": "center"
                                                                        }}>
                                                                    </div>
                                                                    <div className="listing-overlay"></div>
                                                                </div>
                                                                <div className="details-wrapper">
                                                                    <span className="price">
                                                                        {li.ffd_listingprice_pb}
                                                                    </span>
                                                                    <span className="location">
                                                                        {li.ffd_address_pb}
                                                                    </span>
                                                                    <div className="stats">
                                                                        <div className="beds">
                                                                            <span className="count">{li.ffd_bedrooms_pb} bed | </span>
                                                                        </div>
                                                                        <div className="baths">
                                                                        <span
                                                                            className="count">{li.ffd_fullbathrooms_pb} bath | </span>
                                                                        </div>
                                                                        <div className="sqft">
                                                                        <span className="count" data-test="Condominium,1,373,">
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
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel
                                        </button>
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
            {/************************************************ preview ************************************************************/}
            {/*
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2>Informacion Drink</h2>
                    <h3 className="mt-4">Instrucciones</h3>
                    <p>
                        Instrucciones Drink
                    </p>

                    <img className="img-fluid my-4" src='https://react.semantic-ui.com/images/wireframe/image-square.png' />

                    <h3>Ingredientes y cantidades</h3>
                    <ul>
                        Ingrediente y Canditatdes
                    </ul>
                </div>
            </Modal>*/}

        </Fragment>


    );
}
export default CommunityForm;
