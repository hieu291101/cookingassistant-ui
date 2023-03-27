/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';

import { CCard, CCardBody, CCardHeader, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react';
import Helmet from 'src/components/helmet/helmet';

const Dashboard = () => {
  return (
    <Helmet title="Summary" role="Admin">
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex align-items-center justify-content-between">
              <strong>📈 Thống kê</strong>
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol sm={11}>
                  <CRow>
                    <CCol lg={2} md={4} xs={12}>
                      <CFormLabel htmlFor="floorNumber" className="col-form-label">
                        <b>Chọn loại thống kê</b>
                      </CFormLabel>
                    </CCol>
                    <CCol md={8} sm={12}></CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </Helmet>
  );
};

export default Dashboard;
