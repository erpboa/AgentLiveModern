/****************************************************************************************
 *@file Profile.js
 *@author  (breydi vasquez )
 *@date 07-08-2020
 *@description Componente Profile
 *****************************************************************************************/

import React, { useState, useEffect } from "react";
import avatar from "../../image/AvatarEjemplo.png";
import { CheckBoxComponent } from "../../components/CheckBox";
import outlook from "../../image/icon-microsoft-outlook-25.png";
import exchange from "../../image/icon-microsoft-exchange-25.png";
import google from "../../image/icons-google-25.png";
import { ServiceRest } from "../../services/ServiceRest";
import { data } from "jquery";

export const Profile = (props) => {
  const [dataAgent, setDataAgents] = useState();
  const [idAgent, setIdAgent] = useState();

  const onChangeValue = (e) => {
    setDataAgents({ ...dataAgent, [e.target.name]: e.target.value });
  };

  const onUpdateAgent = (e) => {
    e.preventDefault();
    
    const update = ServiceRest("agent_portal/Agent/modificarAgent", dataAgent);
    update.then((resp) => {
      if (resp.error) {
        const msg = `Report code:: ${resp.data.id_log} for review. Detail: ${resp.detail.message}`;
        alert(msg);
      }
    });
  };

  useEffect(() => {
    const agent = ServiceRest("agent_portal/Agent/getIdaAgent");
    agent.then((data) => setIdAgent(data.data));
  }, []);

  return (
    <section className="forms" className="w-100 p-3">
      <div className="card ">
        <div className="card-body">
          <h6 className="card-title">
            <a href="#">Learn more about setting up your profile</a>
          </h6>          
              <button type="button" onClick={onUpdateAgent} className="btn btn-primary">
                Save changes
              </button>            
        </div>
        <div className="card-body">
          <form className="form-horizontal" >            
            <div className="form-group row">
              <label className="col-sm-2 form-control-label">
                <b>Name *</b>
              </label>
              <div className="col-sm-12">
                Write your name as show as posible so we use it on Google
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={onChangeValue}
                />
              </div>
            </div>
            <div className="line"></div>
            <div className="form-group row">
              <label className="col-sm-4 form-control-label">
                <b>Your Picture</b>
              </label>
              <div className="col-sm-12">Recommended size 175x175 pixels</div>
            </div>
            <div className="card" style={{ width: "200px", height: "200px" }}>
              <img
                className="card-img-bottom"
                src={avatar}
                name="photo"
                alt="Card image"
                style={{ width: "100%" }}
              />
            </div>
            <div className="line"></div>
            <div className="form-group row">
              <label className="col-sm-4 form-control-label">
                <b>Cell Phone Number *</b>
              </label>
              <div className="col-sm-12">
                Type your phone number if you like your customer to call a
                ladline
                <input
                  type="text"
                  className="form-control"
                  onChange={onChangeValue}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 form-control-label">
                <b>Office Phone Number *</b>
              </label>
              <div className="col-sm-12">
                Type your phone number if you like your customer to call a
                ladline
                <input
                  type="text"
                  name="cell_phone"
                  className="form-control"
                  onChange={onChangeValue}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 form-control-label">
                <b>Email Address *</b>
              </label>
              <div className="col-sm-12">
                Provide your e-mail address. Please note this also changes the
                e-mail you use to log in to Great Agent
                <input
                  type="text"
                  name="email_address"
                  className="form-control"
                  onChange={onChangeValue}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 form-control-label">
                <b>Jobs Title *</b>
              </label>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  onChange={onChangeValue}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                className="col-sm-4 form-control-label"
                onChange={onChangeValue}
              >
                <b>Time Zone</b>
              </label>
              <div className="col-sm-12">
                <input
                  type="text"
                  name="job_title"
                  className="form-control"
                  onChange={onChangeValue}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 form-control-label">
                <b>Lender</b>
              </label>
              <div className="col-sm-12">
                <input
                  type="text"
                  name="id_lender"
                  className="form-control"
                  onChange={onChangeValue}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-1 form-control-label">
                <CheckBoxComponent size="switch switch-sm" />
              </label>
              <b>&nbsp;&nbsp;&nbsp;Include Agent on 'About Us' page</b>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 form-control-label">
                <b>Biography</b>
              </label>
              <div className="col-sm-12"></div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 form-control-label">
                <b>Add Social Media Links</b>
              </label>
              <div className="col-sm-12">
                <input
                  type="text"                  
                  className="form-control"
                  onChange={onChangeValue}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 form-control-label">
                <b>Virtual Phone Number: </b>
              </label>
              <div className="col-sm-12">
                Your virtual phone number is what your leads will see when you
                name making calls or sending text messages from Great Agent
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-1 form-control-label">
                <CheckBoxComponent size="switch switch-sm" />
              </label>
              <b>&nbsp;&nbsp;&nbsp;Share my emails with my team &nbsp;</b>
              <a href="#"> Learn more about emails sharing</a>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 form-control-label">
                <b>Connect Gmail Address</b>
              </label>
              <div className="col-sm-12">
                <button className="btn btn-primary" type="button">
                  <img src={google} alt="google" /> Sign in with Google
                </button>
                <br></br>
                <a href="#">Why connect your Gmail address</a>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 form-control-label">
                <b>Connect Outlook Address</b>
              </label>
              <div className="col-sm-12">
                <button className="btn btn-primary" type="button">
                  <img src={outlook} alt="outlook" />
                  &nbsp; Sign in with Outlook
                </button>
                <br></br>
                <a href="#">Why connect your Outlook address?</a>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-6 form-control-label">
                <b>
                  Connect email service hosted on Microsoft Exchange Server?
                </b>
              </label>
              <div className="col-sm-12">
                <button className="btn btn-primary" type="button">
                  <img src={exchange} alt="exchange" />
                  &nbsp; Sign in Exchange Server
                </button>
                <br></br>
                <a href="#">Why connect Hosted Exchange Server?</a>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={onUpdateAgent} className="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
