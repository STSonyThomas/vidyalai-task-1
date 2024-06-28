import React from 'react';
import { IsSmallerDeviceProvider } from '../components/context/IsSmallerDeviceProvider';

const App = ({ Component, pageProps }) => (
  <React.Fragment>
    <IsSmallerDeviceProvider>
      <Component {...pageProps} />
    </IsSmallerDeviceProvider>
  </React.Fragment>
);

export default App;
