import { CheckCircle } from '@mui/icons-material';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchFromAPI } from '../../API/fetchFromAPI';

// import { videoBasic } from '../../API/basic';
function Search({ data }) {
    const { id } = useParams();
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetchFromAPI(`search?q=${id}&part=snippet,id&regionCode=US&order=date`).then((data) => setResults(data.items));
    }, [id]);
    console.log(results);
    return (
        <Stack mt="16px" ml="24px" gap={2}>
            {results.map((item, index) => (
                <Paper
                    sx={{
                        display: 'flex',
                        mb: '12px',
                        width: '100%',
                        height: '220px',
                        gap: '12px',
                        boxShadow: 'none',
                        cursor: 'pointer',
                    }}
                    component="div"
                    square
                    key={index}
                >
                    <Paper component="video" src={item.snippet?.thumbnails?.high?.url} sx={{ width: '30%' }} />

                    <Box>
                        <Link
                            to={item?.id ? `/videos/${item.id.videoId}` : `/videos/vanvi`}
                            style={{ textDecoration: 'none', color: '#000' }}
                        >
                            <Typography
                                sx={{ height: '44px', lineHeight: '22px', overflow: 'hidden', mt: '12px' }}
                                variant="h5"
                                fontSize="18px"
                                fontWeight="400"
                            >
                                {item.snippet?.title}
                            </Typography>
                        </Link>
                        <Typography fontSize="12px" variant="body2" fontWeight="400" m="6px 0">
                            1,1tr Lượt xem 2 năm trước
                        </Typography>
                        <Typography fontSize="12px" variant="body2" m="12px 0">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Avatar src={item.snippet?.thumbnails?.default?.url} sx={{ width: 24, height: 24 }} />
                                <Typography fontSize="12px" variant="body2">
                                    {item.snippet?.channelTitle}
                                </Typography>
                                <CheckCircle sx={{ width: 14, height: 14 }} />
                            </Box>
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ height: '12px', lineHeight: '12px', overflow: 'hidden', mb: '24px' }}
                            fontSize="12px"
                            fontWeight="400"
                        >
                            {item.snippet?.description}
                        </Typography>
                        <button style={{ backgroundColor: '#ccc', border: 'none', cursor: 'pointer' }}>4k</button>
                    </Box>
                </Paper>
            ))}
        </Stack>
    );
}

export default Search;
