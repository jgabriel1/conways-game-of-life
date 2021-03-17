import styled from 'styled-components';

interface CellContainerProps {
  isAlive: boolean;
  dimension: number;
}

export const Container = styled.div<CellContainerProps>`
  width: ${props => props.dimension}px;
  height: ${props => props.dimension}px;
  border: 1px solid #9993;

  background: ${props => (props.isAlive ? '#333' : '#ddd')};
`;
