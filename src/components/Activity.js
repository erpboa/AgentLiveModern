import React from 'react';
import './styles/activity.css';


const Activity = ({activity, lead_name}) => {
  return (
    <div className="activity-content">
      <div data-testid="summary-content" className="summary summary pointer">
        <div className="summary_main ">
          <div className="summary_main__wrapper">
            <span className="summary_main__content expanded-summary-main">
              <span data-testid="summary-main">
                <span>
                <span className="name">{lead_name} </span> viewed 
                  <strong> a 
                    <a> (parametros de busqueda) </a>
                  </strong>
                </span>
              </span>
            </span>
            <a className="hidden" href="/lead/1303627/timeline"></a>
          </div>
        </div>
      <div className="date">
        <span data-testid="activity-updated-at">time</span>
      </div>
    </div>
      <div className="divider"></div>
      <div className="extend-content">
        <div className="block-property">
          <div className="basic-info">
            <div className="address">
              <h5>{activity.ffd_address_pb}</h5>
              <p>{activity.ffd_city_pb}</p>
            </div>
            <div className="main-inner-params">
              <div className="main-inner-param main-inner-param_price">
                <div className="inline-block">{activity.ffd_listingprice_pb}</div>
              </div>
              <div className="main-inner-param">
                <span className="main-inner-param-content main-inner-param-content_value">{activity.ffd_bedrooms_pb}</span>
                <span className="main-inner-param-content main-inner-param-content_label">Beds</span>
              </div>
              <div className="main-inner-param">
                <span className="main-inner-param-content main-inner-param-content_value">{activity.ffd_fullbathrooms_pb}</span>
                <span className="main-inner-param-content main-inner-param-content_label">Baths</span>
              </div>
              <div className="main-inner-param">
                <span className="main-inner-param-content main-inner-param-content_value">{activity.ffd_living_sq_ft}</span>
                <span className="main-inner-param-content main-inner-param-content_label">Acres</span>
              </div>
            </div>
          </div>
          <div className="additional-info">
            <div className="additional-params">
              <div className="additional-param">
                <span className="additional-param-label">Neighborhood</span>
                <span className="additional-param-value"></span>
              </div>
              <div className="additional-param">
                <span className="additional-param-label">Type</span>
                <span className="additional-param-value">Condo</span>
              </div>
              <div className="additional-param">
                <span className="additional-param-label">Total Baths</span>
                <span className="additional-param-value">{activity.ffd_fullbathrooms_pb}</span>
              </div>
              <div className="additional-param">
                <span className="additional-param-label">Listed on site</span>
                <span className="additional-param-value">2 days</span>
              </div>
              <div className="additional-param">
                <span className="additional-param-label">Status</span>
                <span className="additional-param-value">Active</span>
              </div>
              <div className="additional-param">
                <span className="additional-param-label">Listing #</span>
                <a target="_blank" className="additional-param-value">{activity.ffd_mls_id}</a>
              </div>
              <div className="additional-param">
                <span className="additional-param-label">Built</span>
                <span className="additional-param-value">2008</span>
              </div><div className="additional-param">
                <span className="additional-param-label">Lot Size</span>
                <span className="additional-param-value">{activity.ffd_living_sq_ft}</span>
              </div>
              <div className="additional-param">
                <span className="additional-param-label">Taxes</span>
                <span className="additional-param-value">{activity.ffd_listingprice_pb}</span>
              </div>
            </div>
          </div>
          <div className="images">
              <div className="image">
                <a target="_blank" href={activity.ffd_featured_image} className="image-wrapper">
                  <div className="image-item" style={{ backgroundImage: `url(${activity.ffd_featured_image})` }}>
                  </div>
                </a>
              </div>
              <div className="image">
                <div className="image-wrapper">
                  <div className="bold pointer map-placeholder-wrapper map-placeholder-wrapper--with-background">
                    <span className="map-placeholder">Click for Map</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
export default Activity;
