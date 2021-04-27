import { GridWithImage } from '../adapters/GridWithImage';
import { CreateGameOptions, createGame } from './createGame';

interface CreateGameWithImageOptions extends CreateGameOptions {
  gridType: 'random' | 'clear';
  onImageUpdateCallback: (image: boolean[][]) => void;
}

export function createGameWithImage({
  gridHeight,
  gridWidth,
  gridType,
  onImageUpdateCallback,
  ...rest
}: CreateGameWithImageOptions) {
  let gridWithImage: GridWithImage;

  switch (gridType) {
    case 'random':
      gridWithImage = GridWithImage.createRandom({
        height: gridHeight,
        width: gridWidth,
        shouldWrapAround: rest.shouldWrapAround,
        onImageUpdateCallback,
      });
      break;

    default:
    case 'clear':
      gridWithImage = GridWithImage.create({
        height: gridHeight,
        width: gridWidth,
        shouldWrapAround: rest.shouldWrapAround,
        onImageUpdateCallback,
      });
      break;
  }

  onImageUpdateCallback(gridWithImage.getImage());

  const newGame = createGame({
    mainGridFactory: () => gridWithImage,
    gridHeight,
    gridWidth,
    ...rest,
  });

  return newGame;
}
