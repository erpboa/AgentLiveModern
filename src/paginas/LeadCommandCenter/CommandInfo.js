import React, {useContext} from 'react';
import '../../components/styles/formLogin.css';
import '../../components/styles/stylesMenu.css';
import '../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css';
import Footer from '../../components/Footer';
import {UserContext} from "../../contexts/UserContext";

import './style.css';
import avatar1 from './images/avatar1.png';
import edit_icon from './images/edit_icon.png';
import phone_icon from './images/phone.png';
import mensaje_icon from './images/mensaje.png';
import chat_icon from './images/chat.png';
import net_icon from './images/net.png';

const CommandInfo = (props) => {
  const {userContext} = useContext(UserContext);  

 

  return (
    <div id="layoutSidenav_content">
        <main>
            <div className="container-fluid">

                <section className="box">      
                    <div>     
                        <div className="sig-previos">
                            <input type="submit" value="<" />
                            <input type="submit" value=">" />
                            
                            <nav>
                                <ul id="menu">
                                <li><a href="">B</a>
                                    <ul>
                                        <li><a href="">Buyer</a></li>
                                    </ul>  
                                </li>
                                <li><a href=""><img className="edit-img" src={edit_icon} alt=""/></a> </li>
                                </ul>
                            </nav>
                            
                        </div>  
                        <div className="div_avatar">                   
                            <img className="avatar-img" src={avatar1} alt=""/>  
                            <h5>MAYLEE PEREZ</h5>                        
                        </div>  
                        
                        <div className="contenedor-phone">
                            <p>(561) 202-1809</p>
                            
                            <p>josephlorenzo5@gmail.com</p>                            
                        </div>
                      
                        <div className="contenedor-addadress">
                            <p>+ Add a new address</p>                            
                        </div>
                        
                    </div>   

                   
           
                </section>              

                <section className= "info-section-acticvities">    
                    <div >
                        <div className="menu-activities">                            
                            <nav className="nav-activities">
                                <ul id="menu">
                                <li><a href="">All Activities</a></li>
                                <li><a href=""><img className="phone-img" src={phone_icon} alt=""/></a> </li>
                                <li><a href=""><img className="chat-img" src={chat_icon} alt=""/></a> </li>
                                <li><a href=""><img className="mensaje-img" src={mensaje_icon} alt=""/></a> </li>
                                <li><a href=""><img className="net-img" src={net_icon} alt=""/></a> </li>
                                
                                </ul>
                               
                            </nav>
                            <form className="d-none d-md-inline-block form-inline">
                                <div className="input-group">
                                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                    <button className="btn btn-primary mr-0 mr-md-3 my-2 my-md-0" type="button"><i className="fa fa-search"></i></button>
                                </div>
                            </form>
                            
                        </div>  
                    </div>
                </section>
                <section className= "info-section-menu">  
                    <div >
                        <p></p>
                    </div>
                </section>

                <section>    
                    <div className="box2">
                        <div className="contenedor-text">
                            <p>EXECUTIVE SUMMARY</p>     
                            <input type="text" value= "Text..."/>                       
                        </div>
                    </div>
                </section>

                <section>    
                    <div className="box3">
                        <p></p>
                    </div>
                </section>

                

            </div>
        </main>
        <Footer/>
    </div>
  );
}
export default CommandInfo;
