import PxpClient from 'pxp-client';

export function ServiceRest (url,params) {  
  /*Aqui ponemos la condicion de los params*/
  if (params == '' || params == null) {
    var respuesta = PxpClient.doRequest({
                    url: url,
                    params: {
                      start: 0,
                      limit: 50,
                    },
                  });
  } else {
    var respuesta = PxpClient.doRequest({
                    url: url,
                    params:params,
                  });
  }
   return (respuesta);
}
