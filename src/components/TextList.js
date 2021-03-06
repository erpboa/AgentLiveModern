import React, {useContext, useEffect, useState} from 'react';
import {ServiceRest} from "../services/ServiceRest";
import Text from './Text';
import { PropertyContext } from '../contexts/PropertyContext';

const TextList = (props) => {

    const [texts, loadText] = useState([]);

    const { searchValue, searchProperties, saveQuery, activityType, setActivityType } = useContext(PropertyContext);

    setActivityType('text');

    //var Texts = Array();
    const loadTextList = async () => {
        var params = { start: 0, limit: 50, id_lead:props.id_lead, type:props.type, search_key:props.searchValue};
        ServiceRest('agent_portal/GreatSheet/listarGreatSheet',params).then((response) => {
            loadText(response.datos);
            console.log(response.datos);
        });
    };
    useEffect(() => {
        loadTextList();
    }, [searchValue]);

    return (
        <div>
            { texts != null ?
              (texts.map(t => renderText(t, props.lead_name))):
              (<div>Nothing Texts</div>)
            }
        </div>
    );
};

const renderText = (t, lead_name) => {
    const text = JSON.parse(t.jsondata);
    return (
        <Text key={text.id_texts} text={text} lead_name={lead_name}/>
      );
  };

export default TextList;
