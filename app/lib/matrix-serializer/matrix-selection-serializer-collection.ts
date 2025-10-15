import type { MatrixSelection } from '~/lib/matrix';

import { unreachable } from '~/shared/assert';
import { expectToBeDefined } from '~/shared/expect';

import {
  type MatrixSelectionSerializer,
  MatrixSelectionSerializerDeserializeError,
} from './matrix-selection-serializer';
import { MatrixSelectionSerializerV1 } from './matrix-selection-serializer-v1';
import { MatrixSelectionSerializerV2 } from './matrix-selection-serializer-v2';

const MATRIX_SELECTION_SERIALIZERS: readonly MatrixSelectionSerializer[] = [
  new MatrixSelectionSerializerV2(),
  new MatrixSelectionSerializerV1(),
];

export function deserializeMatrixSelection(data: string): MatrixSelection {
  for (const serializer of MATRIX_SELECTION_SERIALIZERS) {
    try {
      return serializer.deserialize(data);
    } catch (error) {
      if (error instanceof MatrixSelectionSerializerDeserializeError) {
        continue;
      }

      throw error;
    }
  }

  unreachable();
}

export function serializeMatrixSelection(selection: MatrixSelection) {
  return expectToBeDefined(MATRIX_SELECTION_SERIALIZERS.at(0)).serialize(selection);
}
