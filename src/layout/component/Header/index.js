import { AccountCircle, Menu, MoreVert, SearchRounded, VideoCall } from '@mui/icons-material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
    InputBase,
    Link,
    styled,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StyleToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

const Search = styled('div')(({ theme }) => ({
    padding: '0 10px 0 0',
    width: '50%',
    caretColor: '#fff',
    display: 'none',
    alignItems: 'center',
    cursor: 'pointer',

    [theme.breakpoints.up('sm')]: {
        display: 'flex',
    },
}));
const Icons = styled(Box)(({ theme }) => ({
    // backgroundColor: 'secondary',
    display: 'none',
    alignItems: 'center',
    // justifyContent: 'space-between',
    gap: '20px',
    cursor: 'pointer',

    [theme.breakpoints.up('sm')]: {
        display: 'flex',
    },
}));
const MyInput = styled(InputBase)(({ theme }) => ({
    backgroundColor: '#121212',
    width: '100%',
    marginRight: '0',
    padding: '3px 12px',
    outline: 'none',
    border: '1px solid #303030',
    color: 'white',
    borderRadius: '40px 0 0 40px',
    fontSize: '16px',
    '&::focus': {
        borderColor: '#3ea6ff',
    },
}));

const SearchIcon = styled(SearchRounded)(({ theme }) => ({
    border: '1px solid #303030',
    color: 'white',
    borderRadius: '0 40px 40px 0',
    padding: '7px 10px',
    borderLeft: 'none',
    backgroundColor: '#ffffff14',
}));

const UserBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
        display: 'none',
    },
}));

const MyButton = styled(Button)(({ theme }) => ({
    color: '#3ea6ff',
    border: '1px solid #3ea6ff',
    '&:hover': {
        backgroundColor: '#3ea6ff66',
    },
}));

const MyLink = styled(Link)(({ theme }) => ({
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
}));

function Header() {
    const currentUser = true;
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate();

    const hanhleOnclick = () => {
        navigate(`/search/${searchResult}`);
    };

    return (
        <AppBar position="fixed">
            <StyleToolbar>
                <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <MyLink href="/">
                        <YouTubeIcon color="otherColor" fontSize="large" />
                        YouTube
                    </MyLink>
                </Typography>
                <Icons sx={{ display: 'flex', gap: '10px', cursor: 'pointer' }}>
                    <Menu sx={{ display: { xs: 'block', sm: 'none' } }} />
                    <YouTubeIcon sx={{ display: { xs: 'block', sm: 'none' }, color: 'red' }} />
                </Icons>

                <Search>
                    <MyInput placeholder="Tìm Kiếm..." onChange={(e) => setSearchResult(e.target.value)} />
                    <SearchIcon onClick={hanhleOnclick} />
                </Search>

                {!currentUser ? (
                    <Icons>
                        <>
                            <MoreVert />
                            <MyButton startIcon={<AccountCircle />}>Login</MyButton>
                        </>
                    </Icons>
                ) : (
                    <>
                        <Icons>
                            <Tooltip title="Tạo">
                                <Badge color="error">
                                    <VideoCall />
                                </Badge>
                            </Tooltip>
                            <Tooltip title="Thông báo">
                                <Badge badgeContent={2} color="error">
                                    <NotificationsNoneIcon />
                                </Badge>
                            </Tooltip>
                            <Avatar
                                sx={{ width: '30px', height: '30px' }}
                                src="https://ment-wordpress.s3.ap-southeast-1.amazonaws.com/gametop/2022/04/26044302/https-lh3-googleusercontent-com-vu20tspfwslyce0i-1024x724.jpeg"
                                alt=""
                            />
                        </Icons>
                        <UserBox>
                            <Avatar
                                sx={{ width: '30px', height: '30px' }}
                                src="https://ment-wordpress.s3.ap-southeast-1.amazonaws.com/gametop/2022/04/26044302/https-lh3-googleusercontent-com-vu20tspfwslyce0i-1024x724.jpeg"
                                alt=""
                            />
                        </UserBox>
                    </>
                )}
            </StyleToolbar>
        </AppBar>
    );
}

export default Header;
