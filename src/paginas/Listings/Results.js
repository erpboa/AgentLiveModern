import React, { useState } from 'react';
import '../../components/styles/formLogin.css';
import '../../components/styles/stylesMenu.css';
import '../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css';

import { Input, Button, Header } from 'semantic-ui-react';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

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
defaultModules.set(PNotifyBootstrap4, {});
defaultModules.set(PNotifyFontAwesome5, {});
defaultModules.set(PNotifyMobile, {});
/*****************************************/

const Results = ({ data, setListing }) => {

    /*const [count, setCount] = useState(0);
    const handleClick = () => {
      setCount(count + 1);
    };*/

    const [fileData, setfileData] = useState({ rows: "", cols: ""});
    const [ fileInfo, setFileInfo ] = useState("");

    const ffd_listings = (data.ffd_listings).split(',') || [];

    const fileHandler = async (e) => {
        let fileObj = e.target.files[0];

        e.preventDefault();

        if (e.target.files.length > 0) {
            try {
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onload = async function (e) {
                    let data = new Uint8Array(e.target.result);

                    let workbook = XLSX.read(data, { type: "array" });

                    let worksheet = workbook.Sheets[workbook.SheetNames[0]];

                    let sheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });


                    setFileInfo(sheet.join(','));

                    console.log("sheet",fileInfo);
                }.bind(this);
                reader.readAsArrayBuffer(file);
            } catch (exception) {
                console.log(exception);
            }
        }

        ExcelRenderer(fileObj,(err,resp) => {
            if(err) {
                console.log(err);
            } else {
                setfileData(
                    {
                        cols: resp.cols,
                        rows: resp.rows
                    }
                );
            }
        });
    };

    const saveFile = (e) => {

        e.preventDefault();
        setListing({
            ...data,
            ffd_listings : fileInfo,
        });
        console.log("SAVEFILE DATE",data);
        ServiceRest("agent_portal/GreatSheet/setupLiveModernListing", data)
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

    return (
    <div>
    {/*<div>
          <p>Clicks: {count}</p>
          <button onClick={handleClick}>Clickeame</button>
       </div>*/}
    <div>
    <Header as="H3">Add Listing IDs</Header>
    <p>Select Excel File: </p>
    <Input
    required
    type = "file"
    name = "listingIDsFile"
    className="form-control input-file"
    onChange={(e) => {
        e.preventDefault();
        fileHandler(e)
    }
}
>
</Input>
    </div>
    <div class="container-excel-table">
        { fileData.rows && <OutTable data={fileData.rows} columns={fileData.cols} tableClassName="custom-table table table-bordered" tableHeaderRowClass="heading"></OutTable>}
    { ffd_listings && fileData.rows === '' &&
    <table class="table table-bordered">
        <thead>
        <tr>
        <th>A</th>
        </tr>
        </thead>
        <tbody>
        { ffd_listings.map(lId => (
                <tr>
                <th scope="row">{lId}</th>
            </tr>
    ))
    }
    </tbody>
    </table> }
    </div>
    <div>
    { fileData.rows && <Button primary onClick={saveFile}>Save Listing IDs</Button>}
            </div>
            </div>
    );
}
export default Results;