import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from '../User/CourseCRUD.module.scss';

const cx = classNames.bind(styles);
export default function CourseCRUDComponent(props) {
    const baseUrl = 'http://localhost:8080'; // replace with your backend URL
    const [enrollment, setEnrollment] = useState([]);
    const [score, setScore] = useState([]);
    useEffect(() => {
        loadEnrollment();
        loadScore();
    }, []);
    const loadEnrollment = async () => {
        const result = await axios.get(`${baseUrl}/findEnrollmentByStudentId/1`);
        // console.log(result.data);
        const newEnrollment = result.data.map((enrollment) => ({
            id: enrollment.enrollmentId,
            courseid: enrollment.courseId,
            level: enrollment.level,
            name: enrollment.courseName,
            price: enrollment.payment,
            date: new Date(enrollment.enrollmentTime).toLocaleDateString("vi-VN")
        }));
        console.log(newEnrollment);
        setEnrollment(newEnrollment);
    };
    const loadScore = async () => {
        const result = await axios.get(`${baseUrl}/findResultByStudentId/1`);
        // console.log(result.data);
        const newScore = result.data.map((score) => ({
            id: score.resultId,
            score: score.score,
            courseid: score.courseId,
            coursename: score.courseName,
            lessonname: score.lessonName,
            date: new Date(score.resultTime).toLocaleDateString("vi-VN")
        }));
        console.log(newScore);
        setScore(newScore);
    };


    console.log("score:", score);

    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
                <div className={cx('col-md-12')}>
                    <h1 className={cx('title')}>Score from all courses</h1>
                    <h2>Level 1 Course</h2>
                    <div>
                        {enrollment.filter((enrollmentItem) => enrollmentItem.level == 1).length > 0 ? (
                            <div>
                                {enrollment.filter((enrollmentItem) => enrollmentItem.level == 1).map((filteredEnrollmentItem) => (
                                    <div key={filteredEnrollmentItem.id}>
                                        <ul>{filteredEnrollmentItem.name}: </ul>
                                        {score.filter((scoreItem) => scoreItem.courseid == filteredEnrollmentItem.courseid).length > 0 ? (
                                            <div>
                                                <br />
                                                <table style={{ width: '30%', border: '1px solid black' }}>
                                                    <thead>
                                                        <tr>
                                                            <th>Lesson Name</th>
                                                            <th>Score</th>
                                                            <th>Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {score.filter((scoreItem) => scoreItem.courseid == filteredEnrollmentItem.courseid).map((filteredScoreItem) => (
                                                            <tr key={filteredScoreItem.id}>
                                                                <td>{filteredScoreItem.lessonname}</td>
                                                                <td>{filteredScoreItem.score}</td>
                                                                <td>{filteredScoreItem.date}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <p style={{ marginLeft: '40px' }}>You haven't done any exam in this course.</p>

                                        )}
                                        <br />
                                    </div>
                                ))}
                            </div>) : (<p>You haven't enroll any course in this level.</p>)}
                    </div>
                    <h2>Level 2 Course</h2>
                    <div>
                        {enrollment.filter((enrollmentItem) => enrollmentItem.level == 2).length > 0 ? (
                            <div>
                                {enrollment.filter((enrollmentItem) => enrollmentItem.level == 2).map((filteredEnrollmentItem) => (
                                    <div key={filteredEnrollmentItem.id}>
                                        <ul>{filteredEnrollmentItem.name}: </ul>
                                        {score.filter((scoreItem) => scoreItem.courseid == filteredEnrollmentItem.courseid).length > 0 ? (
                                            <div>
                                                <br />
                                                <table style={{ width: '50%', border: '1px solid black' }}>
                                                    <thead>
                                                        <tr>
                                                            <th>Lesson Name</th>
                                                            <th>Score</th>
                                                            <th>Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {score.filter((scoreItem) => scoreItem.courseid == filteredEnrollmentItem.courseid).map((filteredScoreItem) => (
                                                            <tr key={filteredScoreItem.id}>
                                                                <td>{filteredScoreItem.lessonname}</td>
                                                                <td>{filteredScoreItem.score}</td>
                                                                <td>{filteredScoreItem.date}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <p style={{ marginLeft: '40px' }}>You haven't done any exam in this course.</p>
                                        )}
                                        <br />
                                    </div>
                                ))}
                            </div>) : (<p>You haven't enroll any course in this level.</p>)}
                    </div>
                    <h2>Level 3 Course</h2>
                    <div>
                        {enrollment.filter((enrollmentItem) => enrollmentItem.level == 3).length > 0 ? (
                            <div>
                                {enrollment.filter((enrollmentItem) => enrollmentItem.level == 3).map((filteredEnrollmentItem) => (
                                    <div key={filteredEnrollmentItem.id}>
                                        <ul>{filteredEnrollmentItem.name}: </ul>
                                        {score.filter((scoreItem) => scoreItem.courseid == filteredEnrollmentItem.courseid).length > 0 ? (
                                            <div>
                                                <br />
                                                <table style={{ width: '50%', border: '1px solid black' }}>
                                                    <thead>
                                                        <tr>
                                                            <th>Lesson Name</th>
                                                            <th>Score</th>
                                                            <th>Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {score.filter((scoreItem) => scoreItem.courseid == filteredEnrollmentItem.courseid).map((filteredScoreItem) => (
                                                            <tr key={filteredScoreItem.id}>
                                                                <td>{filteredScoreItem.lessonname}</td>
                                                                <td>{filteredScoreItem.score}</td>
                                                                <td>{filteredScoreItem.date}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <p style={{ marginLeft: '40px' }}>You haven't done any exam in this course.</p>
                                        )}
                                        <br />
                                    </div>
                                ))}
                            </div>) : (<p>You haven't enroll any course in this level.</p>)}
                    </div>
                    <h2>Level 4 Course</h2>
                    <div>
                        {enrollment.filter((enrollmentItem) => enrollmentItem.level == 4).length > 0 ? (
                            <div>
                                {enrollment.filter((enrollmentItem) => enrollmentItem.level == 4).map((filteredEnrollmentItem) => (
                                    <div key={filteredEnrollmentItem.id}>
                                        <ul>{filteredEnrollmentItem.name}: </ul>
                                        {score.filter((scoreItem) => scoreItem.courseid == filteredEnrollmentItem.courseid).length > 0 ? (
                                            <div>
                                                <br />
                                                <table style={{ width: '50%', border: '1px solid black' }}>
                                                    <thead>
                                                        <tr>
                                                            <th>Lesson Name</th>
                                                            <th>Score</th>
                                                            <th>Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {score.filter((scoreItem) => scoreItem.courseid == filteredEnrollmentItem.courseid).map((filteredScoreItem) => (
                                                            <tr key={filteredScoreItem.id}>
                                                                <td>{filteredScoreItem.lessonname}</td>
                                                                <td>{filteredScoreItem.score}</td>
                                                                <td>{filteredScoreItem.date}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <p style={{ marginLeft: '40px' }}>You haven't done any exam in this course.</p>
                                        )}
                                        <br />
                                    </div>
                                ))}
                            </div>) : (<p>You haven't enroll any course in this level.</p>)}
                    </div>
                </div>
            </div>
        </div>
    );





}