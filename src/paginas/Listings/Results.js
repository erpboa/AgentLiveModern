import React from 'react';
import '../../components/styles/formLogin.css';
import '../../components/styles/stylesMenu.css';
import '../../components/icon/font-awesome-4.7.0/css/font-awesome.min.css';
import Footer from '../../components/Footer';

const Results = ({ searchData, setData }) => {
  return (
    <div>           
      {searchData.data1}
    </div>
  );
}
export default Results;
