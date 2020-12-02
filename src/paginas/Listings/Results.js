import React, { useState } from 'react';
import '../../components/styles/formLogin.css';
import '../../components/styles/stylesMenu.css';
import '../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css';

import { Input, Button, Header } from 'semantic-ui-react';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

const Results = ({}) => {

  const [fileData, setfileData] = useState({ rows: "", cols: ""});
  const [ items, setItems ] = useState();

  const fileHandler = (e) => {
    let fileObj = e.target.files[0];

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
  }

  return (
  <div>
  <div>
  <Header as="H3">Add Listing IDs</Header>
  <p>Select Excel File: </p>
  <Input
  required
  type = "file"
  name = "listingIDsFile"
  className="form-control input-file"
  onChange={fileHandler}
      >
      </Input>
      </div>
      <div class="container-excel-table">
      { fileData.rows && <OutTable data={fileData.rows} columns={fileData.cols} tableClassName="custom-table table table-bordered" tableHeaderRowClass="heading"></OutTable>}
        </div>
        <div>
        { fileData.rows && <Button primary>Save Listing IDs</Button>}
            </div>
            </div>
);
}
export default Results;
