import React, { createContext, useContext } from 'react';

interface DimensionsContextData {
  cellsHorizontal: number;
  cellsVertical: number;
  cellDimension: number;
}

const DimensionsContext = createContext<DimensionsContextData>(
  {} as DimensionsContextData,
);

const MINIMUM_CELL_DIMENSION = 32;

const DimensionsProvider: React.FC = ({ children }) => {
  const height = window.innerHeight - 64;
  const width = window.innerWidth - 64;

  const cellDimension = MINIMUM_CELL_DIMENSION;

  const cellsHorizontal = Math.floor(width / cellDimension);
  const cellsVertical = Math.floor(height / cellDimension);

  return (
    <DimensionsContext.Provider
      value={{ cellsHorizontal, cellsVertical, cellDimension }}
    >
      {children}
    </DimensionsContext.Provider>
  );
};

export default DimensionsProvider;

export function useDimensions() {
  return useContext(DimensionsContext);
}
