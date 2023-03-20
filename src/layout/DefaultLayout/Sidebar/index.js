import {
    AccessTimeOutlined,
    HistoryOutlined,
    Home,
    HomeOutlined,
    KeyboardArrowDown,
    Movie,
    MovieOutlined,
    SlideshowOutlined,
    Subscriptions,
    SubscriptionsOutlined,
    ThumbUpOutlined,
    VideoLibraryOutlined,
} from '@mui/icons-material';
import { Box, Divider, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';
import { useState } from 'react';
import SubscribeChannel from '../../../component/SubscribeChannel';

const MENU = [
    {
        title: 'Trang chủ',
        icon: <HomeOutlined />,
        iconActive: <Home />,
        to: '/',
    },
    {
        title: 'Shorts',
        iconActive: <Movie />,
        icon: <MovieOutlined />,
        to: '/shorts',
    },
    {
        title: 'Kênh đăng ký',
        iconActive: <Subscriptions />,
        icon: <SubscriptionsOutlined />,
        to: '/subrice',
    },
];

const MENUSUBNAV = [
    {
        title: 'Thư viện',
        icon: <VideoLibraryOutlined />,
    },
    {
        title: 'Video đã xem',
        icon: <HistoryOutlined />,
    },
    {
        title: 'Video của bạn',
        icon: <SlideshowOutlined />,
    },
    {
        title: 'Xem sau',
        icon: <AccessTimeOutlined />,
    },
    {
        title: 'Video đã thích',
        icon: <ThumbUpOutlined />,
    },
    {
        title: 'Thêm',
        icon: <KeyboardArrowDown />,
    },
];

const CHANNEL = [
    {
        linkAvatar: 'https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg',
        name: 'Văn Vĩ',
    },
    {
        linkAvatar: 'https://dayve.vn/wp-content/uploads/2022/02/cach-ve-nhan-vat-luffy-buoc-10.png',
        name: 'Minh Thùy',
    },
    {
        linkAvatar: 'https://voz.vn/attachments/52551361_107682720371748_3584920613975752704_n-jpg.799892/',
        name: 'Độ Mixi',
    },
    {
        linkAvatar: 'https://voz.vn/attachments/52551361_107682720371748_3584920613975752704_n-jpg.799892/',
        name: 'Độ Mixi',
    },
    {
        linkAvatar: 'https://voz.vn/attachments/52551361_107682720371748_3584920613975752704_n-jpg.799892/',
        name: 'Độ Mixi',
    },
    {
        linkAvatar: 'https://voz.vn/attachments/52551361_107682720371748_3584920613975752704_n-jpg.799892/',
        name: 'Độ Mixi',
    },
];

const MyListItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: '12px',
    padding: '8px 12px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#f1f1f199',
    },
    '&.Mui-selected': {
        backgroundColor: '#f1f1f199',
        '&:hover': {
            backgroundColor: '#f1f1f199',
        },
    },
}));

function Sidebar() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <Box sx={{ display: { xs: 'none', sm: 'block' }, margin: 0, height: '100vh' }}>
            <Box>
                <List component="ul" aria-label="main" sx={{ overflowY: 'auto', maxWidth: '100%' }}>
                    {MENU.map((menu, index) => (
                        <Link key={index} href={menu.to} sx={{ textDecoration: 'none' }}>
                            <ListItem sx={{ marginTop: '0px', padding: '0', pl: '16px' }}>
                                <MyListItemButton
                                    selected={selectedIndex === index}
                                    onClick={(event) => handleListItemClick(event, index)}
                                >
                                    <ListItemIcon sx={{ color: '#0f0f0f' }}>{menu.icon}</ListItemIcon>

                                    <ListItemText
                                        primary={menu.title}
                                        primaryTypographyProps={{ fontSize: '14px', textAlign: 'left' }}
                                    />
                                </MyListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                    <Divider variant="middle" component="hr" sx={{ textAlign: 'center', mt: '12px', mb: '12px' }} />
                    {MENUSUBNAV.map((menu, index) => {
                        const menuIndex = index + 3;
                        return (
                            <ListItem key={index} sx={{ marginTop: '0px', padding: '0', pl: '16px' }}>
                                <MyListItemButton
                                    selected={selectedIndex === menuIndex}
                                    onClick={(event) => handleListItemClick(event, menuIndex)}
                                >
                                    <ListItemIcon sx={{ color: '#0f0f0f' }}>{menu.icon}</ListItemIcon>
                                    <ListItemText primary={menu.title} primaryTypographyProps={{ fontSize: '14px' }} />
                                </MyListItemButton>
                            </ListItem>
                        );
                    })}
                    <Divider />
                    <SubscribeChannel MyListItemButton={MyListItemButton} data={CHANNEL} title="Kênh đã đăng ký" />
                </List>
            </Box>
        </Box>
    );
}

export default Sidebar;
