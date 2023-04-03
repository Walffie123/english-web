import Home from '~/pages/Home/home';
import Courses from '~/pages/Courses/courses';
import Upload from '~/pages/Upload/upload';
import Game from '~/pages/Game/game';
import Login from '~/pages/Auth/login';
import Register from '~/pages/Auth/register';
import WordAsscociation from '../components/Games/WordAssociation/WordAss';
import HangManInfo from '../components/Games/HangMan/HangManInfo';
import HangManGameComponent from '../components/Games/HangMan/getData';
import CreateHangMan from '../components/Games/HangMan/CRUDHangManComponent';
import CourseComponent from '~/components/Course/CourseComponent';
import CourseDetailComponent from '~/components/Course/CourseDetailComponent';
import CourseCRUDComponent from '~/components/Course/CourseCRUDComponent';
import ViewCourseComponent from '~/components/Course/ViewCourse';
import ViewEnrollmentComponent from '~/components/Course/ViewEnrollment';

//khong can Login van dung Route nay`
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/courses', component: Courses },
    { path: '/upload', component: Upload },
    { path: '/game', component: Game },
    { path: '/register', component: Register, layout: null },
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
    { path: '/viewenrollment/:studentid', component: ViewEnrollmentComponent }
];

//phai Login moi dung Route nay`
const privateRoutes = [];

export { publicRoutes, privateRoutes };
