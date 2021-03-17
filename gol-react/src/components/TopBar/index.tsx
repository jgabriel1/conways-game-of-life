import React from 'react';

import { useGame } from '../../hooks/game';

import { Container, StartButton } from './styles';

const TopBar: React.FC = () => {
  const { gameIsRunning, toggleGame } = useGame();

  return (
    <Container>
      <StartButton type="button" onClick={() => toggleGame()}>
        {gameIsRunning ? 'Stop' : 'Start'}
      </StartButton>
    </Container>
  );
};

export default TopBar;
