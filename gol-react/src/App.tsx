import React from 'react';

import Grid from './components/Grid';
import TopBar from './components/TopBar';
import GameProvider from './hooks/game';

import './global.css';

const App: React.FC = () => {
  return (
    <GameProvider>
        <TopBar />
      <Grid />
    </GameProvider>
  );
};

export default App;
