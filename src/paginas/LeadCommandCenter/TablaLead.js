import React, {useContext} from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import {NavLink} from 'react-router-dom';

const TablaLead = ({ posts, loading }) => {
  return (

    <Table className="table table-responsive table-bordered" id="TablaContenedor">
        <Thead id="ColoresPaneles" >
          <Tr>
            <Th className="AnchoCabTabla" id="Letras">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                  <label class="form-check-label" for="defaultCheck1">
                  </label>
              </div>
            </Th>
            <Th className="AnchoCabTabla" id="Letras">Stage</Th>
            <Th className="AnchoCabTabla" id="Letras">Type</Th>
            <Th className="AnchoCabTabla" id="Letras">Name</Th>
            <Th className="AnchoCabTabla" id="Letras">Phone</Th>
            <Th className="AnchoCabTabla" id="Letras">CallGoal</Th>
            <Th className="AnchoCabTabla" id="Letras">Tasks</Th>
            <Th className="AnchoCabTabla" id="Letras">Calls</Th>
            <Th className="AnchoCabTabla" id="Letras">Emails</Th>
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
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                  <label class="form-check-label" for="defaultCheck1">
                  </label>
              </div>
              </Td>
              <Td>
                stage
              </Td>
              <Td>
                {post.type_lead}
              </Td>
              <Td>
                <NavLink data-toggle="tooltip" data-placement="top" title={`${post.first_name} ${post.last_name}`} className="nav-link" to={`CommandInfo/Lead${post.id_lead}`}><div>{post.first_name} {post.last_name}</div></NavLink>
              </Td>
              <Td>
                (+{post.code_country}) {post.phone}
              </Td>
              <Td>
                call goal
              </Td>
              <Td>
                <NavLink data-toggle="tooltip" data-placement="top" className="nav-link" to="#"><div>+ add</div></NavLink>
              </Td>
              <Td>
                <button type="button" id="BotonContenedor" className="btn btn-success"><i className="fa fa-phone" id="ContenidoIcono"></i>0</button>
              </Td>
              <Td>
              <button type="button" id="BotonContenedor" className="btn btn-warning"><i className="fa fa-share" id="ContenidoIcono"></i>0</button>
              </Td>
              <Td>
                Action plans
              </Td>
              <Td>
                 Last Visit
              </Td>
              <Td>
              <i className="fa fa-eye" aria-hidden="true"></i> 2
              </Td>
              <Td>
              <i className="fa fa-home" aria-hidden="true"></i> 3
              </Td>
              <Td>
              <i className="fa fa-heart" aria-hidden="true"></i> 1
              </Td>
              <Td>
                $4k
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
                <button type="button" className="btn btn-link">Add</button>
              </Td>
              <Td>
                <button type="button" className="btn btn-link">Add</button>
              </Td>
              <Td>
                --
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
