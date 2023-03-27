import React from 'react';
import { CFooter } from '@coreui/react';

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="fw-bold">Cooking Assistant COOKAS - HCM Open University</span> @ 2022
      </div>
      <div className="ms-auto">
        <span className="me-1">By</span>
        <span className="fw-bold">La Trung Hieu</span>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
