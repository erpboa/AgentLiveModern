import React, {useEffect, useState} from 'react';
import {ServiceRest} from "../services/ServiceRest";
import Activity from './Activity';

const ActivityList = (props) => {

    const [property, loadProperty] = useState([]);

    //var propertys = Array();

    useEffect(() => {
        const loadPropertyList = async () => {
            var params = { start: 0, limit: 50, id_lead:props.id_lead};
            ServiceRest('agent_portal/GreatSheet/listarGreatSheet',params).then((response) => {
                loadProperty(response.datos);
            });
        };

        loadPropertyList();
    }, []);

    return (
        <div>
            { property != null ?
              (property.map(prop => (<Activity key={prop.id_great_sheet} activity={prop} lead_name={props.lead_name}/>))):
              (<div>Nothing Propertys</div>)
            }
        </div>
    );
};

export default ActivityList;
