import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from '../Lesson/LessonDetailComponent.module.scss';
import { less } from 'fontawesome';
import { Card, Button } from 'react-bootstrap';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';



export default function CourseDetailComponent(props) {
    const cx = classNames.bind(styles);

    const [lesson, setLesson] = useState([]);
    const [pdfPath, setPdfPath] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const { lessonid } = useParams();
    const baseUrl = 'http://localhost:8080'; // replace with your backend URL

    const loadLessonByLessonId = async (lessonid) => {
        const result = await axios.get(`${baseUrl}/findLesson/${lessonid}`);
        setLesson(result.data);
        setPdfPath(result.data.pdfFile);
    };
    
    console.log(lesson.pdfFile);
    // console.log(pdfPath);
    useEffect(() => {
        loadLessonByLessonId(lessonid);
    }, []);

   

    return (
        <div className="container">
            <div className="row">
                <div className={cx('col-md-8', 'lesson-container')}>   
                            <div className={cx('lesson')}>
                                <h1>Lesson: {lesson.lessonName}</h1>
                               
                                {
                                    pdfPath && (
                                      <a href={pdfPath} target="_blank">Click here to open PDF file</a>  
                                    )
                                }
                                
                                <p>{lesson.content}</p>
                            </div>
                    <Button href={`/flashcard/${lessonid}`}>Flash Card</Button>
                </div>
            </div>
        </div>
    );
}