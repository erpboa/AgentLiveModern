import React, {useContext, useEffect, useState} from 'react';
import {ServiceRest} from "../services/ServiceRest";
import Call from './Call';
import { PropertyContext } from '../contexts/PropertyContext';

const CallList = (props) => {

  const [calls, loadCall] = useState([]);

  const { searchValue, searchProperties, saveQuery, activityType, setActivityType } = useContext(PropertyContext);

    setActivityType('call');

  //var calls = Array();
  const loadCallList = async () => {
    var params = { start: 0, limit: 50, id_lead:props.id_lead, type:props.type, search_key:props.searchValue};
    ServiceRest('agent_portal/GreatSheet/listarGreatSheet',params).then((response) => {
        loadCall(response.datos);
    });
  };
  useEffect(() => {
      loadCallList();
  }, [searchValue]);

  return (
    <div>
      { calls != null ?
        (calls.map(c => renderCall(c, props.lead_name))):
        (<div>Nothing Calls</div>)
      }
    </div>
  );
};

const renderCall = (c, lead_name) => {
  const call = JSON.parse(c.jsondata);
  return (
    <Call key={call.id_call} call={call} lead_name={lead_name}/>
  );
};

export default CallList;
