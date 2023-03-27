import Login from '~/pages/Login';
import Home from '~/pages/Home';
import Register from '~/pages/Register';
import ForgetPassword from '~/pages/ForgetPassword/ForgetPassword';
import { LayoutWithSidebar } from '~/layouts';
import RecipeList from '~/pages/Filter';
import ChangePasswordP from '~/pages/ChangePasswordP/ChangePasswordP';
import Sidebar from '~/layouts/components/Sidebar';
import StorageForm from '~/layouts/components/StorageForm/StorageForm';
import Storage from '~/pages/Storage';
import ShoppingForm from '~/layouts/components/ShoppingForm';
import Shopping from '~/pages/Shopping';
import PlannerSidebar from '~/layouts/components/PlannerSidebar';
import Planner from '~/pages/Planner';
import RecipeDetail from '~/pages/RecipeDetail';

import React from 'react';

const AdminDashboard = React.lazy(() => import('~/views/admin/dashboard/Dashboard'));
const TableAdmin = React.lazy(() => import('~/views/admin/table/RecipeTable'));
const Detail = React.lazy(() => import('~/views/admin/detail/Detail'));
const TableIngredient = React.lazy(() => import('~/views/admin/table/IngredientTable'));
const TableMeasure = React.lazy(() => import('~/views/admin/table/MeasureTable'));
const AddMeasure = React.lazy(() => import('~/views/admin/AddForm/AddMeasureForm'));
const AddIngredient = React.lazy(() => import('~/views/admin/AddForm/AddIngredientForm'));
const AddRecipe = React.lazy(() => import('~/views/admin/AddForm/AddRecipeForm'));

const routes = [
    { path: '/admin', name: 'Summary', role: 'admin', element: AdminDashboard },
    { path: '/summary', name: 'Summary', role: 'admin', element: AdminDashboard },
    { path: '/recipe-management/recipe', name: 'Recipe', role: 'admin', element: TableAdmin },
    { path: '/recipe-management/recipe/create', name: 'Create recipe', role: 'admin', element: AddRecipe },
    { path: '/recipe-management/recipe/:id', name: 'Recipe', role: 'admin', element: Detail },
    { path: '/recipe-management/ingredient', name: 'Ingredient', role: 'admin', element: TableIngredient },
    { path: '/recipe-management/ingredient/create', name: 'Create ingredient', role: 'admin', element: AddIngredient },
    { path: '/recipe-management/measure', name: 'Measure', role: 'admin', element: TableMeasure },
    { path: '/recipe-management/measure/create', name: 'Create measure', role: 'admin', element: AddMeasure },
];

const loginRoutes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/forgot-password', component: ForgetPassword },
]

//Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/filter', component: RecipeList, layout: LayoutWithSidebar, sidebar: Sidebar },
    {
        path: '/recipes/:id',
        component: PlannerSidebar,
        layout: LayoutWithSidebar,
        sidebar: RecipeDetail,
        col1md: 9,
        col2md: 3,
    },
    { path: '/user/changePassword', component: ChangePasswordP },
];

//must login to access
const privateRoutes = [
    { path: '/change-password', component: ChangePasswordP },
    { path: '/shopping', component: Shopping, layout: LayoutWithSidebar, sidebar: ShoppingForm },
    { path: '/storage', component: Storage, layout: LayoutWithSidebar, sidebar: StorageForm },
    { path: '/planner', component: Planner, layout: LayoutWithSidebar, sidebar: PlannerSidebar },
]


export { publicRoutes, privateRoutes, routes, loginRoutes  };
