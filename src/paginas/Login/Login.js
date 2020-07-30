import React from 'react';
import FormLogin from '../../components/FormLogin';


import image1 from '../../components/images/casa1.jpg';
import image2 from '../../components/images/casa2.jpeg';
import image3 from '../../components/images/casa3.jpg';
import image4 from '../../components/images/casa4.jpg';

import BackgroundSlider from 'react-background-slider';


const Login = (props) => {
  return (
    <div>
      <BackgroundSlider
        images={[image1, image2, image3,image4]}
        duration={5} transition={2} />
      <FormLogin/>
    </div>
  );
}
export default Login;
