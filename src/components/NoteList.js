import React, {useContext, useEffect, useState} from 'react';
import {ServiceRest} from "../services/ServiceRest";
import Note from './Note';
import { PropertyContext } from '../contexts/PropertyContext';

const NoteList = (props) => {

    const [notes, loadNote] = useState([]);

    const { searchValue, searchProperties, saveQuery, activityType, setActivityType } = useContext(PropertyContext);

    setActivityType('note');

    //var Notes = Array();
    const loadNoteList = async () => {
        var params = { start: 0, limit: 50, id_lead:props.id_lead, type:props.type, search_key:props.searchValue};
        ServiceRest('agent_portal/GreatSheet/listarGreatSheet',params).then((response) => {
            loadNote(response.datos);
        });
    };
    useEffect(() => {
        loadNoteList();
    }, [searchValue]);

    return (
        <div>
            { notes != null ?
              (notes.map(n => renderNote(n, props.lead_name))):
              (<div>Nothing Notes</div>)
            }
        </div>
    );
};

const renderNote = (n, lead_name) => {
    const note = JSON.parse(n.jsondata);
    return (
        <Note key={note.id_note} note={note} lead_name={lead_name}/>
      );
  };


export default NoteList;
