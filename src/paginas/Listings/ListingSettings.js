import React, { useState, useEffect } from 'react';
import '../../components/styles/formLogin.css';
import '../../components/styles/stylesMenu.css';
import '../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css';

import { Input, Button, Header, Icon } from 'semantic-ui-react';

import * as XLSX from 'xlsx';
import {ServiceRest} from "../../services/ServiceRest";

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
import { useContext } from 'react';
import { ReloadComponent } from '../../contexts/ReloadComponent';
defaultModules.set(PNotifyBootstrap4, {});
defaultModules.set(PNotifyFontAwesome5, {});
defaultModules.set(PNotifyMobile, {});
/*****************************************/

const ListingSettings = () => {

    const { reloadComponent, setReloadComponent } = useContext(ReloadComponent);

    const [masterSearch, setMasterSearch] = useState({
        ffd_architectural_style : "",
        ffd_property_type: "",
        ffd_listingprice_pb : "",
        ffd_listings: "",
        ffd_community: []
    });

    const [ editItem, setEditItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState("");

    const ffd_listings = (masterSearch.ffd_listings).split(',') || [];
    console.log("ffd_listings0", ffd_listings);

    const loadMasterSearch = async () => {
        var params = { start: 0, limit: 50 };
        ServiceRest('agent_portal/GreatSheet/getMasterSearch',params).then((response) => {
            setMasterSearch({
                ffd_architectural_style : response.data.ap_master_search.ffd_architectural_style,
                ffd_property_type: response.data.ap_master_search.ffd_property_type,
                ffd_listingprice_pb : response.data.ap_master_search.ffd_listingprice_pb,
                ffd_listings: response.data.ap_master_search.ffd_listings,
                ffd_community: response.data.ap_master_search.ffd_community
            });
        });
    };


    console.log('SETMASTERSEARCH>>>PROPERTY', masterSearch);

    useEffect(() => {
        loadMasterSearch();
    }, []);

    const saveFile = async (e) => {


        const fileUpload = document.getElementById("fileUpload");

        let file = fileUpload.files[0];
        let reader = new FileReader();

        reader.onload = function (e) {
            let fileData = new Uint8Array(e.target.result);

            let workbook = XLSX.read(fileData, { type: "array" });

            let worksheet = workbook.Sheets[workbook.SheetNames[0]];

            let sheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const params = {
                ...masterSearch,
                ffd_listings : sheet.join(','),
                ffd_community: JSON.stringify(masterSearch.ffd_community)
            };

            console.log('params',params);
            ServiceRest("agent_portal/GreatSheet/setupLiveModernListing", params)
                .then((resp) => { console.log('resp', resp);
                    const myNotice = alert({
                        text: "Upload File Successfully",
                        type: 'success',
                        textTrusted: true,
                        closerHover: true,
                        modules: new Map([
                            ...defaultModules,
                        ])
                    });
                    const newListingIds = JSON.parse(resp.data.live_modern);
                    console.log("newListingIds", newListingIds);
                    setMasterSearch({...masterSearch, ffd_listings: newListingIds.ffd_listings});
                    console.log("saveFile, setLsiting mastersearch",masterSearch);
                })
                .catch((e) => {
                    console.error(e)
                    const myNotice = alert({
                        text: "Error in the file",
                        type: 'failed',
                        textTrusted: true,
                        closerHover: true,
                        modules: new Map([
                            ...defaultModules,
                        ])
                    });
                });
        };
        reader.readAsArrayBuffer(file);
    };

    const editListingId = (l) => {
        setEditItem(true);
        setSelectedItem(l);
    };
    const deleteListingId = async (list, l) => {

        if (reloadComponent == undefined || reloadComponent == false) {
            setReloadComponent(true);
        } else {
            setReloadComponent(false);
        }
        //e.preventDefault();

        setSelectedItem(l);
        const itemPosition = list.indexOf(l);
        list.splice(itemPosition, 1);

        const params = {
            ...masterSearch, ffd_listings : list.join(','),
            ffd_community: JSON.stringify(masterSearch.ffd_community)
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
                const newListingIds = JSON.parse(resp.data.live_modern);
                setMasterSearch({...masterSearch, ffd_listings: newListingIds.ffd_listings });
                console.log("deleteListingId, setLsiting mastersearch",masterSearch);
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

    const updateListing = async (list, l) => {

        if (reloadComponent == undefined || reloadComponent == false) {
            setReloadComponent(true);
        } else {
            setReloadComponent(false);
        }

        const input = document.getElementById("listingId");
        const newListingId = input.value;
        list[list.indexOf(l)] = newListingId;

        const params = {
            ...masterSearch, ffd_listings : list.join(','),
            ffd_community: JSON.stringify(masterSearch.ffd_community)
        }

        ServiceRest("agent_portal/GreatSheet/setupLiveModernListing", params)
            .then((resp) => { console.log('resp', resp);
                const myNotice = alert({
                    text: "Update File Successfully",
                    type: 'success',
                    textTrusted: true,
                    closerHover: true,
                    modules: new Map([
                        ...defaultModules,
                    ])
                });
                setEditItem(false);
                setSelectedItem("");
                const newListingIds = JSON.parse(resp.data.live_modern);
                setMasterSearch({...masterSearch, ffd_listings: newListingIds.ffd_listings });

                console.log("updateListingId, setLsiting mastersearch",masterSearch);
            })
            .catch((e) => {
                console.error(e)
                const myNotice = alert({
                    text: "Error in update the file.",
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

    return (
        <div className= "listingID-conteiner">
            <div className="form-row">
                <Header as="h3">Add Listing IDs</Header>
                <p>Select Excel File: </p>
                <Input
                    required
                    type = "file"
                    name = "listingIDsFile"
                    id= "fileUpload"
                >
                </Input>
                <Button primary id="upload" onClick={saveFile}>Save Listing IDs</Button>
            </div>

            <div className="container-excel-table">
                { ffd_listings != "" &&
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Listing IDs</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { ffd_listings.map(f => (
                        <tr key={f}>
                            <td scope="row">{ editItem && selectedItem === f ? <Input  required name = "listingId" id= "listingId" defaultValue={f}/> : f }</td>
                            <td scope="row">
                                <Button icon onClick={() => editListingId(f)}><Icon name='edit' /></Button>
                                <Button icon onClick={() => deleteListingId(ffd_listings, f)}><Icon name='trash' /></Button>
                                { editItem && selectedItem === f ? <Button icon onClick={() => updateListing(ffd_listings, f)}><Icon name='check' /></Button> : null }
                            </td>
                        </tr>
                    ))
                    }
                    </tbody>
                </table>
                }
            </div>
        </div>
    );
}
export default ListingSettings;
