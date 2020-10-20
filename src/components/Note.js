import React from 'react';
import { Accordion, Divider, Icon } from 'semantic-ui-react'
import "semantic-ui-css/semantic.min.css";
import './styles/activity.css';


const Note = ({note, lead_name}) => {

  const panel = [
    {
      key: 0,
      title: {
        content: [
          <div data-testid="summary-content" class="summary pointer">
            <div class="summary_main ">
              <div class="summary_main__wrapper" >
              <Icon name="sticky note" 
                  data-testid="activity-timeline-icon" 
                  aria-hidden="true" 
                  className="circular icon icon_timeline icon_dark"
                />
                <div class="summary_main__content expanded-summary-main">
                  <p>
                    <span>
                      <span class="capitalize">
                        <span>{note.noteer_name} </span>
                      </span>  added a note to  
                      <span class="name">
                        <span> {lead_name}</span>
                      </span>
                    </span>
                  </p>
                  <p>
                    <span class="date" data-testid="activity-updated-at">{note.time_page}</span>
                  </p>               
                </div>
              </div>
            </div>  
          </div>,
           <Divider />
        ]
      },
      content: {
        content: (
          <div data-testid="extra-content" class="extra">
            <div class="editable-content touch-area">
              <div class="editable-content__content">
                <p class="extra-line" data-testid="Note-outcome">
                  {note.descripcion}
                </p>
              </div>
              <Icon name="edit"></Icon>
            </div>
          </div>
        )
      }
    }
  ];

  return (
    <Accordion defaultActiveIndex={0} panels={panel} />
  );
};
export default Note;
