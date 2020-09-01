import React, { useContext, useState } from 'react';
import { Tab, Icon, Menu, span, Input, Segment } from 'semantic-ui-react';
import AllActivityList from "./AllActivityList";
import CallList from "./CallList";
import TextList from "./TextList";
import EmailList from "./EmailList";
import PropertyList from "./PropertyList";
import NoteList from "./NoteList";
import { PropertyContext } from '../contexts/PropertyContext';


const ActivitiesContainer = (props) => {

  const [ searchValue, saveSearchValue] = useState('');

  const { searchProperties, saveQuery } = useContext(PropertyContext );

  
  const getPropertySearch = e => {
    saveSearchValue(e.target.value)
  }
  
  const panes = [
    {
      menuItem: 'All Activities',
      render: () => <Tab.Pane attached={false}>
        <AllActivityList
            id_lead = {props.id_lead}
            lead_name = {props.name}
            searchValue = {searchValue}
            type="all"
        />
      </Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key='call'>
          <Icon name="call"></Icon><span>3</span>
        </Menu.Item>
      ),
      render: () => <Tab.Pane attached={false}>
        <CallList
            id_lead = {props.id_lead}
            lead_name = {props.name}
            searchValue = {searchValue}
            type="call"
        />
      </Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key='text'>
          <Icon name="comment"></Icon><span>3</span>
        </Menu.Item>
      ),
      render: () => <Tab.Pane attached={false}>
        <TextList
            id_lead = {props.id_lead}
            lead_name = {props.name}
            searchValue = {searchValue}
            type="text"
        />
      </Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key='email'>
          <Icon name="mail"></Icon><span>3</span>
        </Menu.Item>
      ),
      render: () => <Tab.Pane attached={false}>
        <EmailList
            id_lead = {props.id_lead}
            lead_name = {props.name}
            searchValue = {searchValue}
            type="email"
        />
      </Tab.Pane>,
    }, 
    {
      menuItem: (
        <Menu.Item key='note'>
          <Icon name="sticky note"></Icon><span>1</span>
        </Menu.Item>
      ),
      render: () => <Tab.Pane attached={false}>
        <NoteList
            id_lead = {props.id_lead}
            lead_name = {props.name}
            searchValue = {searchValue}
            type="note"
        />
      </Tab.Pane>,
    },
    {
      menuItem:  (
        <Menu.Item key='property'>
          <Icon name="world"></Icon><span>3</span>
        </Menu.Item>
      ),
      render: () => <Tab.Pane attached={false}>
        <PropertyList
            id_lead = {props.id_lead}
            lead_name = {props.name}
            searchValue = {searchValue}
            type = "property"
        />
      </Tab.Pane>,
    }
  ];

  return[
      <Tab menu={{ pointing: true }} panes={panes}/>,
      <Segment basic floated="right" className="search-container">
        <Input 
          name='searchValue'
          icon='search' 
          placeholder='Search...' 
          onChange={getPropertySearch}
          onKeyPress={(e) => {
            if(e.key === 'Enter'){
              searchProperties(searchValue);
              saveQuery(true);
            }
          }}
        />
      </Segment>
  ];
};

export default ActivitiesContainer
