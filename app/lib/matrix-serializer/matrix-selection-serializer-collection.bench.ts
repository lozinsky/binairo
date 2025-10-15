import { bench } from 'vitest';

import { MatrixSelectionSerializerV1 } from './matrix-selection-serializer-v1';
import { MatrixSelectionSerializerV2 } from './matrix-selection-serializer-v2';

bench('deserializes v1', () => {
  new MatrixSelectionSerializerV1().deserialize(
    'W3sieCI6MSwieSI6MX0seyJ4IjoxMCwieSI6MTB9LHsieCI6MTAwLCJ5IjoxMDB9LHsieCI6MTAwMCwieSI6MTAwMH0seyJ4IjoxMDAwMCwieSI6MTAwMDB9XQ',
  );
});

bench('deserializes v2', () => {
  new MatrixSelectionSerializerV2().deserialize('1-1-10-10-100-100-1000-1000-10000-10000');
});
