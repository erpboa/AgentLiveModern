import React, {useEffect, useState} from 'react';
import {ServiceRest} from "../services/ServiceRest";
import Property from './Property';

const PropertyList = (props) => {

    const [property, loadProperty] = useState([]);

    //var propertys = Array();
    const loadPropertyList = async () => {
        var params = { start: 0, limit: 50, id_lead:props.id_lead};
        ServiceRest('agent_portal/GreatSheet/listarGreatSheet',params).then((response) => {
            loadProperty(response.datos);
        });
    };
    useEffect(() => {
        loadPropertyList();
    }, []);

    return (
        <div>
            { property != null ?
              (property.map(prop => (<Property key={prop.id_great_sheet} property={prop} lead_name={props.lead_name}/>))):
              (<div>Nothing Propertys</div>)
            }
        </div>
    );
};

export default PropertyList;
