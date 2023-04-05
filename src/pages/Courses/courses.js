import React from 'react';
import CourseComponent from '~/components/Course/CourseComponent';
import classNames from 'classnames/bind';
import clsx from 'clsx';
import styles from './Courses.module.scss';
const cx = classNames.bind(styles);

function Courses() {
    return (
        <div className={cx('course-wrap')}>
            <CourseComponent />
        </div>
    );
}

export default Courses;