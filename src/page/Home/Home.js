import { Box, Paper, Stack } from '@mui/material';
import { styled } from '@mui/system';
import CardItem from '../../component/CardItem';

import { fetchFromAPI } from '../../API/fetchFromAPI';
import { useEffect, useState } from 'react';
import { videoBasic } from '../../API/basic';

// const MyListItemButton = styled(ListItemButton)(({ theme }) => ({
//     borderRadius: '6px',
//     padding: '0 12px',
//     cursor: 'pointer',
//     backgroundColor: '#f1f1f199',
// }));

const TITLE = [
    {
        name: 'Tất cả',
    },
    {
        name: 'Trực tiếp',
    },
    {
        name: 'Trò chơi',
    },
    {
        name: 'Âm nhạc',
    },
    {
        name: 'danh sách kết hợp',
    },
    {
        name: 'Hoạt hình',
    },
    {
        name: 'Trò chơi hành động phiêu lưu',
    },
    {
        name: 'Đọc rap',
    },
    {
        name: 'Bóng đá',
    },
    {
        name: 'Nấu ăn',
    },
    {
        name: 'Mới tải lên',
    },
    {
        name: 'Đã xem',
    },
    {
        name: 'Đề xuất mới nhất',
    },
];

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(1),
    flexShrink: 0,
    padding: '8px',
    backgroundColor: '#f1f1f1',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#f1f1f199',
    },
}));
const MyLink = styled('a')(({ theme }) => ({
    margin: theme.spacing(0.5),
    // flexShrink: 0,
    fontSize: '16px',
}));
function Home() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchFromAPI(`playlistItems?playlistId=RDZiQo7nAkQHU&part=snippet`).then((data) => setVideos(data.items));
    }, []);
    return (
        <>
            <Box sx={{ mb: '50px' }}>
                <Paper
                    sx={{
                        display: 'flex',
                        listStyle: 'none',
                        flexDirection: 'row',
                        pl: 0,
                        m: 0,
                        position: 'fixed',
                        overflowX: 'auto',
                        maxWidth: '100%',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        boxShadow: 'none',
                        mb: '50px',
                        zIndex: 10,
                    }}
                    component="ul"
                >
                    {TITLE.map((title, index) => (
                        <ListItem key={index}>
                            <MyLink>{title.name}</MyLink>
                        </ListItem>
                    ))}
                </Paper>
            </Box>
            <Stack direction="row" flexWrap="wrap" justifyContent="start" gap={2}>
                {videos.length > 0 ? (
                    videos.map((item, index) => (
                        <Box key={index}>
                            <CardItem key={index} data={item} />
                        </Box>
                    ))
                ) : (
                    <Box>
                        <CardItem videoBasic={videoBasic} />
                    </Box>
                )}
            </Stack>
        </>
    );
}

export default Home;
