import { Link } from 'react-router-dom';
import Button from '~/components/Button/btn';
import classNames from 'classnames/bind';
import styles from './teacher.module.scss';

const cx = classNames.bind(styles);

const teachers = [
    {
        name: 'John Smith',
        quote: 'Learning English is like unlocking a whole new world of possibilities.',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        name: 'Jane Doe',
        quote: "English is not just a language, it's a key to success.",
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
        name: 'Peter Lee',
        quote: "Learning a language is not just about grammar, it's about understanding a culture.",
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
        name: 'Sarah Kim',
        quote: 'Speaking English can open doors to new opportunities and experiences.',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
        name: 'David Brown',
        quote: 'Practice makes perfect, keep practicing your English every day!',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
];

function TeacherCard(props) {
    const { name, quote, image } = props.teacher;
    return (
        <div className={cx('teacher-card')}>
            <img className={cx('teacher-imag')} src={image} alt={name} />
            <div className={cx('teacher-quot')}>{quote}</div>
            <div className={cx('teacher-name')}>{name}</div>
        </div>
    );
}

function Teacher() {
    return (
        <div className={cx('teacher-container')}>
            <h1>English Teachers</h1>
            <div className={cx('teacher-list')}>
                {teachers.map((teacher, index) => (
                    <TeacherCard key={index} teacher={teacher} />
                ))}
            </div>
        </div>
    );
}

export default Teacher;
