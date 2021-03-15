import React from 'react';

import Grid from './components/Grid';
import GameProvider from './hooks/game';

import './global.css';

const App: React.FC = () => {
  return (
    <GameProvider>
      <Grid />
    </GameProvider>
  );
};

export default App;
