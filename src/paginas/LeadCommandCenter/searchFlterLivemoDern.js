
export const onPreviewSearchLM = (c = [], d, type=null) => {
  let coordi_lat_lng = "pts=";
  let url_preview = "http://54.227.57.214/livemodern/search/";

  let pr_fr, pr_t, pr_full;
  if (c.length > 1) {
    c.map((e) => {
      coordi_lat_lng += `${e.lat}%20${e.lng}%2C`;
    });
    coordi_lat_lng = coordi_lat_lng.slice(0, -3);

    url_preview = `${url_preview}properties?${coordi_lat_lng}&fh=999999`;

  }
  //NEW CODE
  url_preview = `${url_preview}?`;

  if (d.community_features) {
    url_preview = `${url_preview}ffd_community_features=${JSON.parse(d.community_features).data.join(';')}&`;
  }

  if (d.property_features) {
  }

  if (d.waterfront) {
    url_preview = `${url_preview}ffd_waterfront=${JSON.parse(d.waterfront).data.join(';')}&`;
  }

  if (d.view) {
    url_preview = `${url_preview}ffd_view=${JSON.parse(d.view).data.join(';')}&`;
  }

  if (d.exterior_features) {
    url_preview = `${url_preview}ffd_exterior_features=${JSON.parse(d.exterior_features).data.join(';')}&`;
  }

  if (d.interior_features) {
    url_preview = `${url_preview}ffd_interior_features=${JSON.parse(d.interior_features).data.join(';')}&`;
  }

  if (d.style) {
  }

  if (d.financing) {
  }


//NEW CODE

  if (d.listing_status) {
    url_preview = `${url_preview}ffd_status=${JSON.parse(d.listing_status).data.join(';')}&`
  }

  if (d.property_type !== '') {
    let property_type_data = "";
    for (var i = 0; i < (JSON.parse(d.property_type).data).length; i++) {
      property_type_data = property_type_data + `${(JSON.parse(d.property_type).data)[i]};`;
    }
    url_preview = `${url_preview}ffd_propertytype=${JSON.parse(d.property_type).data.join(';')}&`
  } if (d.price_from !=='' && d.price_to !== '') {
    url_preview = `${url_preview}ffd_listingprice_pb=${d.price_from} ${d.price_to}&`
  } if (d.year_build_from !== '' && d.year_build_to !== '' && d.year_build_from) {
    url_preview = `${url_preview}ffd_yearbuilt_pb=${d.year_build_from} ${d.year_build_to}&`
  } if (d.bedrooms_from !== '' && d.bedrooms_to !== '') {
    url_preview = `${url_preview}ffd_bedrooms_pb=${d.bedrooms_from} ${d.bedrooms_to}&`
  } if (d.bathrooms_from !== '' && d.bathrooms_to !== '') {
    url_preview = `${url_preview}ffd_bathrooms_pb=${d.bathrooms_from} ${d.bathrooms_to}&`
  } if (d.acreage_from !== '' && d.acreage_to !== '') {
    url_preview = `${url_preview}ffd_acres_calc=${d.acreage_from} ${d.acreage_to}&`
  } if (d.days_listed !== '') {
    url_preview = `${url_preview}ffd_days_on_market=${d.days_listed}`
  } if(d.filterMap){
    console.log('filterMap: ',d.filterMap);
    url_preview = `${url_preview}ffd_city_pb=${d.filterMap.locality.join(';')}&ffd_postalcode_pb=${d.filterMap.postal_code.join(';')}&ffd_state_pb=${d.filterMap.state.join(';')}`
  }

  if (type==='preview'){
    window.open(url_preview);
  }else if(type==='save'){    
    return(url_preview)
  }
  
};



