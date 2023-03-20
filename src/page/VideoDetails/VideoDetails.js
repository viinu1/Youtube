import {
    CheckCircle,
    MoreVertOutlined,
    ReplyAllOutlined,
    SentimentVerySatisfiedOutlined,
    Sort,
    ThumbDownOutlined,
    ThumbDownSharp,
    ThumbUpOutlined,
    ThumbUpSharp,
} from '@mui/icons-material';
import { Avatar, Button, Card, CardContent, CardMedia, Input, Paper, styled, Tooltip, Typography } from '@mui/material';
import FocusTrap from '@mui/base/FocusTrap';
import { Box, Stack } from '@mui/system';
import { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
import { fetchFromAPI } from '../../API/fetchFromAPI';
import { videoBasic } from '../../API/basic';
import { useParams } from 'react-router-dom';

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
    const [inputComment, setInputComment] = useState('');
    const [open, setOpen] = useState(false);

    const [click, setClick] = useState(false);
    const [clickDislike, setClickDislike] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchFromAPI(`search?relatedToVideoId=${id}&part=snippet,id&type=video`).then((data) => setVideos(data.items));
        fetchFromAPI(`videos?part=contentDetails,snippet,statistics&id=${id}`).then((data) =>
            setVideoDetails(data.items[0]),
        );
        fetchFromAPI(`commentThreads?videoId=${id}&part=snippet`).then((data) => setComments(data.items));
    }, [id]);
    // console.log(comments);
    const handleFocus = () => {
        setOpen(true);
    };
    const handleCLose = () => {
        setOpen(false);
    };

    const handleClickLike = (id, like) => {
        // comments.forEach((comment) => (comment.id !== id ? setClick(!click) : ''));

        for (let i = 0; i < comments.length; i++) {
            if (comments[i].id === id) {
                setClick(true);
            }
        }
    };
    const handleClickDislikeLike = () => {
        setClickDislike(!clickDislike);
    };
    const handleClickDeleteLike = () => {
        setClick(false);
    };

    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} mt="24px">
            <Box sx={{ width: { md: '70%', sm: '70%' } }}>
                <Card sx={{ boxShadow: 'none' }}>
                    <CardMedia
                        image={videoDetails?.snippet?.thumbnails?.medium?.url || videoBasic.urlBasic}
                        alt={videoDetails?.snippet?.title}
                        sx={{ width: '100%', height: '400px', objectFit: 'contain' }}
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
                    <Stack mb="24px">
                        <Stack direction="row" alignItems="center" gap={3}>
                            <Typography variant="body1">{comments.length} bình luận</Typography>
                            <Button variant="text" startIcon={<Sort />}>
                                Sắp xếp theo
                            </Button>
                        </Stack>
                        <Stack direction="row" alignItems="start" gap={3}>
                            <Avatar />
                            <Box sx={{ width: '100%' }}>
                                <Input
                                    placeholder="Viết bình luận..."
                                    sx={{ width: '100%' }}
                                    onChange={(e) => setInputComment(e.target.value)}
                                    onClick={handleFocus}
                                />
                                {open && (
                                    <FocusTrap disableAutoFocus open>
                                        <Stack
                                            tabIndex={-1}
                                            direction="row"
                                            justifyContent="space-between"
                                            width="80%"
                                            mt="12px"
                                        >
                                            <SentimentVerySatisfiedOutlined />
                                            <MyButton onClick={handleCLose} variant="text" sx={{ marginLeft: 'auto' }}>
                                                hủy
                                            </MyButton>
                                            <MyButton
                                                disabled={inputComment.length > 0 ? false : true}
                                                sx={{ marginLeft: '12px' }}
                                            >
                                                Bình luận
                                            </MyButton>
                                        </Stack>
                                    </FocusTrap>
                                )}
                            </Box>
                        </Stack>
                    </Stack>
                    <Box>
                        <Stack gap={2} direction="column">
                            {comments.map((comment) => {
                                var date = new Date();

                                const dateComment = new Date(comment.snippet?.topLevelComment?.snippet?.publishedAt);
                                const Day = (d1, d2) => {
                                    let ms1 = d1.getTime();
                                    let ms2 = d2.getTime();
                                    return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
                                };
                                const result = Day(dateComment, date);
                                return (
                                    <Box sx={{ display: 'flex', gap: '10px', mb: '12px' }} key={comment.id}>
                                        <Avatar
                                            src={comment.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
                                        />
                                        <Box sx={{ marginRight: 'auto' }}>
                                            <Box>
                                                <Stack direction="row" alignItems="start" gap={1}>
                                                    <Typography variant="subtitle2">
                                                        {comment.snippet?.topLevelComment?.snippet?.authorDisplayName}
                                                    </Typography>
                                                    <Typography variant="body2">{result} Ngày trước</Typography>
                                                </Stack>
                                            </Box>
                                            <Box>
                                                <Typography variant="body1">
                                                    {comment.snippet?.topLevelComment?.snippet?.textDisplay}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Tooltip title="thích">
                                                    <Button variant="text" sx={{ p: '6px 0' }}>
                                                        {!click ? (
                                                            <ThumbUpOutlined
                                                                onClick={() =>
                                                                    handleClickLike(
                                                                        comment.id,
                                                                        comment.snippet?.topLevelComment?.snippet
                                                                            ?.likeCount,
                                                                    )
                                                                }
                                                            />
                                                        ) : (
                                                            <ThumbUpSharp onClick={handleClickDeleteLike} />
                                                        )}
                                                        {comment.snippet?.topLevelComment?.snippet?.likeCount}
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="Không thích">
                                                    <Button variant="text" onClick={handleClickDislikeLike}>
                                                        {!clickDislike ? <ThumbDownOutlined /> : <ThumbDownSharp />}
                                                    </Button>
                                                </Tooltip>
                                                <Button sx={{ textTransform: 'capitalize' }} variant="text">
                                                    Phản hồi
                                                </Button>
                                            </Box>
                                        </Box>
                                        <MoreVertOutlined />
                                    </Box>
                                );
                            })}
                        </Stack>
                    </Box>
                </Stack>
            </Box>
            <Box sx={{ width: { md: '30%', sm: '30%' } }}>
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
                            src={data?.snippet?.thumbnails?.medium?.url || videoBasic.urlBasic}
                            sx={{ width: '50%' }}
                        />
                        <Box>
                            <Typography
                                sx={{ height: '28px', lineHeight: '14px', overflow: 'hidden' }}
                                variant="body1"
                                fontSize="14px"
                            >
                                {data?.snippet?.title || videoBasic.title}
                            </Typography>
                            <Typography m="6px 0" fontSize="12px" variant="body2">
                                {data?.snippet?.channelTitle || videoBasic.channel}
                                <CheckCircle sx={{ color: 'blue', fontSize: '12px', ml: '5px' }} />
                            </Typography>
                            <Typography fontSize="12px" variant="body2">
                                1,1tr Lượt xem 2 năm trước
                            </Typography>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Stack>
    );
}

export default VideoDetails;
