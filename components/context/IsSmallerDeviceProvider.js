import { React, createContext, useState, useEffect, useLayoutEffect } from "react";


const initialState = {
    isSmallerDevice: false,
    setIsSmallerDevice: () => null,
}

export const IsSmallerDeviceContext = createContext(initialState);

export const IsSmallerDeviceProvider = ({children}) => {
    const [isSmallerDevice, setIsSmallerDevice] = useState(false);
    const [providerInit, setProviderInit] = useState(false); 
    useLayoutEffect(() => {
        const handleResize = () => {
          const width = window.innerWidth;
          setIsSmallerDevice(width < 500);
        };
    
        handleResize();
        setProviderInit(true);
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    return (
        <IsSmallerDeviceContext.Provider value={{isSmallerDevice, setIsSmallerDevice}}>
            {providerInit && children} 
        </IsSmallerDeviceContext.Provider>
    )
}