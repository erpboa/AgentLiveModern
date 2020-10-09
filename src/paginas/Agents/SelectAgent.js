import React, { useState, useContext } from 'react';
import TeamForm from './TeamForm';
import { ServiceRest } from "../../services/ServiceRest";
import { ReloadComponent } from "../../contexts/ReloadComponent";
import $ from "jquery";

const SelectAgent = ({
    ...props
}) => {
    const { reloadComponent, setReloadComponent } = useContext(ReloadComponent)
    const [users] = useState([...props.usernameList])
    const [team, setTeam] = useState({...props.team})
    
    const handleChange = (event) => {
        const { name, value, id } = event.target

        if (name === 'agents') {                 
            const newUserObj = users.find(user => user.id_agent === value);
            const data = {"id_agent": newUserObj.id_agent, "name": newUserObj.name, "lead_per_round": 0.00, "quantity": 0}
            setTeam(prevTeam => ({
                ...prevTeam,
                [name]: prevTeam[name].concat(data),
            }))
                 
        } else if (name === 'lead_per_round') {
            
            team.agents.find(user => {
                if (user.id_agent === id) {
                    user.lead_per_round = ((Number(value)/ 100) * 1000).toFixed(2)
                    user.quantity = value 
                    return user
                }})            
        }
        
        else if (name === 'name') {
            setTeam(prevTeam => ({
                ...prevTeam,
                [name]: value,
            }));
        } else if (name === 'distribution_type') {
            setTeam(prevTeam => ({
                ...prevTeam,
                [name]: value,
            }));
        }
        
    }

    const insertTeam = (e) => {
        if (reloadComponent === undefined || reloadComponent === false) {
          setReloadComponent(true);
        } else {
          setReloadComponent(false);
        }
        e.preventDefault();    
        
        const obj = {
            name: team.name,
            distribution_type: team.distribution_type,
            agents: JSON.stringify(team.agents)
        }
        
          ServiceRest("agent_portal/Team/insertarTeam", obj)
            .then((resp) => {                
              if (!resp.error) {
                $("#modalTeam").modal("hide");
              } else {
                const msg = `Report code:: ${resp.data.id_log} for review. Detail: ${resp.detail.message}`;
                alert(msg);
              }
            })
            .catch((e) => console.error(e));
        
      };
    const handleDeleteClick = (authority, id) => (event) => {
        setTeam(prevTeam => ({
            ...prevTeam,
            [authority]: prevTeam[authority].filter(user => user.id_agent !== id),
        }));
    }

    const usernameList = getUsersNotInTeam(users, team);
    return (
        <>
            <TeamForm team={team}
                usernameList={usernameList}                
                handleChange={handleChange}
                handleDeleteClick={handleDeleteClick}
                insertTeam={insertTeam}
            />
        </>
    )
}

export const getUsersNotInTeam = (usersList, team) => {  
    const { agents = [] } = team;
    return usersList.filter(user => {      
        return !(agents.find(u => u.id_agent === user.id_agent));
    });
}


export default SelectAgent;