export const onPreviewSearchLM = (c = [], d) => {
  
  // const zip_code = c
  console.log("zide_code", c);
  // const API_KEY = "AIzaSyCYke1oESLVfrWEeYf-1K2SZTYoq1Z-CWw";
  // let urlGeocodeGoogle = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
  // const r = async (lt, lg) => {
  //   const resp = await fetch(`${urlGeocodeGoogle}${lt}, ${lg}&key=${API_KEY}`)
  //   const re = await resp.json()
  //   const value = await re.results
  //   console.log("data_google",value);
  //   value.map(e => {          
  //     if(e.types[0] == 'postal_code'){
  //        e.address_components.map(d => {
  //         if(d.types[0] == 'postal_code'){                                    
  //           zip_code.push(d.long_name)                       
  //         }
  //       })      
  //     }
  //   })
    
  // }

  // const onGetGeocode = (cords) => {  
  //   cords.map(e => {    
  //       r(e.lat, e.lng)            
  //   })  
  //   return true          
  // }
  

  // async function Flow(c){
  //   const data = await onGetGeocode(c) 
  //     if(data){
  //       console.log("ssss",zip_code);
  //       // zip_code.map(e => {
  //       //   console.log("ssss",e);
  //       // })        
  //     }             
  //   }
     
    // Flow(c); 
  // window.open(`http://54.227.57.214/livemodern/search/${zip_code.toString()}`);
    // const s = ''    
    // zip_code.forEach(e => {
    //   s += ','+e
    //   console.log("cadena", e);
    // })   
    // const cadena = s.substring(1);
    // const onGet = async (a) => {
    //   console.log("aaa",a);
    //   const w = await a.toString()
    //   console.log("www", w);
    // }
    // console.log("cadena", zip_code.join(','));
  // }  

  
  
  // let coordi_lat_lng = "pts=";
//   let url_preview = "https://search.modernlivingre.com/";
  // let url_preview = "http://54.227.57.214/livemodern/search/";
  
  // let pr_fr, pr_t, pr_full;
  // if (c.length > 1) {
  //   c.map((e) => {
  //     coordi_lat_lng += `${e.lat}%20${e.lng}%2C`;
  //   });         
  //   coordi_lat_lng = coordi_lat_lng.slice(0, -3);    

  //   url_preview = `${url_preview}properties?${coordi_lat_lng}&fh=999999`;
    
  // }
  
  // if (d.property_type) {
  // }  if (d.community_features) {
  // }  if (d.property_features) {
  // }  if (d.waterfront) {
  // }  if (d.view) {
  // }  if (d.exterior_features) {
  // }  if (d.interior_features) {
  // }  if (d.style) {
  // }  if (d.financing) {
  // }  if (d.property_features) {
  // }  if (d.price_from !=='' && d.price_to !== '') {        
  //      pr_full = `from-${d.price_from}-under-${d.price_to}`
  //      url_preview = `${url_preview}real-estate/rentals/${pr_full}?fh=999999`       
  // }  if(d.price_from !== '' && d.price_to === ''){    
  //       pr_fr = `minprice=${d.price_from}`
  //      url_preview = `${url_preview}properties?${pr_fr}&status=a%2Cu&fh=999999`       
  // }  if (d.price_to !== '' && d.price_from === '') {
  //      pr_t = `maxprice=${d.price_to}`      
  //      url_preview = `${url_preview}properties?${pr_t}&status=a%2Cu&fh=999999`       
  // }

    // window.open(url_preview);
};

