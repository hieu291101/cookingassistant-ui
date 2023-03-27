import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cibGooglePlay,
  cilApple,
  cilBuilding,
  cilCarAlt,
  cilCart,
  cilDollar,
  cilFastfood,
  cilLockLocked,
  cilMenu,
  cilMug,
  cilPeople,
  cilRestaurant,
  cilSpeedometer,
  cilUser,
} from '@coreui/icons';
import { CNavItem, CNavTitle } from '@coreui/react';

const _navAdmin = [
  {
    component: CNavItem,
    name: 'Summary',
    to: '/admin/summary',
    icon: <CIcon icon={cilMenu} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Recipe Management',
  },
  {
    component: CNavItem,
    name: 'Recipe',
    to: '/admin/recipe-management/recipe',
    icon: <CIcon icon={cilRestaurant} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Ingredient',
    to: '/admin/recipe-management/ingredient',
    icon: <CIcon icon={cilApple} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Measure',
    to: '/admin/recipe-management/measure',
    icon: <CIcon icon={cilMug} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'User Management',
  },
  {
    component: CNavItem,
    name: 'Account',
    to: '/admin/account',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Other',
  },
  {
    component: CNavItem,
    name: 'Account Profile',
    to: '/admin/account-profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Change Password',
    to: '/admin/change-password',
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
  },
];

export default _navAdmin;
