import React, {useEffect, useState} from 'react';
import {ServiceRest} from "../services/ServiceRest";
import Email from './Email';

const EmailList = (props) => {

    const [emails, loadEmail] = useState([]);

    //var Emails = Array();
    const loadEmailList = async () => {
        var params = { start: 0, limit: 50, id_lead:props.id_lead, type: props.type};
        ServiceRest('agent_portal/GreatSheet/listarGreatSheet',params).then((response) => {
            loadEmail(response.datos);
        });
    };
    useEffect(() => {
        loadEmailList();
    }, []);

    return (
        <div>
            { emails != null ?
              (emails.map(prop => (<Email key={prop.id_great_sheet} emails={prop} lead_name={props.lead_name}/>))):
              (<div>Nothing Emails</div>)
            }
        </div>
    );
};

export default EmailList;
