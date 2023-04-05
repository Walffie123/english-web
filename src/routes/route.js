import Home from '~/pages/Home/home';
import Courses from '~/pages/Courses/courses';
import Upload from '~/pages/Upload/upload';
import Game from '~/pages/Game/game';
import Login from '~/pages/Auth/login';
import Register from '~/pages/Auth/register';
import ListComponent from '~/components/Flashcards/ListComponent';

import FlashCardLessonComponent from '~/components/Flashcards/FlashCardLessonComponent';
import WordAsscociation from '../components/Games/WordAssociation/WordAss';
import HangManInfo from '../components/Games/HangMan/HangManInfo';
import HangManGameComponent from '../components/Games/HangMan/getData';
import CreateHangMan from '../components/Games/HangMan/CRUDHangManComponent';
import FillInTheBlankGame from '~/pages/Game/fillinblank';
import FillInTheBlankIntro from '~/pages/Game/FillInBlankIntro';
import FillInBlankGame from '~/pages/Game/CRUDFillInBlankComponent';
import CRUDFillInBlankComponent from '~/pages/Game/CRUDFillInBlankComponent';
import CourseComponent from '~/components/Course/CourseComponent';
import CourseDetailComponent from '~/components/Course/CourseDetailComponent';
import CourseCRUDComponent from '~/components/Course/CourseCRUDComponent';
import ViewCourseComponent from '~/components/Course/ViewCourse';
import ViewEnrollmentComponent from '~/components/Course/ViewEnrollment';
import CRUDFlashCardComponent from '~/components/Flashcards/CRUDFlashCardComponent';
import WordAssIntro from '../components/Games/WordAssociation/WordAssIntro';
import WACRUD from '~/components/Games/WordAssociation/WACRUD';
import WordAssociation from '~/components/Games/WordAssociation/WordAss';
import LessonDetailComponent from '~/components/Lesson/LessonDetailComponent';
import LessonCRUDComponent from '~/components/Lesson/LessonCRUDComponent';
import ViewScore from '~/pages/User/viewScore';
import AccountCRUD from '~/pages/Auth/AccountCRUD';
import { Navigate } from 'react-router';
import Teacher from '~/pages/Professional Education/Teacher';
import Profile from '~/pages/Auth/Profile';
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
    { path: '/game', component: Game },
    { path: '/login', component: Login, layout: null },
    { path: '/word', component: WordAsscociation },
    { path: '/hangmaninfo', component: HangManInfo, layout:null},
    { path: '/hangman', component: HangManGameComponent, layout:null},
    { path: '/crudHangMan/:levelid', component: CreateHangMan, layout:null},
    { path: '/loadCourse', component: CourseComponent },
    { path: '/courseDetail/:courseid', component: CourseDetailComponent},
    { path: '/viewenrollment/courseDetail/:courseid', component: CourseDetailComponent },
    { path: '/courseCRUD/:teacherid', component: CourseCRUDComponent },
    { path: '/viewcourse/:teacherid', component: ViewCourseComponent },
    { path: '/viewenrollment/:studentid', component: ViewEnrollmentComponent },
    { path: '/word/:lessonid', component: WordAsscociation, layout: null },
    { path: '/wordassintro', component: WordAssIntro, layout: null },
    { path: '/crudwa/:lessonid', component: WACRUD, layout: null },
    { path: '/list', component: ListComponent },
    { path: '/teacher', component: Teacher },
    { path: '/flashcard/:lessonid', component: FlashCardLessonComponent },
    { path: '/word/:levelid', component: WordAsscociation, layout: null },

    { path: '/register', component: Register, layout: null },
    { path: '/fillinblank', component: FillInTheBlankIntro, layout: null },
    { path: '/fillinblank/:levelid', component: FillInTheBlankGame, layout: null },
    { path: '/loadCourse', component: CourseComponent },
    { path: '/viewenrollment/courseDetail/findLesson/:lessonid', component: LessonDetailComponent },
    { path: '/courseDetail/:courseid', component: CourseDetailComponent },
    { path: '/courseDetail/findLesson/:lessonid', component: LessonDetailComponent },
    //private route

    { path: '/profile', component: withAuthAndRole(Profile, ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_USER']) },
    { path: '/AccountCRUD', component: withAuthAndRole(AccountCRUD, ['ROLE_ADMIN']) },
    { path: '/fillinblankcrud', component: withAuthAndRole(FillInBlankGame, ['ROLE_ADMIN', 'ROLE_TEACHER']) },
    {
        path: '/crudFlashCard/:lessonid',
        component: withAuthAndRole(CRUDFlashCardComponent, ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_USER']),
    },
    {
        path: '/crudFillInBlank/:levelid',
        component: withAuthAndRole(CRUDFillInBlankComponent, ['ROLE_ADMIN', 'ROLE_TEACHER']),
    },
    {
        path: '/courseCRUD/:teacherid',
        component: withAuthAndRole(CourseCRUDComponent, ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_USER']),
    },
    { path: '/viewscore/:userid', component: ViewScore },
    { path: '/lessonCRUD/:courseid', component: withAuthAndRole(LessonCRUDComponent, ['ROLE_ADMIN', 'ROLE_TEACHER']) },
];

//phai Login moi dung Route nay`
const privateRoutes = [];

export { publicRoutes, privateRoutes };
