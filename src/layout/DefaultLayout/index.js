import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import Header from '../component/Header';
import Sidebar from './Sidebar';

function DefaultLayout({ children }) {
    return (
        <Box>
            <Header />
            <Stack mt="64px" direction={'row'} justifyContent="space-between">
                <Sidebar />
                <Box flex={4}>{children}</Box>
            </Stack>
        </Box>
    );
}

export default DefaultLayout;
