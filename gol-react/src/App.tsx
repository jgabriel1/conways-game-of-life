import React from 'react';

import Grid from './components/Grid';
import TopBar from './components/TopBar';
import AppProvider from './hooks';

import './global.css';

const App: React.FC = () => {
  return (
    <AppProvider>
      <TopBar />
      <Grid />
    </AppProvider>
  );
};

export default App;
