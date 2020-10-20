import React, {useContext, useEffect, useState} from 'react';
import {ServiceRest} from "../services/ServiceRest";
import { Segment } from 'semantic-ui-react';
import Call from './Call';
import Text from './Text';
import Email from './Email';
import Note from './Note';
import Property from './Property';
import { PropertyContext } from '../contexts/PropertyContext';

const AllActivityList = (props) => {

  const [activity, loadActivities] = useState([]);

  const { searchValue, searchProperties, saveQuery, activityType, setActivityType } = useContext(PropertyContext);

  setActivityType('all');


  //var activitys = Array();
  const loadActivityList = async () => {
    var params = { start: 0, limit: 50, id_lead:props.id_lead, type:props.type, search_key:props.searchValue};
    ServiceRest('agent_portal/GreatSheet/listarGreatSheet',params).then((response) => {
        loadActivities(response.datos);
    });
  };
  useEffect(() => {
      loadActivityList();
  }, [searchValue]);

  return (
    activity != null ?
    (activity.map(a => renderActicity(a, props.lead_name))):
    (<div>Nothing Activities</div>)
  );
};

const renderActicity = (activity, lead_name ) => {
  const act = JSON.parse(activity.jsondata);

  switch (act.activity_type) {
    case 'call':
      return <Call key={`call-${act.id_call}`} call={act} lead_name={lead_name}/>
      break;
    case 'text':
      return <Text key={`text-${act.id_texts}`} text={act} lead_name={lead_name}/>
      break;
    case 'email':
      return <Email key={`email-${act.emails}`} email={act} lead_name={lead_name}/>
      break;
    case 'note':
      return <Note key={`note-${act.id_note}`} note={act} lead_name={lead_name}/>
      break;
    case 'property':
      return <Property key={`property-${act.id_great_sheet}`} property={act} lead_name={lead_name}/>
      break;
    default:
      return
  }
}

export default AllActivityList;
