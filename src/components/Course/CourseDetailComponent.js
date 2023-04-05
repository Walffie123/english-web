import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from '../Course/CourseDetail.module.scss';
import { less } from 'fontawesome';
import { Card, Button } from 'react-bootstrap';

const cx = classNames.bind(styles);
export default function CourseDetailComponent(props) {
    const [course, setCourse] = useState([]);
    const [lesson, setLesson] = useState([]);
    const { courseid } = useParams();
    const baseUrl = 'http://localhost:8080'; // replace with your backend URL

    useEffect(() => {
        loadCourseById();
        loadLessonByCourseId();
    }, []);
    const loadCourseById = async () => {
        const result = await axios.get(`${baseUrl}/findCourse/${courseid}`);
        console.log(result.data);
        setCourse(result.data);
    };
    const loadLessonByCourseId = async () => {
        const result = await axios.get(`${baseUrl}/loadLesson/${courseid}`);
        // console.log(result.data);
        setLesson(result.data);
        console.log(lesson[0].lessonName);
    };

    return (
        <div className="container">
            <div className="row">
                <div className={cx('col-md-4', 'image-container')}>
                    <img className={cx('image')} src={course.images} alt="Course Image" />
                    <h3 className={cx('course-name')}>{course.courseName}</h3>
                    <p className={cx('description')}>{course.descriptions}</p>
                    <p className={cx('payment')}>{course.payment}$</p>
                    <button className={cx('enroll-btn')}>Enroll Now</button>
                </div>
                <div className={cx('col-md-8', 'lesson-container')}>
                    {lesson.map((lesson, index) => (
                        <Card className={cx('card')} style={{ width: '30rem', margin: '10px' }}>
                            <Card.Body className="cardbody">
                                <div className={cx('lesson')} key={index}>
                                    <Card.Title className={cx('cardtitle')}>
                                        Lesson {index + 1}: {lesson.lessonName}
                                    </Card.Title>
                                    <Button variant="primary" href={`findLesson/${lesson.lessonId}`}>
                                        Go to lesson
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
