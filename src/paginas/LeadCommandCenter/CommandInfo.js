import React, {useContext} from 'react';
import '../../components/styles/formLogin.css';
import '../../components/styles/stylesMenu.css';
import '../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css';
import Footer from '../../components/Footer';
import {UserContext} from "../../contexts/UserContext";

//import './style.css';
import avatar1 from '../../image/avatar1.png';
import edit_icon from '../../image/edit_icon.png';
import phone_icon from '../../image/phone.png';
import mensaje_icon from '../../image/mensaje.png';
import chat_icon from '../../image/chat.png';
import net_icon from '../../image/net.png';

const CommandInfo = (props) => {
  const {userContext} = useContext(UserContext);



  return (
    <div class="card">
      <div class="card-header">
        Featured
      </div>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  );
}
export default CommandInfo;
