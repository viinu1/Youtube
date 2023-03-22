import {
    MoreVertOutlined,
    SentimentVerySatisfiedOutlined,
    Sort,
    ThumbDownOutlined,
    ThumbDownSharp,
    ThumbUpOutlined,
    ThumbUpSharp,
} from '@mui/icons-material';
import { Avatar, Box, Button, Input, Stack, Typography, Tooltip } from '@mui/material';
import FocusTrap from '@mui/base/FocusTrap';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { fetchFromAPI } from '../../API/fetchFromAPI';

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
function Comment({ id }) {
    const [inputComment, setInputComment] = useState('');
    const [open, setOpen] = useState(false);

    const [click, setClick] = useState(false);
    const [clickDislike, setClickDislike] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchFromAPI(`commentThreads?videoId=${id}&part=snippet`).then((data) => setComments(data.items));
    });

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
        <>
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
                                <Avatar src={comment.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} />
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
                                        <Typography
                                            variant="body1"
                                            sx={{ height: '48px', lineHeight: '16px', overflow: 'hidden' }}
                                        >
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
                                                                comment.snippet?.topLevelComment?.snippet?.likeCount,
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
        </>
    );
}

export default Comment;
