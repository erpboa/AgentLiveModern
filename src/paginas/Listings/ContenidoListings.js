import React, { useContext, useState } from 'react';
import { Grid, Segment, Form, Input, Button } from 'semantic-ui-react';
import '../../components/styles/formLogin.css';
import '../../components/styles/stylesMenu.css';
import '../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css';
import Footer from '../../components/Footer';
import SearchForm from './SearchForm';
import Results from './Results';
import "semantic-ui-css/semantic.min.css";
import { ReloadComponent } from '../../contexts/ReloadComponent';

const ContenidoListings = (props) => {

  const { reloadComponent, setReloadComponent } = useContext(ReloadComponent);

  const [searchData, setData] = useState({
    data1: "",
    data2: "",
    data3: ""
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    console.log("handleInputChange");
    setData({
      ...searchData,
      [e.target.id]: e.target.value,
    });
  };

  const searchListing  = (e, data) => {
    e.preventDefault();
    console.log("click", data);
    if (reloadComponent === undefined || reloadComponent === false) {
      setReloadComponent(true);
      alert(data.data1);
    } else {
      setReloadComponent(false);
    }
  };

  return (
    <Segment basic>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={6}>
            <SearchForm searchData={searchData} handleInputChange={handleInputChange} searchListing={searchListing}/>
          </Grid.Column>
          <Grid.Column width={10}>
            <Results searchData={searchData} handleInputChange={handleInputChange}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
export default ContenidoListings;
