import React from 'react';
import { Accordion,Icon } from 'semantic-ui-react'
import "semantic-ui-css/semantic.min.css";
import './styles/activity.css';


const Property = ({property, lead_name}) => {

  const panel = [
    {
      key: 0,
      title: {
        content: (
          <div data-testid="summary-content" class="summary summary pointer">
            <div class="summary_main ">
              <div class="summary_main__wrapper">
                <Icon name="home"
                      data-testid="activity-timeline-icon"
                      aria-hidden="true"
                      class="phone circular icon icon_timeline icon_dark"
                />
                <div class="summary_main__content expanded-summary-main">
                  <p>
                      <span>
                      <span className="name">{lead_name} </span> viewed
                        <strong> a
                          <a target="_blank" href={property.ffd_guid}> Property Search</a>
                        </strong>
                      </span>
                  </p>
                  <p>
                    <span data-testid="activity-updated-at">{property.time_page} ago</span>
                  </p>
                </div>
              </div>
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
                <h5>{property.ffd_address_pb}</h5>
                <p>{property.ffd_city_pb}</p>
              </div>
              <div class="main-inner-params">
                <div class="main-inner-param main-inner-param_price">
                  <div class="inline-block">{property.ffd_listingprice_pb}</div>
                </div>
                <div class="main-inner-param">
                  <span class="main-inner-param-content main-inner-param-content_value">{property.ffd_bedrooms_pb}</span>
                  <span class="main-inner-param-content main-inner-param-content_label">Beds</span>
                </div>
                <div class="main-inner-param">
                  <span class="main-inner-param-content main-inner-param-content_value">{property.ffd_fullbathrooms_pb}</span>
                  <span class="main-inner-param-content main-inner-param-content_label">Baths</span>
                </div>
                <div class="main-inner-param">
                  <span class="main-inner-param-content main-inner-param-content_value">{property.ffd_living_sq_ft}</span>
                  <span class="main-inner-param-content main-inner-param-content_label">Acres</span>
                </div>
              </div>
            </div>
            <div class="additional-info">
              <div class="additional-params">
                <div class="additional-param">
                  <span class="additional-param-label">Neighborhood</span>
                  <span className="additional-param-value">{property.ffd_subdivision}</span>
                </div>
                <div class="additional-param">
                  <span class="additional-param-label">Type</span>
                  <span className="additional-param-value">{property.ffd_propertysubtype}</span>
                </div>
                <div class="additional-param">
                  <span class="additional-param-label">Total Baths</span>
                  <span class="additional-param-value">{property.ffd_fullbathrooms_pb}</span>
                </div>
                <div class="additional-param">
                  <span class="additional-param-label">Listed on site</span>
                  <span class="additional-param-value">2 days</span>
                </div>
                <div class="additional-param">
                  <span class="additional-param-label">Status</span>
                  <span className="additional-param-value">{property.ffd_status}</span>
                </div>
                <div class="additional-param">
                  <span class="additional-param-label">Listing #</span>
                  <a target="_blank" class="additional-param-value">{property.ffd_mls_id}</a>
                </div>
                <div class="additional-param">
                  <span class="additional-param-label">Built</span>
                  <span className="additional-param-value">{property.ffd_yearbuilt_pb}</span>
                </div><div class="additional-param">
                  <span class="additional-param-label">Lot Size</span>
                  <span class="additional-param-value">{property.ffd_living_sq_ft}</span>
                </div>
                <div class="additional-param">
                  <span class="additional-param-label">Taxes</span>
                  <span class="additional-param-value">{property.ffd_listingprice_pb}</span>
                </div>
              </div>
            </div>
            <div class="images">
                <div class="image">
                  <a target="_blank" href={property.ffd_featured_image} class="image-wrapper">
                    <div class="image-item" style={{ backgroundImage: `url(${property.ffd_featured_image})` }}>
                    </div>
                  </a>
                </div>
                <div class="image">
                  <div class="image-wrapper">
                    <div className="bold pointer map-placeholder-wrapper map-placeholder-wrapper--with-background">
                      <iframe width="100%" height="250"
                              frameBorder="0" scrolling="no"
                              marginHeight="0" marginWidth="0"
                              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=Les%20Rambles,%201%20Barcelona,%20Spain+(Mi%20nombre%20de%20egocios)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                      </iframe>
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
export default Property;
