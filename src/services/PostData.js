
export async function PostData (ruta,codSubsistema,catalogoTipo) {

      let BaseUrl = 'http://3.82.232.114/kerp/pxp/lib/rest/';

      const ruta_completa = BaseUrl+ruta;
      const params = new URLSearchParams();

      params.append('start', '0');
      params.append('limit', '50');
      params.append('sort', 'orden');
      params.append('dir', 'ASC');
      params.append('cod_subsistema', codSubsistema);
      params.append('catalogo_tipo', catalogoTipo);

      const response = await fetch(ruta_completa, {
           method: 'POST',
           body: params,
           headers: {
                   'Php-Auth-User': 'eyJjaXBoZXJ0ZXh0IjoiTEwzYmxRMW44YWNBK3ZHcWN5NW9XS0xnbXBDQXhrMzAzSjArVTdJT2E4R0I3V3NZc1BQaGVLaUV2dVlLV0dJNWY1S0doc1l1VVRWQUJWVmZENVEzMmc9PSIsIml2IjoiZDVkOWQ1YjdhOWZhZjZmMzliMjkzZTM2MzJlM2YwZjMiLCJzYWx0IjoiZjJkMjY0ODIzN2U3Y2MxZWUwYThkZDA2OTBhYThiZTU3ODk3OTA0YTU0YTRhMmZkYzMyZjhiNTA3YzQxNmRmNzIwYWRmYzZjN2U4YWU5OWE3ODFjZTRlN2RiZDVjNjkzZTE5ZWZiZDdhNmQ5NTYxYjBkMjE3YTk1ZDMxZmFjN2M1ZTUyYzYyMTZkYTg5MWFkMjQyYWE3NTk4MTNjZjAzYTkzYWYxZGRmOGMwYzcyYzMyNzJjOTczYmIxYjhlYzIxMzc0ZTA4NmJlNDEwZjA5YTg3NzFkNTRkYWEyNzJlMGYzNzljYWE4MmQ5ZjNmOWViN2JiOTAzNTZkMWJlYzNlNjVkNWJiODY3Nzk1YjZhY2EyNzc3NzhlNzVhNWFhMzE2ZjI2NTAxNmFiNjEzN2VhOGNmNGIxMWU0YzFkNTFmZTAxNzc4ZTU4ZTRiMWI1N2ZiYmQ1Y2U1YzhiZTIzNjE4MjgxNzM4OWFlMGQ3M2Q4ODIxZDM5NjE4ZjAwYjgzNDJlOTE4M2VlNmQ0YjNmM2UzZWQ2ZWUyZjU1ZTE1Yzk2YTEyOTgwZDJhNmQ2NTRhYzQ4YTgyYWEyZGVmNjg4NDhhZmNmY2FkOWY2MTdhMzZkZGEyMTIyMjExZDcxMzVmNjQzNjAxZDg1ZmRhZTI1YjFkMjE4YmU3YThkMGNmN2JlZGIiLCJpdGVyYXRpb25zIjo5OTl9',
                   'Pxp-user': 'ismael.valdivia',
                   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                   'auth-version': '1',
           }
         });

        const json = await response.json();

        return (json);



}
