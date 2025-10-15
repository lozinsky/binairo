import { isMatrixSelectionPositionPositions, MatrixSelection } from '~/lib/matrix';
import { decodeURLBase64, encodeURLBase64 } from '~/shared/url-base64';

import {
  type MatrixSelectionSerializer,
  MatrixSelectionSerializerDeserializeError,
} from './matrix-selection-serializer';

export class MatrixSelectionSerializerV1 implements MatrixSelectionSerializer {
  deserialize(data: string): MatrixSelection {
    let value: unknown;

    try {
      value = JSON.parse(decodeURLBase64(data));
    } catch (error) {
      throw new MatrixSelectionSerializerDeserializeError('Failed to deserialize matrix selection', { cause: error });
    }

    if (!isMatrixSelectionPositionPositions(value)) {
      throw new MatrixSelectionSerializerDeserializeError('Deserialized value is not a valid matrix selection');
    }

    return new MatrixSelection(value);
  }

  serialize(selection: MatrixSelection): string {
    return encodeURLBase64(JSON.stringify(selection.valueOf()));
  }
}
