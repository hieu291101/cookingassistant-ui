import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    CContainer,
    CHeader,
    CHeaderBrand,
    CHeaderDivider,
    CHeaderNav,
    CHeaderToggler,
    CNavLink,
    CNavItem,
    CBadge,
    CImage,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBell, cilEnvelopeOpen, cilMenu } from '@coreui/icons';

import { AppBreadcrumb } from '~/layouts/components/index';
import { AppHeaderDropdown } from '~/layouts/components/admin/header/index';
import Tippy from '@tippyjs/react';
import images from '~/assets/images';

const AppHeader = () => {
    const dispatch = useDispatch();
    const sidebarShow = useSelector((state) => state.sidebarShow);

    return (
        <CHeader position="sticky" className="mb-4">
            <CContainer fluid>
                <CHeaderToggler className="ps-1" onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}>
                    <CIcon icon={cilMenu} size="lg" />
                </CHeaderToggler>
                {/* avatar */}
                <CHeaderBrand className="mx-auto d-md-none" to="/">
                    <img src={images.logo} alt="Logo" height={45} />
                </CHeaderBrand>
                <CHeaderNav className="d-none d-md-flex me-auto">🍓Cooking Assistant - Cookas</CHeaderNav>
                <CHeaderNav>
                    {/* notification */}
                    <CNavItem>
                        <Tippy content="Thông báo">
                            <CNavLink href="#" className="position-relative">
                                <CIcon icon={cilBell} size="lg" />
                                <CBadge color="info" className="badge-sm position-absolute start-90 translate-middle">
                                    12
                                </CBadge>
                            </CNavLink>
                        </Tippy>
                    </CNavItem>
                    {/* message */}
                    <CNavItem>
                        <Tippy content="Tin nhắn">
                            <CNavLink href="#">
                                <CIcon icon={cilEnvelopeOpen} size="lg" />
                                <CBadge
                                    color="warning"
                                    className="badge-sm position-absolute start-90 translate-middle"
                                >
                                    42
                                </CBadge>
                            </CNavLink>
                        </Tippy>
                    </CNavItem>
                </CHeaderNav>
                {/* dropdown avatar */}
                <CHeaderNav className="ms-3">
                    <AppHeaderDropdown />
                </CHeaderNav>
            </CContainer>
            <CHeaderDivider />
            <CContainer fluid>
                <AppBreadcrumb />
            </CContainer>
        </CHeader>
    );
};

export default AppHeader;
