import React, { useContext, useState, useEffect } from 'react';
import { Grid, Segment, Form, Input, Button } from 'semantic-ui-react';
import '../../components/styles/formLogin.css';
import '../../components/styles/stylesMenu.css';
import '../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css';
import Footer from '../../components/Footer';
import SearchForm from './SearchForm';
import Results from './Results';
import "semantic-ui-css/semantic.min.css";
import { ReloadComponent } from '../../contexts/ReloadComponent';
import {ServiceRest} from "../../services/ServiceRest";

const ContenidoListings = (props) => {

  const { reloadComponent, setReloadComponent } = useContext(ReloadComponent);

  const [masterSearch, setMasterSearch] = useState({});

  
  const [dataListing, setListing] = useState({
    ffd_architectural_style : "",
    ffd_property_subtype : "",
    ffd_property_type: "",
    ffd_listingprice_pb : ""
  });

  const loadMasterSearch = async () => {
    var params = { start: 0, limit: 50 };
    ServiceRest('agent_portal/GreatSheet/getMasterSearch',params).then((response) => {

      setMasterSearch(response.data.ap_master_search);
      setListing({
        ffd_architectural_style : response.data.ap_master_search.ffd_architectural_style,
        ffd_property_subtype : response.data.ap_master_search.ffd_property_subtype,
        ffd_property_type: response.data.ap_master_search.ffd_property_type,
        ffd_listingprice_pb : response.data.ap_master_search.ffd_listingprice_pb
      });

      console.log('masterSearxh',masterSearch, 'ap_master_search', response.data.ap_master_search);
    });
  };


  useEffect(() => {
    loadMasterSearch();
  }, []);

  return (
    <Segment basic>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={6}>
            <SearchForm data={dataListing} setListing={setListing}/>
          </Grid.Column>
          <Grid.Column width={10}>
            <Results />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
export default ContenidoListings;
