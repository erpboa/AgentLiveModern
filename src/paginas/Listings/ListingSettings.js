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

const ListingSettings = ({ data, setListing }) => {

    //const [items, setItems] = useState([]);

    const [fileData, setfileData] = useState({ rows: "", cols: ""});
    const [ fileInfo, setFileInfo ] = useState("");

    console.log("RESULTS DATA",data);

    const ffd_listings = (data.ffd_listings).split(',') || [];

    const fileHandler = (e) => {
        let fileObj = e.target.files[0];
        console.log("e.target.files[0]", e.target.files[0]);
        e.stopPropagation();

        if (e.target.files.length > 0) {
            try {
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onload = function (e) {
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
            console.log("RESP:", resp);
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
        console.log("FILEDATA", fileData);
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

    /*const readExcel = (file) => {
      const promise = new Promise((resolve, reject)=> {
        const fileReader = new FileReader();

        fileReader.readAsArrayBuffer(file);

        fileReader.onload = (e) => {
          const bufferArray = e.target.result;

          const wb = XLSX.read(bufferArray, { type: 'buffer'});

          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);

          resolve(data);
        };
      });

      promise.then((d)=> {
        setItems(d);
      });
    };*/

    return (
        <div class="listingID-conteiner">
    <div>
    <Header as="H3">Add Listing IDs</Header>
    <p>Select Excel File: </p>
    <Input
    required
    type = "file"
    name = "listingIDsFile"
    onChange={fileHandler}
        >
        </Input>
        </div>
        <div class="container-excel-table">
        <p>File Preview:</p>
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
            /*<div>
              <input type="file" onChange={(e) => {
                const file= e.target.files[0];
                readExcel(file);
              }}/>

                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>Listing IDs</th>
                      </tr>
                    </thead>
                    <tbody>
                      { items.map(i => (
                          <tr>
                            <th scope="row">{i}</th>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
            </div>*/
        );
}
export default ListingSettings;
