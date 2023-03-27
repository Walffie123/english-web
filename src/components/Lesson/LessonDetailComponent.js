import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from '../Lesson/LessonDetailComponent.module.scss';
import { less } from 'fontawesome';
import { Card, Button } from 'react-bootstrap';

const cx = classNames.bind(styles);
export default function CourseDetailComponent(props) {
    const [lesson, setLesson] = useState([]);
    const { lessonid } = useParams();
    const baseUrl = 'http://localhost:8080'; // replace with your backend URL

    useEffect(() => {
        loadLessonByLessonId();
    }, []);

    const loadLessonByLessonId = async () => {
        const result = await axios.get(`${baseUrl}/findLesson/${lessonid}`);
        // console.log(result.data);
        setLesson(result.data);
        console.log(lesson);
    };

    return (
        <div className="container">
            hahahaah
            <div className="row">
                <div className={cx('col-md-8', 'lesson-container')}>
                    <Card className={cx('card')} style={{ width: '30rem', margin: '10px' }}>
                        <Card.Body className="cardbody">
                            <div className={cx('lesson')}>
                                <Card.Title className={cx('cardtitle')}>Lesson: {lesson.lessonName}</Card.Title>
                                <Card.Text className={cx('cardtext')}>{lesson.content}</Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}
