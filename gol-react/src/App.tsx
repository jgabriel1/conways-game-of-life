import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { Grid } from './components/Grid';
import TopBar from './components/TopBar';
import AppProvider from './hooks';

import { theme } from './styles/theme';
import './global.css';
import { AppContainer } from './components/AppContainer';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <AppContainer>
          <TopBar />
          <Grid />
        </AppContainer>
      </AppProvider>
    </ChakraProvider>
  );
};

export default App;
