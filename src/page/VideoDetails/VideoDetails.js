import { useEffect, useRef, useState } from 'react';
import {
    CheckCircle,
    MoreVertOutlined,
    ReplyAllOutlined,
    ThumbDownOutlined,
    ThumbUpOutlined,
} from '@mui/icons-material';
import { Avatar, Button, Card, CardContent, CardMedia, Paper, styled, Tooltip, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
// import { Link, useParams } from 'react-router-dom';

import { fetchFromAPI } from '../../API/fetchFromAPI';
import { videoBasic } from '../../API/basic';
import { Link, useParams } from 'react-router-dom';
import Comment from '../../component/Comment';

const MyButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#0000000d',
    color: '#000',
    boxShadow: 'none',
    fontSize: '14px',
    fontWeight: '400',
    textTransform: 'capitalize',
    '&:hover': {
        backgroundColor: '#cccccc80',
    },

    '&:lastChild': {
        backgroundColor: '#000',
    },
}));

function VideoDetails() {
    const { id } = useParams();
    const [videos, setVideos] = useState([]);
    const [videoDetails, setVideoDetails] = useState([]);

    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        videoRef.current.play();
    };
    const handleMouseLeave = () => {
        videoRef.current.currentTime = 0;
        videoRef.current.pause();
    };

    useEffect(() => {
        try {
            fetchFromAPI(`search?relatedToVideoId=${id}&part=snippet,id&type=video`).then((data) =>
                setVideos(data.items),
            );
            fetchFromAPI(`videos?part=contentDetails,snippet,statistics&id=${id}`).then((data) =>
                setVideoDetails(data.items[0]),
            );
        } catch (error) {
            console.log('call api thất bại');
        }
    }, [id]);
    // console.log(comments);

    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} mt="24px">
            <Box sx={{ width: { md: '65%', sm: '70%' } }}>
                <Card sx={{ boxShadow: 'none', width: '100%' }}>
                    <CardMedia
                        controls
                        src={videoBasic.src}
                        component="video"
                        // image={videoDetails?.snippet?.thumbnails?.medium?.url || videoBasic.urlBasic}
                        alt={videoDetails?.snippet?.title}
                        sx={{ width: '100%', height: 'auto' }}
                    />
                    <CardContent sx={{ p: 0 }}>
                        <Typography variant="body1" fontSize="20px" fontWeight="500">
                            {videoDetails?.snippet?.title || videoBasic.title}
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" mt="12px">
                            <Stack direction="row" alignItems="center" gap={2}>
                                <Avatar />
                                <Box>
                                    <Typography variant="body1" fontSize="16px" fontWeight="500">
                                        EnjoyMusic
                                    </Typography>
                                    <Typography variant="body2" fontSize="12px">
                                        7 N người đăng ký
                                    </Typography>
                                </Box>
                                <Button variant="contained" sx={{ borderRadius: '25px' }}>
                                    Đăng ký
                                </Button>
                            </Stack>
                            <Stack direction="row" gap={2}>
                                <Stack direction="row">
                                    <Tooltip title="Tôi thích video này">
                                        <MyButton
                                            sx={{ borderRadius: '25px 0 0 25px', borderRight: '1px solid #ccc' }}
                                            variant="contained"
                                            startIcon={<ThumbUpOutlined />}
                                        >
                                            8,6 N
                                        </MyButton>
                                    </Tooltip>
                                    <Tooltip title="tôi không thích video này">
                                        <MyButton
                                            sx={{ borderRadius: '0 25px 25px 0', borderLeft: 'none' }}
                                            variant="contained"
                                        >
                                            <ThumbDownOutlined />
                                        </MyButton>
                                    </Tooltip>
                                </Stack>
                                <Tooltip title="chia sẽ">
                                    <MyButton variant="contained" startIcon={<ReplyAllOutlined />}>
                                        Chia sẻ
                                    </MyButton>
                                </Tooltip>
                                <MyButton
                                    sx={{ minWidth: '36px', minHeight: '36px', borderRadius: '50%' }}
                                    variant="contained"
                                >
                                    <MoreVertOutlined />
                                </MyButton>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
                <Box sx={{ backgroundColor: '#0000000d', borderRadius: '8px', p: '12px' }}>
                    <Typography variant="subtitle2">1,5 Tr lượt xem 4 tháng trước</Typography>
                    <Typography variant="subtitle2">#lofichill #nhacchill #lofi2022</Typography>
                    <Typography variant="body1">
                        HẠ SANG: Những Bản Lofi Việt Nhẹ Nhàng Cực Chill - Nhạc Lofi Chill Buồn Nhất 2022 - Lofi Gây
                        Nghiện Hot Nhất #lofichill #nhacchill #chill #lofi2022 #lofi nhạc trẻ chill, nhac chill, nhạc
                        chill, nhạc nhẹ nhàng, lofi chill, nhạc lofi chill
                    </Typography>
                </Box>

                <Stack mt="24px">
                    <Comment id={id} />
                </Stack>
            </Box>
            <Box sx={{ width: { md: '35%', sm: '30%' } }}>
                {videos.map((data, index) => (
                    <Paper
                        index={index}
                        sx={{
                            display: 'flex',
                            mb: '12px',
                            width: '100%',
                            height: '100px',
                            gap: '12px',
                            boxShadow: 'none',
                            cursor: 'pointer',
                        }}
                        component="div"
                        square
                    >
                        <Paper
                            component="img"
                            src={data.snippet?.thumbnails?.medium?.url || videoBasic.urlBasic}
                            sx={{ width: '50%' }}
                        />

                        <Box>
                            <Link to={data?.id?.videoId ? `/videos/${data.id.videoId}` : '/videos/vanvi'}>
                                <Typography
                                    sx={{ height: '28px', lineHeight: '14px', overflow: 'hidden' }}
                                    variant="body1"
                                    fontSize="14px"
                                >
                                    {data?.snippet?.title || videoBasic.title}
                                </Typography>
                            </Link>
                            <Link
                                to={data?.snippet?.channelId ? `/channel/${data.snippet.channelId}` : '/videos/vanvi'}
                            >
                                <Typography m="6px 0" fontSize="12px" variant="body2">
                                    {data?.snippet?.channelTitle || videoBasic.channel}
                                    <CheckCircle sx={{ color: 'blue', fontSize: '12px', ml: '5px' }} />
                                </Typography>
                            </Link>
                            <Typography fontSize="12px" variant="body2">
                                1,1tr Lượt xem 2 năm trước
                            </Typography>
                        </Box>
                    </Paper>
                ))}

                <Card
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    sx={{ width: { md: '100%', xs: '100%' }, boxShadow: 'none', display: 'flex', gap: '12px', m: 0 }}
                >
                    <Link style={{ textDecoration: 'none ' }}>
                        <CardMedia
                            ref={videoRef}
                            component="video"
                            src={videoBasic.src}
                            sx={{ width: '100%', height: '100px', borderRadius: '4px' }}
                            muted
                        />
                    </Link>
                    <CardContent sx={{ p: 0, flex: 1 }}>
                        <Link style={{ textDecoration: 'none ', color: '#000' }}>
                            <Typography
                                sx={{ height: '28px', lineHeight: '14px', overflow: 'hidden' }}
                                variant="body1"
                                fontWeight="500"
                                fontSize="14px"
                            >
                                Video Thỏ xinh xắn nhất quả đất này nè
                            </Typography>
                        </Link>
                        <Link style={{ textDecoration: 'none ', color: '#000' }}>
                            <Typography m="6px 0" fontSize="12px" variant="body2">
                                Van Vi Vlog
                                <CheckCircle sx={{ color: 'blue', fontSize: '12px', ml: '5px' }} />
                            </Typography>
                        </Link>
                        <Typography fontSize="12px" variant="body2" color="#000">
                            1tr lượt xem
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Stack>
    );
}

export default VideoDetails;
