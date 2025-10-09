import { bench } from 'vitest';

import { BoardSerializerV1 } from './board-serializer-v1';
import { BoardSerializerV2 } from './board-serializer-v2';

bench('deserializes v1', () => {
  new BoardSerializerV1().deserialize(
    'W1tbMSwyXSxbMCwwXSxbMSwwXSxbMCwxXSxbMCwwXSxbMCwxXV0sW1swLDBdLFsxLDFdLFswLDFdLFsxLDBdLFswLDBdLFswLDFdXSxbWzEsMV0sWzEsMF0sWzEsMF0sWzEsMV0sWzAsMV0sWzEsMF1dLFtbMSwwXSxbMSwxXSxbMCwwXSxbMSwxXSxbMCwxXSxbMCwwXV0sW1sxLDFdLFswLDBdLFswLDFdLFswLDBdLFswLDBdLFswLDFdXSxbWzAsMF0sWzEsMV0sWzAsMV0sWzAsMF0sWzEsMV0sWzAsMF1dXQ',
  );
});

bench('deserializes v2', () => {
  new BoardSerializerV2().deserialize('6-120010010001001101100001111010110110101100110100110001000001001101001100');
});
