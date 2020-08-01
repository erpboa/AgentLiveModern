class PXPConfig {
   config = {     "host": "3.82.232.114",
                  "baseUrl": "kerp/pxp/lib/rest",
                  "mode": "cors",
                  "port": "80",
                  "protocol": 'http',
                  "backendRestVersion": 2,
                  "initWebSocket": 'NO',
                  "portWs": '8010'
            }

}
const config = new PXPConfig();
export default config;
