import React from 'react';
import { Accordion, Divider, Icon } from 'semantic-ui-react'
import "semantic-ui-css/semantic.min.css";
import './styles/activity.css';


const Text = ({text, lead_name}) => {

  const panel = [
    {
      key: 0,
      title: {
        content: [
          <div data-testid="summary-content" class="summary pointer">
            <div class="summary_main ">
              <div class="summary_main__wrapper" >
                <Icon name="comment" 
                  data-testid="activity-timeline-icon" 
                  aria-hidden="true" 
                  class="phone circular icon icon_timeline icon_dark"
                />
                <div class="summary_main__content expanded-summary-main">
                  <p>
                    <span>
                      <span>{text.texter_name} </span>
                       text to 
                       <span class="name">
                         <span> {lead_name}</span>
                       { /*<span> failed to deliver</span>
                       <a> (via Action Plan)</a>*/}
                       </span>
                    </span>
                  </p>
                  <p>
                    <span class="date" data-testid="activity-updated-at">{text.time_page}</span>
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
            {text.message}
            { /*<div>
              <div class="text-activity flex-row flex-row_gorizontal-start">
                <a class="text-activity__property text-property-attachment" 
                  data-testid="text-property-attachment" 
                  target="_blank" 
                  href="https://search.modernlivingre.com/homedetails/45999197">
                  <img 
                    src="https://greatagent-media.s3.us-west-2.amazonaws.com/media/properties/cards/39f625a0e219ba322025d04f433a7b3b.jpg" 
                    alt="property image" 
                    data-testid="text-property-attachment-image" 
                    class="text-property-attachment__image"
                  />
                </a>
                <p class="text-activity__body">
                  Hi Karin, I saw you registered on our website and were looking at some communities in our area of expertise. 
                  What did you think of this specific property?
                  Jonathan Santiago | Realtor
                  Modern Living Group
                  <span class="text-activity__tip" data-testid="activity-property-tip">
                    <br></br>Tip: to maximize response rate the URL:&nbsp;
                    <span>
                      <a 
                        target="_blank" 
                        href="https://search.modernlivingre.com/homedetails/45999197" 
                        data-testid="activity-property-tip-link">
                          https://search.modernlivingre.com/homedetails/45999197
                      </a>
                      <i aria-hidden="true" class="copy outline icon copy-icon"></i>
                    </span>
                    to the property was not sent to the client. 
                    We recommend that you manually sent it to Karin Reilly if he asks for details
                  </span>
                </p>
              </div>
            </div>*/}
          </div>
        )
      }
    }
  ];

  return (
    <Accordion defaultActiveIndex={0} panels={panel} />
  );
};
export default Text;
