import React from 'react';
import { Accordion } from 'semantic-ui-react'
import "semantic-ui-css/semantic.min.css";
import './styles/activity.css';


const Activity = ({activity, lead_name}) => {

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
                        <a target="_blank" href={activity.ffd_guid}> Property Search</a>
                      </strong>
                    </span>
                  </span>
                </span>
                  <a class="hidden" href="/lead/1303627/timeline"></a>
                </div>
              </div>
              <div class="date">
                <span data-testid="activity-updated-at">{activity.time_page} ago</span>
              </div>
            </div>
        )
      },
      content: {
        content: (
            <div class="extend-content">
              <div className="block-property">
                <div className="basic-info">
                  <div className="address">
                    <h5>{activity.ffd_address_pb}</h5>
                    <p>{activity.ffd_city_pb}</p>
                  </div>
                  <div class="main-inner-params">
                    <div class="main-inner-param main-inner-param_price">
                      <div class="inline-block">{activity.ffd_listingprice_pb}</div>
                    </div>
                    <div class="main-inner-param">
                      <span class="main-inner-param-content main-inner-param-content_value">{activity.ffd_bedrooms_pb}</span>
                      <span class="main-inner-param-content main-inner-param-content_label">Beds</span>
                    </div>
                    <div class="main-inner-param">
                      <span class="main-inner-param-content main-inner-param-content_value">{activity.ffd_fullbathrooms_pb}</span>
                      <span class="main-inner-param-content main-inner-param-content_label">Baths</span>
                    </div>
                    <div class="main-inner-param">
                      <span class="main-inner-param-content main-inner-param-content_value">{activity.ffd_living_sq_ft}</span>
                      <span class="main-inner-param-content main-inner-param-content_label">Acres</span>
                    </div>
                  </div>
                </div>
                <div class="additional-info">
                  <div class="additional-params">
                    <div class="additional-param">
                      <span class="additional-param-label">Neighborhood</span>
                      <span class="additional-param-value">{activity.ffd_subdivision}</span>
                    </div>
                    <div class="additional-param">
                      <span class="additional-param-label">Type</span>
                      <span class="additional-param-value">{activity.ffd_propertysubtype}</span>
                    </div>
                    <div class="additional-param">
                      <span class="additional-param-label">Total Baths</span>
                      <span class="additional-param-value">{activity.ffd_fullbathrooms_pb}</span>
                    </div>
                    <div class="additional-param">
                      <span class="additional-param-label">Listed on site</span>
                      <span class="additional-param-value">2 days</span>
                    </div>
                    <div class="additional-param">
                      <span class="additional-param-label">Status</span>
                      <span class="additional-param-value">{activity.ffd_status}</span>
                    </div>
                    <div class="additional-param">
                      <span class="additional-param-label">Listing #</span>
                      <a target="_blank" class="additional-param-value">{activity.ffd_mls_id}</a>
                    </div>
                    <div class="additional-param">
                      <span class="additional-param-label">Built</span>
                      <span class="additional-param-value">{activity.ffd_yearbuilt_pb}</span>
                    </div><div class="additional-param">
                    <span class="additional-param-label">Lot Size</span>
                    <span class="additional-param-value">{activity.ffd_living_sq_ft}</span>
                  </div>
                    <div class="additional-param">
                      <span class="additional-param-label">Taxes</span>
                      <span class="additional-param-value">{activity.ffd_listingprice_pb}</span>
                    </div>
                  </div>
                </div>
                <div class="images">
                  <div class="image">
                    <a target="_blank" href={activity.ffd_featured_image} class="image-wrapper">
                      <div class="image-item" style={{ backgroundImage: `url(${activity.ffd_featured_image})` }}>
                      </div>
                    </a>
                  </div>
                  <div class="image">
                    <div class="image-wrapper">
                      <div class="bold pointer map-placeholder-wrapper map-placeholder-wrapper--with-background">
                        <span class="map-placeholder">Click for Map</span>
                      </div>
                    </div>
                  </div>
                </div>
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
export default Activity;
