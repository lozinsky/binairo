import { useParams } from 'react-router';

import { MatrixSelection } from '~/lib/matrix';
import { expectNotToBeNaN } from '~/shared/expect';

export function useParsedParams() {
  const params = useParams();
  const parsedParams = {
    action: params.action === undefined ? new MatrixSelection([]) : MatrixSelection.parse(params.action),
    step: expectNotToBeNaN(Number(params.step ?? '0')),
  };

  return parsedParams;
}
