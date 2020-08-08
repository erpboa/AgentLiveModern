import React, { useEffect } from "react";

  // List data table
  let pag = {start: 0, limit: 50}

  export const getData = async () => {
    pxpApi('agent_portal/Agent/listarAgent', pag)
      .then((res) => setData(res.datos))
      .catch((err) => setErrors(err));
  };

  useEffect(() => {
    getData();
  }, []);

  