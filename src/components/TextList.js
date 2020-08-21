import React, {useEffect, useState} from 'react';
import {ServiceRest} from "../services/ServiceRest";
import Text from './Text';

const TextList = (props) => {

    const [texts, loadText] = useState([]);

    //var Texts = Array();
    const loadTextList = async () => {
        var params = { start: 0, limit: 50, id_lead:props.id_lead};
        ServiceRest('agent_portal/GreatSheet/listarGreatSheet',params).then((response) => {
            loadText(response.datos);
        });
    };
    useEffect(() => {
        loadTextList();
    }, []);

    return (
        <div>
            { texts != null ?
              (texts.map(prop => (<Text key={prop.id_great_sheet} texts={prop} lead_name={props.lead_name}/>))):
              (<div>Nothing Texts</div>)
            }
        </div>
    );
};

export default TextList;
