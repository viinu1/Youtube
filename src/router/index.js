import Home from '../page/Home';
import Shorts from '../page/Shorts';
import Subrice from '../page/Subrice';
import VideoDetails from '../page/VideoDetails';
import { HeaderOnly } from '../layout';
import Search from '../page/Search/Search';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/shorts',
        component: Shorts,
    },
    {
        path: '/subrice',
        component: Subrice,
    },
    {
        path: `/videos/:id`,
        component: VideoDetails,
        layout: HeaderOnly,
    },
    {
        path: `/search/:id`,
        component: Search,
    },
];

export { publicRoutes };
