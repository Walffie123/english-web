import Home from '~/pages/Home/home';
import Courses from '~/pages/Courses/courses';
import Upload from '~/pages/Upload/upload';
import Game from '~/pages/Game/game';
import Login from '~/pages/Auth/login';
import Register from '~/pages/Auth/register';
import ListComponent from '~/components/Flashcards/ListComponent';
import FlashCardComponent from '~/components/Flashcards/FlashCardComponent';
import FlashCardLessonComponent from '~/components/Flashcards/FlashCardLessonComponent';
import WordAsscociation from '../components/Games/WordAssociation/WordAss';
import CRUDFlashCardComponent from '~/components/Flashcards/CRUDFlashCardComponent';
import CourseComponent from '~/components/Course/CourseComponent';
import CourseDetailComponent from '~/components/Course/CourseDetailComponent';
import CourseCRUDComponent from '~/components/Course/CourseCRUDComponent';

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
    { path: '/word', component: WordAsscociation },
    { path: '/crudFlashCard/:lessonid', component: CRUDFlashCardComponent },
    { path: '/loadCourse', component: CourseComponent },
    { path: '/courseDetail/:courseid', component: CourseDetailComponent },
    { path: '/courseCRUD/:teacherid', component: CourseCRUDComponent }
    
];

//phai Login moi dung Route nay`
const privateRoutes = [];

export { publicRoutes, privateRoutes };
