import React from 'react';
import { Accordion } from 'semantic-ui-react'
import "semantic-ui-css/semantic.min.css";
import './styles/activity.css';


const Email = ({email, lead_name}) => {

  const panel = [
    {
      key: 0,
      title: {
        content: (
          <div data-testid="summary-content" class="summary summary pointer">
            <div class="summary_main ">
              <div class="summary_main__wrapper">
                <span class="summary_main__content expanded-summary-main">
                  <span data-testid="summary-main">
                    <span>
                    <span class="name">{lead_name} </span> viewed 
                      <strong> a 
                        <a> (parametros de busqueda) </a>
                      </strong>
                    </span>
                  </span>
                </span>
                <a class="hidden" href="/lead/1303627/timeline"></a>
              </div>
            </div>
          <div class="date">
            <span data-testid="text-updated-at">time</span>
          </div>
        </div>
        )
      },
      content: {
        content: (
          <div class="extend-content">
            Content for Email activities
        </div>
        )
      }
    }
  ];

  return (
    <Accordion defaultActiveIndex={0} panels={panel} />
  );
};
export default Email;
