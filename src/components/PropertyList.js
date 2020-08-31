import React, {useContext, useEffect, useState} from 'react';
import {ServiceRest} from "../services/ServiceRest";
import Property from './Property';
import { PropertyContext } from '../contexts/PropertyContext';

const PropertyList = (props) => {

    const [property, loadProperty] = useState([]);

    const { searchValue, searchProperties, saveQuery, activityType, setActivityType } = useContext(PropertyContext);

    setActivityType('property');

    //var propertys = Array();
    const loadPropertyList = async () => {
        var params = { start: 0, limit: 50, id_lead:props.id_lead, type:props.type, search_key:props.searchValue};
        ServiceRest('agent_portal/GreatSheet/listarGreatSheet',params).then((response) => {
            loadProperty(response.datos);
        });
    };
    useEffect(() => {
        loadPropertyList();
    }, [searchValue]);

    return (
        <div>
            { property != null ?
              property.map(p => renderProperty(p, props.lead_name)
            ):
              <div>Nothing Properties</div>
            }
        </div>
    );
};

const renderProperty = (p, lead_name) => {
  const prop = JSON.parse(p.jsondata);
  return (
    <Property key={prop.id_great_sheet} property={prop} lead_name={lead_name}/>
    );
};

export default PropertyList;
