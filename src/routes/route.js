import Home from '~/pages/Home/home';
import Courses from '~/pages/Courses/courses';
import Upload from '~/pages/Upload/upload';
import Game from '~/pages/Game/game';
import Login from '~/pages/Auth/login';
import Register from '~/pages/Auth/register';
import ListComponent from '~/components/ListComponent';
import FlashCardComponent from '~/components/FlashCardComponent';
import FlashCardLessonComponent from '~/components/FlashCardLessonComponent';
//khong can Login van dung Route nay`
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/courses', component: Courses },
    { path: '/upload', component: Upload },
    { path: '/game', component: Game },
    { path: '/register', component: Register, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/list', component: ListComponent },
    { path: '/flashcard', component: FlashCardComponent},
    { path: '/flashcard/:lessonid', component: FlashCardLessonComponent},
];

//phai Login moi dung Route nay`
const privateRoutes = [];

export { publicRoutes, privateRoutes };
