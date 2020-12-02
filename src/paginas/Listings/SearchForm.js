import React, { useContext, useState, useEffect } from 'react';
import { Form, Field, Input, Select, Segment, Label, Radio, Checkbox, TextArea, Button, Dropdown } from 'semantic-ui-react';
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

const SearchForm = ({ data, setListing }) => {

  const valuesType = (data.ffd_property_type).split(',') || [];
  const architecturalType = (data.ffd_architectural_style).split(',') || [];

  const handleInputChanges = (e, id, value) => {
    e.preventDefault();

    if(id === 'ffd_property_type') {
      setListing({
        ...data,
        [id]: value.join(','),
      });
    } else {
      setListing({
        ...data,
        [id]: value,
      });
    }

    if(id === 'ffd_architectural_style') {
      setListing({
        ...data,
        [id]: value.join(','),
      });
    } else {
      setListing({
        ...data,
        [id]: value,
      });
    }

  };

  const saveListing = (e) => {
    ServiceRest("agent_portal/GreatSheet/setupLiveModernListing", data)
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

  const architecturalStyle = [
    {
      key: 'None',
      text: 'None',
      value: 'None'
    },
    {
      key: 'ClusterHome',
      text: 'Cluster Home',
      value: 'ClusterHome'
    },
    {
      key: 'Detached',
      text: 'Detached',
      value: 'Detached'
    },
    {
      key: 'Duplex',
      text: 'Duplex',
      value: 'Duplex'
    },
    {
      key: 'Fourplex',
      text: 'Fourplex',
      value: 'Fourplex'
    },
    {
      key: 'GardenHome',
      text: 'Garden Home',
      value: 'GardenHome'
    },
    {
      key: 'HighRise',
      text: 'High Rise',
      value: 'HighRise'
    },
    {
      key: 'ManufacturedHome',
      text: 'Manufactured Home',
      value: 'ManufacturedHome'
    },
    {
      key: 'OneStory',
      text: 'One Story',
      value: 'OneStory'
    },
    {
      key: 'Other',
      text: 'Other',
      value: 'Other'
    },
    {
      key: 'PatioHome',
      text: 'Patio Home',
      value: 'PatioHome'
    },
    {
      key: 'Penthouse',
      text: 'Penthouse',
      value: 'Penthouse'
    },
    {
      key: 'Ranch',
      text: 'Ranch',
      value: 'Ranch'
    },
    {
      key: 'SplitLevel',
      text: 'Split Level',
      value: 'SplitLevel'
    },
    {
      key: 'TriLevel',
      text: 'TriLevel',
      value: 'TriLevel'
    },
    {
      key: 'TwoStory',
      text: 'TwoStory',
      value: 'TwoStory'
    }
  ];

  const propertySubtype = [
    {
      key: 'None',
      text: 'None',
      value: 'None'
    },
    {
      key: 'BusinessOpportunity',
      text: 'Business Opportunity',
      value: 'BusinessOpportunity'
    },
    {
      key: 'CommercialLease',
      text: 'Commercial Lease',
      value: 'CommercialLease'
    },
    {
      key: 'CommercialSale',
      text: 'Commercial Sale',
      value: 'CommercialSale'
    },
    {
      key: 'Land',
      text: 'Land',
      value: 'Land'
    },
    {
      key: 'Residential',
      text: 'Residential',
      value: 'Residential'
    },
    {
      key: 'ResidentialIncome',
      text: 'Residential Income',
      value: 'ResidentialIncome'
    },
    {
      key: 'ResidentialLease',
      text: 'Residential Lease',
      value: 'ResidentialLease'
    }
  ];

  const propertyType =[
    {
      key: 'None',
      text: 'None',
      value: 'None'
    },
    {
      key: 'Apartment',
      text: 'Apartment',
      value: 'Apartment'
    },
    {
      key: 'BoatSlip',
      text: 'BoatSlip',
      value: 'BoatSlip'
    },
    {
      key: 'Business',
      text: 'Business',
      value: 'Business'
    },
    {
      key: 'Commercial',
      text: 'Commercial',
      value: 'Commercial'
    },
    {
      key: 'Condominium',
      text: 'Condominium',
      value: 'Condominium'
    },
    {
      key: 'Duplex',
      text: 'Duplex',
      value: 'Duplex'
    },
    {
      key: 'HotelMotel',
      text: 'HotelMotel',
      value: 'HotelMotel'
    },
    {
      key: 'Industrial',
      text: 'Industrial',
      value: 'Industrial'
    },
    {
      key: 'MixedUse',
      text: 'MixedUse',
      value: 'MixedUse'
    },
    {
      key: 'MobileHome',
      text: 'MobileHome',
      value: 'MobileHome'
    },
    {
      key: 'MultiFamily',
      text: 'MultiFamily',
      value: 'MultiFamily'
    },
    {
      key: 'Office',
      text: 'Office',
      value: 'Office'
    },
    {
      key: 'Other',
      text: 'Other',
      value: 'Other'
    },
    {
      key: 'Quadruplex',
      text: 'Quadruplex',
      value: 'Quadruplex'
    },
    {
      key: 'Residential',
      text: 'Residential',
      value: 'Residential'
    },
    {
      key: 'Retail',
      text: 'Retail',
      value: 'Retail'
    },
    {
      key: 'SingleFamilyResidence',
      text: 'SingleFamilyResidence',
      value: 'SingleFamilyResidence'
    },
    {
      key: 'SpecialPurpose',
      text: 'SpecialPurpose',
      value: 'SpecialPurpose'
    },
    {
      key: 'StockCooperative',
      text: 'StockCooperative',
      value: 'StockCooperative'
    },
    {
      key: 'Townhouse',
      text: 'Townhouse',
      value: 'Townhouse'
    },
    {
      key: 'Triplex',
      text: 'Triplex',
      value: 'Triplex'
    },
    {
      key: 'UnimprovedLand',
      text: 'UnimprovedLand',
      value: 'UnimprovedLand'
    },
    {
      key: 'Villa',
      text: 'Villa',
      value: 'Villa'
    },

  ];

  return (
      <Segment basic empty>
  <Form>
  <Form.Field>
  <label>
  Architectural Style
  </label>
  <Dropdown
  selection
  multiple
  placeholder = 'Select one option'
  options={architecturalStyle}
  value={architecturalType || []}

  id= "ffd_architectural_style"
  name = "ffd_architectural_style"
  onChange ={(e, { id, value }) => handleInputChanges(e, id, value)}
  />
  </Form.Field>
  <Form.Field>
  <label>
  Property Type
  </label>
  <Dropdown
  selection
  multiple
  placeholder = 'Select one option'
  options={propertyType}
  value={valuesType || []}
  id= "ffd_property_type"
  name = "ffd_property_type"
  onChange ={(e, { id, value }) => handleInputChanges(e, id, value)}
  />
  </Form.Field>
  <Form.Field>
  <label>
  List Price
  </label>
  <Input
  id= "ffd_listingprice_pb"
  name = "ffd_listingprice_pb"
  placeholder= "List Price"
  onChange ={(e, { id, value }) => handleInputChanges(e, id, value)}
  value= {data.ffd_listingprice_pb}
  />
  </Form.Field>

  <Button primary onClick={saveListing}>Save</Button>
      </Form>
      </Segment>
);
}
export default SearchForm;