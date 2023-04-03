import Home from '~/pages/Home/home';
import Courses from '~/pages/Courses/courses';
import Upload from '~/pages/Upload/upload';
import Game from '~/pages/Game/game';
import Login from '~/pages/Auth/login';
import Register from '~/pages/Auth/register';
import ListComponent from '~/components/Flashcards/ListComponent';
import FlashCardComponent from '~/components/Flashcards/FlashCardComponent';
import FlashCardLessonComponent from '~/components/Flashcards/FlashCardLessonComponent';
import FillInTheBlankGame from '~/pages/Game/fillinblank';
import FillInTheBlankIntro from '~/pages/Game/FillInBlankIntro';
import FillInBlankGame from '~/pages/Game/CRUDFillInBlankComponent';
import CRUDFlashCardComponent from '~/components/Flashcards/CRUDFlashCardComponent';
import CRUDFillInBlankComponent from '~/pages/Game/CRUDFillInBlankComponent';
import CourseComponent from '~/components/Course/CourseComponent';
import CourseDetailComponent from '~/components/Course/CourseDetailComponent';
import CourseCRUDComponent from '~/components/Course/CourseCRUDComponent';
import WordAssIntro from '../components/Games/WordAssociation/WordAssIntro';
import WordAssociation from '~/components/Games/WordAssociation/WordAss';
import LessonDetailComponent from '~/components/Lesson/LessonDetailComponent';
import LessonCRUDComponent from '~/components/Lesson/LessonCRUDComponent';
import { Navigate } from 'react-router';
//khong can Login van dung Route nay`

const withAuthAndRole = (Component, allowedRoles) => {
    const token = localStorage.getItem('user');
    const user = JSON.parse(token);
    const AuthRoute = (props) => {
        const token = localStorage.getItem('user');
        const user = JSON.parse(token); // Retrieve the user object from local storage
        console.log(token);
        if (!user || !user.roles[0] || !allowedRoles.includes(user.roles[0])) {
            // Redirect to the login page or show an error message
            return <Navigate to="/" />;
        }
        return <Component {...props} />;
    };
    return AuthRoute;
};

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/courses', component: Courses },
    { path: '/upload', component: Upload },
    { path: '/game', component: Game },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/fillinblank', component: FillInTheBlankIntro, layout: null },
    { path: '/fillinblank/:levelid', component: FillInTheBlankGame, layout: null },
    { path: '/flashcard', component: FlashCardComponent },
    { path: '/flashcard/:lessonid', component: FlashCardLessonComponent },
    { path: '/word/:levelid', component: WordAssociation, layout: null },
    { path: '/wordassintro', component: WordAssIntro, layout: null },,
    { path: '/loadCourse', component: CourseComponent },
    { path: '/courseDetail/:courseid', component: CourseDetailComponent },
    { path: '/courseDetail/findLesson/:lessonid', component: LessonDetailComponent },
    //private route
    { path: '/fillinblankcrud', component: withAuthAndRole(FillInBlankGame, ['ROLE_ADMIN', 'ROLE_TEACHER']) },
    {
        path: '/crudFlashCard/:lessonid',
        component: withAuthAndRole(CRUDFlashCardComponent, ['ROLE_ADMIN', 'ROLE_TEACHER']),
    },
    {
        path: '/crudFillInBlank/:levelid',
        component: withAuthAndRole(CRUDFillInBlankComponent, ['ROLE_ADMIN', 'ROLE_TEACHER']),
    },
    { path: '/courseCRUD/:teacherid', component: withAuthAndRole(CourseCRUDComponent, ['ROLE_ADMIN', 'ROLE_TEACHER']) },
    { path: '/lessonCRUD/:courseid', component: withAuthAndRole(LessonCRUDComponent, ['ROLE_ADMIN', 'ROLE_TEACHER']) },
    
];

//phai Login moi dung Route nay`
const privateRoutes = [];

export { publicRoutes, privateRoutes };
