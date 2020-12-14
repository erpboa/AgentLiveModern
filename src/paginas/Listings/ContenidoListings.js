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

  const listingPanes = [
    {
      menuItem: 'Properties',
      render: () => <Tab.Pane>
        <PropertySettings/>
      </Tab.Pane>
    },
    {
      menuItem: 'Listings',
      render: () => <Tab.Pane>
        <ListingSettings/>
      </Tab.Pane>
    },
    {
      menuItem: 'Communities',
      render: () => <Tab.Pane>
        <CommunitySettings/>
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
