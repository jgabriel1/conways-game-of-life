import React from 'react';

import DimensionsProvider from './dimension';
import GameProvider from './game';

const AppProvider: React.FC = ({ children }) => {
  return (
    <DimensionsProvider>
      <GameProvider>{children}</GameProvider>
    </DimensionsProvider>
  );
};

export default AppProvider;
