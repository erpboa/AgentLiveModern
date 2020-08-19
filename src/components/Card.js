import React from 'react';
import './styles/card.css';
import {NavLink} from 'react-router-dom';
import AllActivityList from "./AllActivityList";
import CallList from "./CallList";
import TextList from "./TextList";
import EmailList from "./EmailList";
import PropertyList from "./PropertyList";
import { Tab, Icon, Menu, Label, Input } from 'semantic-ui-react'

import edit_icon from '../image/edit_icon.png';
import phone_icon from '../image/phone.png';
import mensaje_icon from '../image/mensaje.png';
import chat_icon from '../image/chat.png';
import net_icon from '../image/net.png';

import ContenidoCorrespondencia from '../paginas/LeadCommandCenter/ContenidoCorrespondencia';

const Card = (props) => {

  const panes = [
    {
      menuItem: 'All Activities',
      render: () => <Tab.Pane attached={false}>
        <AllActivityList
            id_lead = {props.id_lead}
            lead_name = {props.nombre}
        />
      </Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key='call'>
          <Icon name="call"></Icon><Label>3</Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane attached={false}>
        <CallList
            id_lead = {props.id_lead}
            lead_name = {props.nombre}
        />
      </Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key='text'>
          <Icon name="comment"></Icon><Label>3</Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane attached={false}>
        <TextList
            id_lead = {props.id_lead}
            lead_name = {props.nombre}
        />
      </Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key='email'>
          <Icon name="mail"></Icon><Label>3</Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane attached={false}>
        <EmailList
            id_lead = {props.id_lead}
            lead_name = {props.nombre}
        />
      </Tab.Pane>,
    },
    {
      menuItem:  (
        <Menu.Item key='property'>
          <Icon name="world"></Icon><Label>3</Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane attached={false}>
        <PropertyList
            id_lead = {props.id_lead}
            lead_name = {props.nombre}
        />
      </Tab.Pane>,
    },
      {
          menuItem:  (
              <Menu.Item key='search'>
                  <Input icon='search' placeholder='Search...' />
              </Menu.Item>
          ),
          render: () => <Tab.Pane attached={false}>
              <PropertyList
                  id_lead = {props.id_lead}
                  lead_name = {props.nombre}
              />
          </Tab.Pane>,
      }
  ];

  return (

            <div className="container-fluid" id="ContenidoLeadInfo">
            <div className="row">
                <div className="col-sm-4" id="ContenidoInfo">
                  <div className="row" id="contenido">
                      <div className="col-sm-12">
                        <div className="card" id="ContenidoInfoLead">
                          <h1>
                            <img id="ImagenAvatar" src={props.foto} className="card-img-top img-fluid rounded" alt="Avatar"/><b id="TituloCard">{props.nombre}</b>
                          </h1>
                          <div className="card-body">
                            <NavLink className="nav-link" to="#">{props.telefono}</NavLink>
                            <NavLink className="nav-link" to="#">{props.correo}</NavLink>
                            <NavLink className="nav-link" to="#">{props.type_lead}</NavLink>
                          </div>
                          <form>
                          <div class="form-group">
                            <label for="exampleFormControlTextarea1">EXECUTIVE SUMMARY</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                          </div>
                        </form>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="col-sm-8" id="ContenidoCorrespondenciaGeneral">
                  <div className="row">
                      <div class="col-sm-12">
                        <div class="card" id="ContenidoCorrespondencia">
                          <div class="card-body" id="CuerpoCorrespondecia">
                              <ContenidoCorrespondencia/>                               
                          </div>
                        </div>
                        <div className="activity-content">
                          <Tab menu={{ attached: false }} panes={panes} />
                        </div>
                      </div>
                  </div>
                </div>
            </div>
            </div>

  );
}
export default Card;
