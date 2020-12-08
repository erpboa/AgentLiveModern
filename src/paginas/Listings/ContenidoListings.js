import React, { useContext, useState, useEffect } from 'react';
import { Grid, Segment, Form, Input, Button, Tab, Header } from 'semantic-ui-react';
import '../../components/styles/formLogin.css';
import '../../components/styles/stylesMenu.css';
import '../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css';
import Footer from '../../components/Footer';
import "semantic-ui-css/semantic.min.css";
import { ReloadComponent } from '../../contexts/ReloadComponent';
import {ServiceRest} from "../../services/ServiceRest";
import PropertySettings from './PropertySettings';
import ListingSettings from './ListingSettings';
import CommunitySettings from './CommunitySettings';

const ContenidoListings = (props) => {

  const { reloadComponent, setReloadComponent } = useContext(ReloadComponent);

  const [masterSearch, setMasterSearch] = useState({});
  const [namesC, setNameC] = useState([]);

  const [dataListing, setListing] = useState({
    ffd_architectural_style : "",
    ffd_property_type: "",
    ffd_listingprice_pb : "",
    ffd_listings: ""
  });

  const loadMasterSearch = async () => {
    var params = { start: 0, limit: 50 };
    ServiceRest('agent_portal/GreatSheet/getMasterSearch',params).then((response) => {

      setMasterSearch(response.data.ap_master_search);
      setListing({
        ffd_architectural_style : response.data.ap_master_search.ffd_architectural_style,
        ffd_property_type: response.data.ap_master_search.ffd_property_type,
        ffd_listingprice_pb : response.data.ap_master_search.ffd_listingprice_pb,
        ffd_listings : response.data.ap_master_search.ffd_listings
      });
      console.log('ap_master_search', response.data.ap_master_search);
    });
  };

  /*const loadNameCommunities = async () => {
    ServiceRest('agent_portal/GreatSheet/getCommunities').then((response) => {
      console.log("COMMUNITY> ", response);
      const communities = JSON.parse(response.data.live_modern);
      setNameC(communities.communities);

    });
  };*/

  useEffect(() => {
    loadMasterSearch();
    //loadNameCommunities()
  }, []);

  const listingPanes = [
    {
      menuItem: 'Properties',
      render: () => <Tab.Pane>
    <PropertySettings data={dataListing} setListing={setListing}/>
    </Tab.Pane>
},
  {
    menuItem: 'Listings',
        render: () => <Tab.Pane>
  <ListingSettings data={dataListing} setListing={setListing}/>
  </Tab.Pane>
  },
  {
    menuItem: 'Communities',
        render: () => <Tab.Pane>
  <CommunitySettings data={dataListing} setListing={setListing}/>
  </Tab.Pane>
  }
];

  return (
      <Segment basic className="master-search-container">
  <Header as="h2">Master Search Settings</Header>
  <Tab panes={listingPanes}/>
  </Segment>
);
}
export default ContenidoListings;
