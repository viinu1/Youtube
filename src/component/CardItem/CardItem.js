import { CheckCircle } from '@mui/icons-material';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function CardItem({ data, videoBasic }) {
    return (
        <Card sx={{ width: { md: '320px', xs: '100%' }, boxShadow: 'none' }}>
            <Link to={data?.id ? `/videos/${data.id}` : '/videos/vanvi'} style={{ textDecoration: 'none ' }}>
                <CardMedia
                    image={data?.snippet?.thumbnails?.medium?.url || videoBasic.urlBasic}
                    alt={data?.snippet?.title}
                    sx={{ width: '358px', height: '180px' }}
                />
            </Link>
            <CardContent sx={{ p: 0 }}>
                <Link to={data?.id ? `/videos/${data.id}` : '/videos/vanvi'} style={{ textDecoration: 'none ' }}>
                    <Typography variant="body1" fontWeight={500} color="#000" fontSize="16px">
                        {data?.snippet?.title || videoBasic.title}
                    </Typography>
                </Link>
                <Link
                    to={data?.snippet?.channelId ? `/channel/${data.snippet.channelId}` : '/videos/vanvi'}
                    style={{ textDecoration: 'none ' }}
                >
                    <Typography variant="body1" fontWeight={300} color="#000" fontSize="16px">
                        {data?.snippet?.channelTitle || videoBasic.channel}
                        <CheckCircle sx={{ color: 'blue', fontSize: '12px', ml: '5px' }} />
                    </Typography>
                </Link>
            </CardContent>
        </Card>
    );
}

export default CardItem;
