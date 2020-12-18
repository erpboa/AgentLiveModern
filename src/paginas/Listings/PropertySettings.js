import React, { useContext, useState, useEffect } from 'react';
import { Form, Field, Input, Select, Segment, Label, Radio, Checkbox, TextArea, Button, Dropdown } from 'semantic-ui-react';
import '../../components/styles/formLogin.css';
import '../../components/styles/stylesMenu.css';
import '../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css';
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

const PropertySettings = () => {

  const { reloadComponent, setReloadComponent } = useContext(ReloadComponent);

  const [masterSearch, setMasterSearch] = useState({
    ffd_architectural_style : "",
    ffd_property_type: "",
    ffd_listingprice_pb : "",
    ffd_yearbuilt : "",
    ffd_listings: "",
    ffd_community: []
  });

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

  console.log('SETMASTERSEARCH>>>PROPERTY', masterSearch);

  useEffect(() => {
    loadMasterSearch();
  }, []);

  const valuesType = (masterSearch.ffd_property_type).split(',') || [];
  const architecturalType = (masterSearch.ffd_architectural_style).split(',') || [];

  const handleInputChanges = async (e, id, value) => {
    e.preventDefault();

    if(id === 'ffd_property_type' || id === 'ffd_architectural_style') {
      setMasterSearch({
        ...masterSearch,
        [id]: value.join(','),
      });
    } else {
      setMasterSearch({
        ...masterSearch,
        [id]: value,
      });
    }
  };

  const saveListing = async (e) => {
    const params = {
      ...masterSearch,
      ffd_community: JSON.stringify(masterSearch.ffd_community)
    };

    setMasterSearch({
      ...masterSearch,
      ffd_community : masterSearch.ffd_community
    })

    console.log("masterSearch>>before save", masterSearch);
    ServiceRest("agent_portal/GreatSheet/setupLiveModernListing", params)
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

  console.log("saveFile, setLsiting data",masterSearch);

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
    }
  ];

  return (
      <Segment basic empty className="form-container">
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
              Year Built
            </label>
            <Input
                id= "ffd_yearbuilt"
                name = "ffd_yearbuilt"
                onChange ={(e, { id, value }) => handleInputChanges(e, id, value)}
                value= {masterSearch.ffd_yearbuilt}
            />
          </Form.Field>
          <Form.Field>
            <label>
              Min. Price
            </label>
            <Input
                id= "ffd_listingprice_pb"
                name = "ffd_listingprice_pb"
                placeholder= "List Price"
                onChange ={(e, { id, value }) => handleInputChanges(e, id, value)}
                value= {masterSearch.ffd_listingprice_pb}
            />
          </Form.Field>

          <Button primary onClick={saveListing}>Save</Button>
        </Form>
      </Segment>
  );
}
export default PropertySettings;
