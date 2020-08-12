import React, {useContext} from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import {NavLink} from 'react-router-dom';

const TablaLead = ({ posts, loading }) => {
  return (

    <Table className="table table-responsive table-bordered" id="TablaContenedor">
        <Thead id="ColoresPaneles" >
          <Tr>
            <Th className="AnchoCabTabla" id="Letras">#</Th>
            <Th className="AnchoCabTabla" id="Letras">Stage</Th>
            <Th className="AnchoCabTabla" id="Letras">Type</Th>
            <Th className="AnchoCabTabla" id="Letras">Name</Th>
            <Th className="AnchoCabTabla" id="Letras">Phone</Th>
            <Th className="AnchoCabTabla" id="Letras">CallGoal</Th>
            <Th className="AnchoCabTabla" id="Letras">Tasks</Th>
            <Th className="AnchoCabTabla" id="Letras">Calls</Th>
            <Th className="AnchoCabTabla" id="Letras">Emails</Th>
            <Th className="AnchoCabTabla" id="Letras">Texts</Th>
            <Th className="AnchoCabTabla" id="Letras">E-Alerts</Th>
            <Th className="AnchoCabTabla" id="Letras"><i className="fa fa-bolt" aria-hidden="true">A</i></Th>
            <Th className="AnchoCabTabla" id="Letras">LastVisit</Th>
            <Th className="AnchoCabTabla" id="Letras"><i className="fa fa-eye" aria-hidden="true"></i></Th>
            <Th className="AnchoCabTabla" id="Letras"><i className="fa fa-home" aria-hidden="true"></i></Th>
            <Th className="AnchoCabTabla" id="Letras"><i className="fa fa-heart" aria-hidden="true"></i></Th>
            <Th className="AnchoCabTabla" id="Letras">Price</Th>
            <Th className="AnchoCabTabla" id="Letras">Registered</Th>
            <Th className="AnchoCabTabla" id="Letras">Agent Activity</Th>
            <Th className="AnchoCabTabla" id="Letras">Lead Activity</Th>
            <Th className="AnchoCabTabla" id="Letras">Close Date</Th>
            <Th className="AnchoCabTabla" id="Letras">Birthday</Th>
            <Th className="AnchoCabTabla" id="Letras">Address</Th>
            <Th className="AnchoCabTabla" id="Letras">Tags</Th>
          </Tr>
        </Thead>
        <Tbody id="CuerpoTabla">
        {posts.map(post => (
          <Tr key = {post.id_lead}>
              <Td>
                1
              </Td>
              <Td>
                stage
              </Td>
              <Td>
                {post.type_lead}
              </Td>
              <Td>
                <NavLink className="nav-link" to={`CommandInfo/Lead${post.id_lead}`}><div>{post.first_name}</div></NavLink>
              </Td>
              <Td>
                {post.phone}
              </Td>
              <Td>
                call goal
              </Td>
              <Td>
                task
              </Td>
              <Td>
                calls
              </Td>
              <Td>
                emails
              </Td>
              <Td>
                texts
              </Td>
              <Td>
                1 sent
              </Td>
              <Td>
                A
              </Td>
              <Td>
                Last Visit
              </Td>
              <Td>
                eye
              </Td>
              <Td>
                home
              </Td>
              <Td>
                heart
              </Td>
              <Td>
                Price
              </Td>
              <Td>
                registered
              </Td>
              <Td>
                agent activity
              </Td>
              <Td>
                lead activity
              </Td>
              <Td>
                close date
              </Td>
              <Td>
                Birthday
              </Td>
              <Td>
                Address
              </Td>
              <Td>
                tags
              </Td>
            </Tr>
        ))}
        </Tbody>
      </Table>

  );

}
export default TablaLead;
