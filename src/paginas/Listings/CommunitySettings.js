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

import CommunityForm from './CommunityForm';


defaultModules.set(PNotifyBootstrap4, {});
defaultModules.set(PNotifyFontAwesome5, {});
defaultModules.set(PNotifyMobile, {});
/*****************************************/

const CommunitySettings = () => {

    const {reloadComponent, setReloadComponent} = useContext(ReloadComponent);

    const [masterSearch, setMasterSearch] = useState({
        ffd_architectural_style : "",
        ffd_property_type: "",
        ffd_listingprice_pb : "",
        ffd_yearbuilt : "",
        ffd_listings: "",
        ffd_community: []
    });


    const [ editItem, setEditItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const [arrayCommunity, setArrayCommunity] = useState([]);
    const [tableCommunity, setTableCommunity] = useState([]);
    const [listingPreview, setListingPreview] = useState([]);


    const loadMasterSearch = async () => {
        var params = { start: 0, limit: 50 };
        ServiceRest('agent_portal/GreatSheet/getMasterSearch',params).then((response) => {
            setMasterSearch({
                ffd_architectural_style : response.data.ap_master_search.ffd_architectural_style,
                ffd_property_type: response.data.ap_master_search.ffd_property_type,
                ffd_listingprice_pb : response.data.ap_master_search.ffd_listingprice_pb,
                ffd_yearbuilt : response.data.ap_master_search.ffd_yearbuilt_pb,
                ffd_listings: response.data.ap_master_search.ffd_listings,
                ffd_community: response.data.ap_master_search.ffd_community
            });
        });
    };

    useEffect(() => {
        var params = { start: 0, limit: 50 };
        ServiceRest('agent_portal/GreatSheet/getMasterSearch',params).then((response) => {
            setArrayCommunity(response.data.ap_master_search.ffd_community);
            setMasterSearch({
                ffd_architectural_style : response.data.ap_master_search.ffd_architectural_style,
                ffd_property_type: response.data.ap_master_search.ffd_property_type,
                ffd_listingprice_pb : response.data.ap_master_search.ffd_listingprice_pb,
                ffd_listings: response.data.ap_master_search.ffd_listings,
                ffd_community: response.data.ap_master_search.ffd_community
            });
        });

    }, []);

    const editCommunity = (c) => {
        setEditItem(true);
        setSelectedItem(c);
    };

    const updateCommunity = (listCommunity, c) => {
        const inputNameComunity = document.getElementById("communityName");
        const inputParcelNumber = document.getElementById("parcelNumber");
        const newNameCommunity = inputNameComunity.value;
        const newParcelNumber = inputParcelNumber.value;
        (listCommunity[listCommunity.indexOf(c)]).name_community = newNameCommunity;
        (listCommunity[listCommunity.indexOf(c)]).parcel_number = newParcelNumber;

        const params = {
            ...masterSearch,
            ffd_community: JSON.stringify(listCommunity)
        }

        ServiceRest("agent_portal/GreatSheet/setupLiveModernListing", params)
            .then((resp) => {
                const myNotice = alert({
                    text: "Update Community Successfully.",
                    type: 'success',
                    textTrusted: true,
                    closerHover: true,
                    modules: new Map([
                        ...defaultModules,
                    ])
                });

                setEditItem(false);
                setSelectedItem("");
                const newCommunities = JSON.parse(resp.data.live_modern);
                setMasterSearch({...masterSearch, ffd_community: newCommunities });

            })
            .catch((e) => {
                const myNotice = alert({
                    text: "Error update Community.",
                    type: 'failed',
                    textTrusted: true,
                    closerHover: true,
                    modules: new Map([
                        ...defaultModules,
                    ])
                });
                setEditItem(false);
                setSelectedItem("");
            });
    };

    const createCommunity = async (comunity) => {

        setArrayCommunity([ ...arrayCommunity, comunity ]);

        const newArrayCommunity = [
            ...arrayCommunity, comunity
        ];
        setMasterSearch({
            ...masterSearch,
            ffd_community : newArrayCommunity
        });

        const params = {
            ...masterSearch,
            ffd_community: JSON.stringify(newArrayCommunity)
        };

        setTableCommunity(masterSearch.ffd_community);
        ServiceRest("agent_portal/GreatSheet/setupLiveModernListing", params)
            .then((resp) => { console.log("resp", resp);
                const myNotice = alert({
                    text: "Save Community Successfully.",
                    type: 'success',
                    textTrusted: true,
                    closerHover: true,
                    modules: new Map([
                        ...defaultModules,
                    ])
                });

            })
            .catch((e) => {
                const myNotice = alert({
                    text: "Error Save Community.",
                    type: 'failed',
                    textTrusted: true,
                    closerHover: true,
                    modules: new Map([
                        ...defaultModules,
                    ])
                });
            });
    };

    const deleteCommunity = (listCommunity, c) => {

        setSelectedItem(c);
        const itemPosition = listCommunity.indexOf(c);
        listCommunity.splice(itemPosition, 1);

        const params = {
            ...masterSearch,
            ffd_community: JSON.stringify(listCommunity)
        }


        ServiceRest("agent_portal/GreatSheet/setupLiveModernListing", params)
            .then((resp) => { console.log('resp', resp);
                const myNotice = alert({
                    text: "Delete Listing ID Successfully",
                    type: 'success',
                    textTrusted: true,
                    closerHover: true,
                    modules: new Map([
                        ...defaultModules,
                    ])
                });
                setSelectedItem("");
                const newCommunities = JSON.parse(resp.data.live_modern);
                setMasterSearch({...masterSearch, ffd_community: newCommunities.ffd_community });
            })
            .catch((e) => {
                console.error(e)
                const myNotice = alert({
                    text: "Error in delete listing ID.",
                    type: 'failed',
                    textTrusted: true,
                    closerHover: true,
                    modules: new Map([
                        ...defaultModules,
                    ])
                });
                setSelectedItem("");
            });
    };


    const acceptConfiguration = async (e) => {
        if (reloadComponent == undefined || reloadComponent == false) {
            setReloadComponent(true);
        } else {
            setReloadComponent(false);
        }
        e.preventDefault();
        const modal1 = document.querySelectorAll("[id]", "modalCommunity");
        console.log(modal1);
    };

    const showFormSegement = e => {
        if (showForm)
            setShowForm(false);
        else
            setShowForm(true);
    };

    return (
        <Segment className="Community-container">

            {/**MODAL 1: Add Community**/}
            <Segment basic empty className="form-container">
                <CommunityForm createCommunity = {createCommunity}/>
            </Segment>
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
                            arrayCommunity.map(listC => (
                                <Table.Row>
                                    <Table.Cell>{editItem && selectedItem === listC ? <Input  required name = "communityName" id= "communityName" defaultValue={listC.name_community}/> : listC.name_community}</Table.Cell>
                                    <Table.Cell>{editItem && selectedItem === listC ? <Input  required name = "parcelNumber" id= "parcelNumber" defaultValue={listC.parcel_number}/> : listC.parcel_number}</Table.Cell>
                                    <Table.Cell>
                                        <Button icon onClick={(value) => editCommunity(listC)}><Icon name='edit' /></Button>
                                        <Button icon onClick={(value) => deleteCommunity(arrayCommunity,listC)}><Icon name='trash' /></Button>
                                        { editItem && selectedItem === listC ? <Button icon onClick={() => updateCommunity(arrayCommunity,listC)}><Icon name='check' /></Button> : null }
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
