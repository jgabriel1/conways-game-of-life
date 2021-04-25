import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import AppProvider from './hooks';

import { Grid } from './components/Grid';
import { TopBar } from './components/TopBar';
import { AppContainer } from './components/AppContainer';

import { theme } from './styles/theme';

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
