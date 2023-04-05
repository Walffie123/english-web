import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./CourseDetail.module.scss";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';


const cx = classNames.bind(styles);
export default function CourseDetailComponent(props) {
    const moment = require('moment-timezone');
    const [course, setCourse] = useState([]);
    const [reviews, setReviews] = useState([]);
    const { courseid } = useParams();
    const baseUrl = 'http://localhost:8080'; // replace with your backend URL
    const enrollmentTime = moment();
    const reviewTime = moment().tz('Asia/Ha_Noi');
    const [review, setReview] = useState('');
    const [editing, setEditing] = useState(false);
    const [chosenReview, setChosenReview] = useState(null);
    const [editReviewContent, setEditReviewContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEnrollOpen, setIsModalEnrollOpen] = useState(false);
    const [isModalEnrolledOpen, setIsModalEnrolledOpen] = useState(false);
    const [enrollment, setEnrollment] = useState([]);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [lesson, setLesson] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            await loadEnrollment();
            await loadCourseById();
        };
        loadData();
        findReviewByCourseId();
        loadLessonByCourseId();
    }, []);

    useEffect(() => {
        checkEnrollment(enrollment, course);
    }, [enrollment, course]);

    const loadEnrollment = async () => {
        const result = await axios.get(`${baseUrl}/findEnrollmentByStudentId/1`);
        // console.log(result.data);
        const newEnrollment = result.data.map((enrollment) => ({
            id: enrollment.enrollmentId,
            courseid: enrollment.courseId,
            name: enrollment.courseName,
            price: enrollment.payment,
            date: new Date(enrollment.enrollmentTime).toLocaleDateString("vi-VN")
        }));
        setEnrollment(newEnrollment);
        console.log("Enrollment: ", enrollment);
    };
    const loadCourseById = async () => {
        const result = await axios.get(`${baseUrl}/findCourse/${courseid}`);
        setCourse(result.data);
        console.log("Course: ", course);
    }
    const findReviewByCourseId = async () => {
        const result = await axios.get(`${baseUrl}/findReviewByCourseId/${courseid}`);
        const newReview = result.data.map((review) => ({
            reviewId: review.reviewId,
            studentName: review.studentName,
            reviewContent: review.reviewContent,
            reviewTime: new Date(review.reviewTime).toLocaleDateString("vi-VN"),
            reviewHour: `${new Date(review.reviewTime).getHours()}:${new Date(review.reviewTime).getMinutes()}:${new Date(review.reviewTime).getSeconds()}`
        }));
        console.log(newReview);
        setReviews(newReview);
    }
    const enrollCourse = async () => {
        const enrollmentData = {
            enrollmentTime: enrollmentTime.toJSON(),
            isFinished: "false"
        };
        console.log(enrollmentData);
        axios.post(`http://localhost:8080/saveEnrollment/${courseid}/1`, enrollmentData)
            .then(response => {
                console.log(response);
                setIsModalEnrolledOpen(true);
                setIsEnrolled(true);
            })
            .catch(error => {
                console.log(error);
                setIsModalEnrollOpen(true);
            });
    };
    const handleReviewChange = (event) => {
        setReview(event.target.value);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsModalEnrollOpen(false);
        setIsModalEnrolledOpen(false);
    }

    const handleSendReview = async () => {
        if (review.trim() === '') {
            setIsModalOpen(true);
            return;
        }
        const sendData = {
            reviewContent: review,
            reviewTime: reviewTime.toJSON()
        };
        console.log(sendData);
        axios.post(`${baseUrl}/saveReview/${course.courseID}/1`, sendData)
            .then(response => {
                // Xử lý kết quả trả về từ backend (nếu có)
                console.log(response.data);
                findReviewByCourseId();
                setReview("");
            })
            .catch(error => {
                // Xử lý lỗi khi gửi request đến backend
                console.error(error);
            });
    }

    const handleEdit = (reviewId) => {
        setChosenReview(reviewId);
    };

    const handleEditReviewContent = (reviewContent) => {
        setEditReviewContent(reviewContent);
        console.log(reviewContent);
    }
    const handleEditReviewContentChange = (event) => {
        setEditReviewContent(event.target.value);
    }
    function checkEnrollment(enrollment, course) {
        console.log('Checking enrollment...');
        console.log("Enrollment trong checkEnrollment: ", enrollment);
        console.log("Course trong checkEnrollment: ", course);
        enrollment.forEach(item => {
            console.log('Checking enrollment2...');
            console.log(item.courseid);
            console.log(course.courseID);
            if (item.courseid == course.courseID) {
                setIsEnrolled(true);
                console.log(isEnrolled);
            }
        });
    }

    const handleCancel = () => {
        setChosenReview(null);
    };

    const handleEditReview = async (reviewId) => {
        const sendData = {
            reviewContent: editReviewContent,
            reviewTime: reviewTime.toJSON()
        };
        console.log(sendData);
        axios.put(`${baseUrl}/updateReview/${reviewId}`, sendData)
            .then(response => {
                // Xử lý kết quả trả về từ backend (nếu có)
                console.log(response.data);
                findReviewByCourseId();
                setReview("");
                handleCancel();
            })
            .catch(error => {
                // Xử lý lỗi khi gửi request đến backend
                console.error(error);
            });
    }

    const handleDeleteReview = async (reviewId) => {
        axios.delete(`${baseUrl}/deleteReview/${reviewId}`)
            .then(response => {
                // Xử lý kết quả trả về từ backend (nếu có)
                findReviewByCourseId();
            })
            .catch(error => {
                // Xử lý lỗi khi gửi request đến backend
                console.error(error);
            });
    }
    const loadLessonByCourseId = async () => {
        const result = await axios.get(`${baseUrl}/loadLesson/${courseid}`);
        // console.log(result.data);
        setLesson(result.data);
        console.log(lesson[0].lessonName);
    };

    return (
        <div className={cx("container-course-detail")}>
            <div className={cx("row")}>
                <div className={cx("col-md-4", "image-container")}>
                    <img className={cx("image")} src={course.images} alt="Course Image" />
                    <h3 className={cx("course-name")}>Name: {course.courseName}</h3>
                    <p className={cx("description")}>Description: {course.descriptions}</p>
                    <p className={cx("payment")}>Price: {course.payment}$</p>
                    <p className={cx("payment")}>Teacher Name: {course.teacher?.fullName}</p>
                    <button className={cx("enroll-btn")} onClick={() => { enrollCourse() }}>
                        {isEnrolled ? "Enrolled" : "Enroll Now"}
                    </button>
                    <button className={cx("enroll-btn")} style={{ marginTop: "20px", marginBottom: "50px", color: "white" }}>
                        <Link to="/viewenrollment/1">View all of your ongoing course</Link>
                    </button>
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
            <div className="row">
                <textarea placeholder="Enter your review here"
                    style={{ width: "80%", height: "100px" }} value={review} onChange={handleReviewChange} />
                <FontAwesomeIcon icon={faPaperPlane} className={cx("enroll-btn")} onClick={handleSendReview} size="3x" style={{ width: "20px" }} />


                <div className="col-md-8">
                    <ul>
                        {reviews.map((review) => (
                            <li key={review.reviewId}>
                                {review.reviewId == chosenReview ? (
                                    <div style={{ textAlign: "left", marginTop: "50px" }}>
                                        <textarea style={{ width: "80%", height: "70px" }} value={editReviewContent} onChange={handleEditReviewContentChange} />
                                        <button className={cx("review-button")} style={{ float: "right"}} onClick={() => handleEditReview(review.reviewId)}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </button>

                                        <button className={cx("review-button")} style={{ float: "right"}} onClick={() => {
                                            handleCancel()
                                        }}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </div>

                                ) : (
                                    <div style={{ marginTop: 40 }}>
                                        <div className={cx("review-info")} style={{ textAlign: "left" }}>
                                            <span className={cx("reviewer-name")}>
                                                <b>{review.studentName} </b>
                                            </span>&nbsp;
                                            &nbsp;
                                            <span className={cx("review-time")} style={{ opacity: 0.7 }}>
                                                {review.reviewTime} {review.reviewHour}
                                            </span>
                                        </div>


                                        <button className={cx("review-button")} style={{ float: "right", marginTop: "-20px" }} onClick={() => handleDeleteReview(review.reviewId)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>

                                        <button className={cx("review-button")} style={{ float: "right", marginTop: "-20px" }} onClick={() => {
                                            handleEdit(review.reviewId);
                                            handleEditReviewContent(review.reviewContent);
                                        }}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>

                                        <p style={{ marginTop: 7, width: '80%', textAlign: "left" }}>{review.reviewContent}</p>
                                    </div>

                                )}
                            </li>
                        ))}

                    </ul>
                </div>
            </div>
            <Modal show={isModalOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Please write something before sending!</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>OK</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={isModalEnrollOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>You have already enrolled this course!</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>OK</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={isModalEnrolledOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Enroll Successfully!</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>OK</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}