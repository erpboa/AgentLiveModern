import React, {useEffect, useState} from 'react';
import {ServiceRest} from "../services/ServiceRest";
import Call from './Call';

const CallList = (props) => {

    const [calls, loadCall] = useState([]);

    //var calls = Array();
    const loadCallList = async () => {
        var params = { start: 0, limit: 50, id_lead:props.id_lead};
        ServiceRest('agent_portal/GreatSheet/listarGreatSheet',params).then((response) => {
            loadCall(response.datos);
        });
    };
    useEffect(() => {
        loadCallList();
    }, []);

    return (
        <div>
            { calls != null ?
              (calls.map(prop => (<Call key={prop.id_great_sheet} calls={prop} lead_name={props.lead_name}/>))):
              (<div>Nothing Calls</div>)
            }
        </div>
    );
};

export default CallList;
