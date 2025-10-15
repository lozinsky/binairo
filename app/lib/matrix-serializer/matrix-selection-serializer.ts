import type { MatrixSelection } from '~/lib/matrix';

export interface MatrixSelectionSerializer {
  deserialize(data: string): MatrixSelection;
  serialize(selection: MatrixSelection): string;
}

export class MatrixSelectionSerializerDeserializeError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);

    this.name = 'MatrixSelectionSerializerDeserializeError';
  }
}
