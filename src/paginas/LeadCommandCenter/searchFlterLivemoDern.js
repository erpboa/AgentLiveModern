export const onPreviewSearchLM = (c = [], d) => {
  let coordi_lat_lng = "pts=";
//   let url_preview = "https://search.modernlivingre.com/";
  let url_preview = "http://54.227.57.214/livemodern/search/";
  
  let pr_fr, pr_t, pr_full;
  if (c.length > 1) {
    c.map((e) => {
      coordi_lat_lng += `${e.lat}%20${e.lng}%2C`;
    });         
    coordi_lat_lng = coordi_lat_lng.slice(0, -3);    

    url_preview = `${url_preview}properties?${coordi_lat_lng}&fh=999999`;
    
  }
  
  if (d.property_type) {
  }  if (d.community_features) {
  }  if (d.property_features) {
  }  if (d.waterfront) {
  }  if (d.view) {
  }  if (d.exterior_features) {
  }  if (d.interior_features) {
  }  if (d.style) {
  }  if (d.financing) {
  }  if (d.property_features) {
  }  if (d.price_from !=='' && d.price_to !== '') {        
       pr_full = `from-${d.price_from}-under-${d.price_to}`
       url_preview = `${url_preview}real-estate/rentals/${pr_full}?fh=999999`       
  }  if(d.price_from !== '' && d.price_to === ''){    
        pr_fr = `minprice=${d.price_from}`
       url_preview = `${url_preview}properties?${pr_fr}&status=a%2Cu&fh=999999`       
  }  if (d.price_to !== '' && d.price_from === '') {
       pr_t = `maxprice=${d.price_to}`      
       url_preview = `${url_preview}properties?${pr_t}&status=a%2Cu&fh=999999`       
  }

    window.open(url_preview);
};

