import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { Grid } from './components/Grid';
import TopBar from './components/TopBar';
import AppProvider from './hooks';

import { theme } from './styles/theme';
import './global.css';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <TopBar />
        <Grid />
      </AppProvider>
    </ChakraProvider>
  );
};

export default App;
