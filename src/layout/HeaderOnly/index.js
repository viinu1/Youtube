import { Container, Stack } from '@mui/material';
import { Box } from '@mui/system';
import Header from '../component/Header';

function HeaderOnly({ children }) {
    return (
        <Container>
            <Header />
            <Stack mt="62px">
                <Box>{children}</Box>
            </Stack>
        </Container>
    );
}

export default HeaderOnly;
