import React, { createContext, useState, useEffect } from 'react';
import {ServiceRest} from "../services/ServiceRest";


export const PropertyContext = createContext();

const PropertyProvider = (props) => {

    const [properties, saveProperties] = useState([]);
    const [searchValue, searchProperties] = useState('');

    const [query, saveQuery] = useState(false);

    useEffect(() => {
        if(query) {
            const getProperties = async () => {
              var params = { start: 0, limit: 50, id_lead:'98', search_key:searchValue};
              ServiceRest('agent_portal/GreatSheet/listarGreatSheet',params).then((response) => {
                  saveProperties(response.datos);
              });
            }

            getProperties();
        }

    }, [searchValue]);

    return ( 
        <PropertyContext.Provider
            value={{
                properties,
                searchProperties, 
                saveQuery,
                searchValue
            }}
        >
            {props.children}
        </PropertyContext.Provider>
     );
}
 
export default PropertyProvider;