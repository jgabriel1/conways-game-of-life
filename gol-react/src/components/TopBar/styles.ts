import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.header`
  background: #a5a5d1;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const StartButton = styled.button`
  border: 0;
  outline: none;
  background: #a5a5d1;
  font-family: sans-serif;
  padding: 0 20px;
  font-size: 16px;
  color: #fff;
  transition: background-color 200ms;
  width: 128px;

  &:hover {
    background: ${shade(0.1, '#a5a5d1')};
  }
`;
