import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense, useCallback, useEffect } from 'react';
import { DefaultLayout } from './layouts';
import { Fragment } from 'react';
import './scss/style.scss';
// import { logOut } from './actions/auth';
// import AuthVerify from './common/AuthVerify';
// import eventBus from './common/EvenBus';
import { publicRoutes, privateRoutes, loginRoutes } from './routes';
import ProtectRoute from './components/ProtectRoute';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from './features/authSlice';
import AuthVerify from './common/AuthVerify';
import Page404 from './pages/page404';
import { getAllMeasure } from './features/measureSlice';
import MeasureApi from './api/measureApi';

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);

const AdminLayout = React.lazy(() => import('./layouts/AdminLayout'));

function App() {
    const { data: user, isLoggedIn, loading } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllMeasure())
    }, [])
    
    const logOut = useCallback(() => {
        dispatch(logoutUser());
    }, [dispatch]);

    return (
        <Router>
            <div className="App">
                <Suspense fallback={loading}>
                    <Routes>
                        
                        {/* Route for deny logged user*/}
                        <Route element={<ProtectRoute redirectPath="/" isAllowed={!isLoggedIn} />}>
                            {loginRoutes.map((route, index) => {
                                const Page = route.component;

                                let Layout = DefaultLayout;
                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout
                                                sidebar={route.sidebar}
                                                col1md={route.col1md}
                                                col2md={route.col2md}
                                            >
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Route>

                        {/* Route for anonymous user*/}
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout sidebar={<route.sidebar />} col1md={route.col1md} col2md={route.col2md}>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}

                        {/* Route for logged user*/}
                        <Route
                            element={
                                <ProtectRoute
                                    isAllowed={
                                        !!user && (user.roles.includes('ROLE_USER') || user.roles.includes('ROLE_ADMIN'))
                                    }
                                />
                            }
                        >
                            {privateRoutes.map((route, index) => {
                                const Page = route.component;

                                let Layout = DefaultLayout;
                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout sidebar={<route.sidebar />}>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Route>

                        {/* Route for admin routes */}
                        <Route
                            element={
                                <ProtectRoute
                                    redirectPath="/"
                                    isAllowed={!!user && user.roles.includes('ROLE_ADMIN')}
                                />
                            }
                        >
                            <Route path="/admin/*" name="AdminDashboard" element={<AdminLayout />} />
                        </Route>

                        {/* Route 404 */}
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </Suspense>
            </div>
            <AuthVerify logOut={logOut} />
        </Router>
    );
}

export default App;
