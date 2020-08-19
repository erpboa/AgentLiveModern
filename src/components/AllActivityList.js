import React, {useEffect, useState} from 'react';
import {ServiceRest} from "../services/ServiceRest";
import Activities from './Activities';

const AllActivityList = (props) => {

    const [activity, loadActivities] = useState([]);

    //var activitys = Array();
    const loadActivityList = async () => {
        var params = { start: 0, limit: 50, id_lead:props.id_lead};
        ServiceRest('agent_portal/GreatSheet/listarGreatSheet',params).then((response) => {
            loadActivities(response.datos);
        });
    };
    useEffect(() => {
        loadActivityList();
    }, []);

    return (
        <div>
            { activity != null ?
              (activity.map(prop => (<Activities key={prop.id_great_sheet} activity={prop} lead_name={props.lead_name}/>))):
              (<div>Nothing activities</div>)
            }
        </div>
    );
};

export default AllActivityList;
