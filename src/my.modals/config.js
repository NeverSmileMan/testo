import React from 'react';

export const exampleInstanceName = 'modal/example';

export default {
  [exampleInstanceName]: React.lazy(() => import('../functional-buttons/modal.wind/modal.close')),
};