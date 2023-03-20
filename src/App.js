import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { publicRoutes } from './router';
import { DefaultLayout } from './layout';
import { Fragment } from 'react';
import { Box } from '@mui/material';

function App() {
    return (
        <BrowserRouter>
            <Box>
                <Routes>
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
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Box>
        </BrowserRouter>
    );
}

export default App;
