import Home from '~/pages/Home/home';
import Courses from '~/pages/Courses/courses';
import Upload from '~/pages/Upload/upload';
import Game from '~/pages/Game/game';
import Login from '~/pages/Auth/login';
import Register from '~/pages/Auth/register';
import WordAsscociation from '../components/Games/WordAssociation/WordAss';
import WordAssIntro from '../components/Games/WordAssociation/WordAssIntro';
import WACRUD from '~/components/Games/WordAssociation/WACRUD';

//khong can Login van dung Route nay`
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/courses', component: Courses },
    { path: '/upload', component: Upload },
    { path: '/game', component: Game },
    { path: '/register', component: Register, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/word/:lessonid', component: WordAsscociation, layout: null },
    { path: '/wordassintro', component: WordAssIntro, layout: null },
    { path: '/crudwa/:lessonid', component: WACRUD, layout: null },
];

//phai Login moi dung Route nay`
const privateRoutes = [];

export { publicRoutes, privateRoutes };
