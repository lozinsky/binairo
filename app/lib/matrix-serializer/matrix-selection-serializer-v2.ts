import { isMatrixSelectionPosition, MatrixSelection, type MatrixSelectionPosition } from '~/lib/matrix';

import {
  type MatrixSelectionSerializer,
  MatrixSelectionSerializerDeserializeError,
} from './matrix-selection-serializer';

export class MatrixSelectionSerializerV2 implements MatrixSelectionSerializer {
  deserialize(data: string): MatrixSelection {
    if (data === '') {
      throw new MatrixSelectionSerializerDeserializeError('Invalid matrix selection length');
    }

    const positions: MatrixSelectionPosition[] = [];
    const coords = data.split('-');

    for (let index = 0; index < coords.length; index += 2) {
      const position = {
        x: Number(coords[index]),
        y: Number(coords[index + 1]),
      };

      if (!isMatrixSelectionPosition(position)) {
        throw new MatrixSelectionSerializerDeserializeError('Invalid matrix selection position');
      }

      positions.push(position);
    }

    return new MatrixSelection(positions);
  }

  serialize(selection: MatrixSelection): string {
    return selection
      .valueOf()
      .flatMap((position) => [position.x, position.y])
      .join('-');
  }
}
