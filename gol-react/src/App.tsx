import React from 'react';

import Grid from './components/Grid';
import GameProvider from './hooks/game';

const App: React.FC = () => {
  return (
    <GameProvider>
      <Grid />
    </GameProvider>
  );
};

export default App;
