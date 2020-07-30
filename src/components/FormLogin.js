import React from 'react';
import './styles/formLogin.css';
import './icon/font-awesome-4.7.0/css/font-awesome.min.css';

const FormLogin = () => {
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <center><h1>LIVE MOODERN</h1></center>
            </div>
            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <i class="fa fa-user icon fa-2x"></i>
                  <input type="text" className="input-field" placeholder="Cuenta"/>
                </div>
                <div className="input-group form-group">
                  <i class="fa fa-key icon fa-2x"></i>
                  <input type="password" className="input-field" placeholder="Contraseña" />
                </div>
                <div className="form-group">
                  <center><button id="login-boton" type="submit" value="Entrar" className="btn btn-success">Login</button></center>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormLogin;
