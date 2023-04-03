import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "../Course/CourseDetail.module.scss";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles);
export default function CourseDetailComponent(props) {
    const [course, setCourse] = useState([]);
    const [reviews, setReviews] = useState([]);
    const { courseid } = useParams();
    const baseUrl = 'http://localhost:8080'; // replace with your backend URL
    const enrollmentTime = moment();
    const reviewTime = moment();
    const [review, setReview] = useState('');
    const [editing, setEditing] = useState(false);
    const [chosenReview, setChosenReview] = useState(null);
    const [editReviewContent, setEditReviewContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEnrollOpen, setIsModalEnrollOpen] = useState(false);
    const [isModalEnrolledOpen, setIsModalEnrolledOpen] = useState(false);

    useEffect(() => {
        loadCourseById();
        findReviewByCourseId();
    }, []);
    const loadCourseById = async () => {
        const result = await axios.get(`${baseUrl}/findCourse/${courseid}`);
        console.log(result.data);
        setCourse(result.data);
    }
    const findReviewByCourseId = async () => {
        const result = await axios.get(`${baseUrl}/findReviewByCourseId/${courseid}`);
        console.log(result.data);
        setReviews(result.data);
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

    return (
        <div className="container">
            <div className="row">
                <div className={cx("col-md-4", "image-container")}>
                    <img className={cx("image")} src={course.images} alt="Course Image" />
                    <h3 className={cx("course-name")}>Name: {course.courseName}</h3>
                    <p className={cx("description")}>Description: {course.descriptions}</p>
                    <p className={cx("payment")}>Price: {course.payment}$</p>
                    <p className={cx("payment")}>Teacher Name: {course.teacher?.fullName}</p>
                    <button className={cx("enroll-btn")} onClick={() => {enrollCourse()}}>Enroll Now</button>
                    <button className={cx("enroll-btn")}>
                        <Link to="/viewenrollment/1">View all of your ongoing course</Link></button>
                </div>
                <textarea placeholder="Enter your review here" value={review} onChange={handleReviewChange} />
                <button className={cx("enroll-btn")} onClick={handleSendReview}>Send</button>
                <div className="col-md-8">
                    <ul>
                        {reviews.map((review) => (
                            <li key={review.reviewId}>
                                {review.reviewId == chosenReview ? (
                                    <div>
                                        <textarea value={editReviewContent} onChange={handleEditReviewContentChange} />
                                        <button onClick={handleCancel}>X</button>
                                        <button onClick={() => handleEditReview(review.reviewId)}>OK</button>
                                    </div>
                                ) : (
                                    <div>
                                        <p>
                                            <span className={cx("reviewer-name")}>{review.studentName}</span>
                                            <span className={cx("review-time")}>{review.reviewTime}</span>
                                            <button className={cx("review-button")} onClick={() => {
                                                handleEdit(review.reviewId);
                                                handleEditReviewContent(review.reviewContent);
                                            }}>
                                                Edit
                                            </button>

                                            <button className={cx("review-button")} onClick={() => handleDeleteReview(review.reviewId)}>
                                                Delete
                                            </button>
                                        </p>
                                        <p>{review.reviewContent}</p></div>
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