/****************************************************************************************
 *@file useModalInsert.js
 *@author  (breydi vasquez )
 *@date 07-08-2020
 *@description Componente  useModal
 *****************************************************************************************/

import { useState } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);

    function toggle() {
        setIsShowing(!isShowing);
    }

    return {
        isShowing,
        toggle,
    }
};

export default useModal;