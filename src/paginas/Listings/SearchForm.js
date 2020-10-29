import React, { useContext, useState } from 'react';
import { Form, Field, Input, Select, Segment, Label, Radio, Checkbox, TextArea, Button, Message } from 'semantic-ui-react';
import '../../components/styles/formLogin.css';
import '../../components/styles/stylesMenu.css';
import '../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css';
import Footer from '../../components/Footer';
import "semantic-ui-css/semantic.min.css";
import { ReloadComponent } from '../../contexts/ReloadComponent';
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

const SearchForm = ({ searchData, handleInputChange, searchListing }) => {  
  console.log(handleInputChange);

  const [dataListing, setListing] = useState({
    architectural_style : "",
    property_subtype : "",
    property_type: "",
    list_price : ""

  });

  const [message, setMessage] = useState(false);

  const handleInputChanges = (e) => {
    setListing({
      ...dataListing,
      [e.target.name]: e.target.value,
    });
  };

  const saveListing = (e) => {
    ServiceRest("agent_portal/GreatSheet/setupLiveModernListing", dataListing)
        .then((resp) => { console.log('resp', resp);
          const myNotice = alert({
            text: "Master search successfully saved.",
            type: 'success',
            textTrusted: true,
            closerHover: true,
            modules: new Map([
              ...defaultModules,
            ])
          });
        })
        .catch((e) => console.error(e));
  }

  return (
    <Segment basic empty>
      <Form>
        <Form.Field>
          <label>
          Architectural Style
          </label>
          <select id= "ffd_architectural_style"
                  name = "ffd_architectural_style"
                  class="ui search dropdown"
                  onChange ={handleInputChanges}>
            <option value="None">None</option>
            <option value="ClusterHome">Cluster Home</option>
            <option value="Detached">Detached</option>
            <option value="Duplex">Duplex</option>
            <option value="Fourplex">Fourplex</option>
            <option value="GardenHome">Garden Home</option>
            <option value="HighRise">High Rise</option>
            <option value="ManufacturedHome">Manufactured Home</option>
            <option value="OneStory">One Story</option>
            <option value="Other">Other</option>
            <option value="PatioHome">Patio Home</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Ranch">Ranch</option>
            <option value="SplitLevel">Split Level</option>
            <option value="TriLevel">TriLevel</option>
            <option value="TwoStory">TwoStory</option>
          </select>
        </Form.Field>
        <Form.Field>
          <label>
          Property SubType
          </label>
          <select class="ui search dropdown"
                  id= "property_subtype"
                  name="property_subtype"
                  onChange ={handleInputChanges}>
            <option value="None">None</option>
            <option value="BusinessOpportunity">BusinessOpportunity</option>
            <option value="CommercialLease">CommercialLease</option>
            <option value="CommercialSale">CommercialSale</option>
            <option value="Land">Land</option>
            <option value="Residential">Residential</option>
            <option value="ResidentialIncome">ResidentialIncome</option>
            <option value="ResidentialLease">ResidentialLease</option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </Form.Field>
        <Form.Field>
          <label>
          Property Type
          </label>
          <select class="ui search dropdown"
                  id= "property_type"
                  name = "property_type"
                  onChange ={handleInputChanges}>
            <option value="None">None</option>
            <option value="Apartment">Apartment</option>
            <option value="BoatSlip">BoatSlip</option>
            <option value="Business">Business</option>
            <option value="Commercial">Commercial</option>
            <option value="Condominium">Condominium</option>
            <option value="Duplex">Duplex</option>
            <option value="HotelMotel">HotelMotel</option>
            <option value="Industrial">Industrial</option>
            <option value="MixedUse">MixedUse</option>
            <option value="MobileHome">MobileHome</option>
            <option value="MultiFamily">MultiFamily</option>
            <option value="Office">Office</option>
            <option value="Other">Other</option>
            <option value="Quadruplex">Quadruplex</option>
            <option value="Residential">Residential</option>
            <option value="Retail">Retail</option>
            <option value="SingleFamilyResidence">SingleFamilyResidence</option>
            <option value="SpecialPurpose">SpecialPurpose</option>
            <option value="StockCooperative">StockCooperative</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Triplex">Triplex</option>
            <option value="UnimprovedLand">UnimprovedLand</option>
            <option value="Villa">Villa</option>
          </select>

        </Form.Field>

        <Form.Field>
          <label>
          List Price
          </label>
          <Input
            id= "ffd_listingprice_pb"
            name = "ffd_listingprice_pb"
            placeholder= "List Price"
            onChange ={handleInputChanges}
            //value= {searchData.data3}
          />
          
        </Form.Field>

         <Button primary onClick={saveListing}>Save</Button>
      </Form>
    </Segment>
  );
}
export default SearchForm;
