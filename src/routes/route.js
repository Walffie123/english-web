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
import CRUDFillInBlankComponent from '~/pages/Game/CRUDFillInBlankComponent';import CourseComponent from '~/components/Course/CourseComponent';
import CourseDetailComponent from '~/components/Course/CourseDetailComponent';
import WordAssIntro from '../components/Games/WordAssociation/WordAssIntro';
import WordAssociation from '~/components/Games/WordAssociation/WordAss';
import LessonDetailComponent from '~/components/Lesson/LessonDetailComponent';
//khong can Login van dung Route nay`
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/courses', component: Courses },
    { path: '/upload', component: Upload },
    { path: '/game', component: Game },
    { path: '/register', component: Register, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/fillinblank/:levelid', component: FillInTheBlankGame, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/fillinblank', component: FillInTheBlankIntro, layout: null},
    { path: '/fillinblankcrud', component: FillInBlankGame, layout: null},
    { path: '/flashcard', component: FlashCardComponent},
    { path: '/flashcard/:lessonid', component: FlashCardLessonComponent},
    { path: '/crudFlashCard/:lessonid', component: CRUDFlashCardComponent },
    { path: '/crudFillInBlank/:levelid', component: CRUDFillInBlankComponent },
    { path: '/word/:levelid', component: WordAssociation, layout: null },
    { path: '/wordassintro', component: WordAssIntro, layout: null },
    { path: '/crudFlashCard/:lessonid', component: CRUDFlashCardComponent },
    { path: '/loadCourse', component: CourseComponent },
    { path: '/courseDetail/:courseid', component: CourseDetailComponent },
    { path: '/courseDetail/findLesson/:lessonid', component: LessonDetailComponent}
    
];

//phai Login moi dung Route nay`
const privateRoutes = [];

export { publicRoutes, privateRoutes };
