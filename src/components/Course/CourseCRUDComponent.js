import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from '../Course/CourseCRUD.module.scss';
import { Modal, Button } from 'react-bootstrap';

const cx = classNames.bind(styles);
export default function CourseCRUDComponent(props) {
    const [course, setCourse] = useState({
        courseName: '',
        descriptions: '',
        payment: '',
        images: '',
        level: {
            levelId: '',
        },
        teacher: {
            userId: '',
        },
    });
    const [toUpdateCourse, setToUpdateCourse] = useState({
        courseName: '',
        descriptions: '',
        payment: '',
        images: '',
        level: {
            levelId: '',
        },
        teacher: {
            userId: '',
        },
    });
    const [courses, setCourses] = useState([]);
    const [showAddCourse, setShowAddCourse] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { teacherid } = useParams();
    const baseUrl = 'http://localhost:8080'; // replace with your backend URL

    useEffect(() => {
        loadCourse(teacherid);
    }, []);

    const loadCourse = async (teacherid) => {
        //Vai bua them vao la findCourseByTeacherId
        const result = await axios.get(`${baseUrl}/findCourseByTeacherId/${teacherid}`);
        console.log(result.data);
        setCourses(result.data);
    };

    const loadCourseById = async (courseId) => {
        const result = await axios.get(`${baseUrl}/findCourse/${courseId}`);
        console.log(result.data);
        setToUpdateCourse(result.data);
    };

    const addCourse = async (teacherId) => {
        if (course.courseName === '' || course.descriptions === '' || course.payment === '' || course.images === '') {
            alert('Please fill all fields');
            return;
        }
        console.log(course);
        const result = await axios.post(`${baseUrl}/saveCourse/${teacherId}`, course);
        console.log(result.data);
        loadCourse();
    };

    const updateCourse = async (courseId) => {
        if (
            toUpdateCourse.courseName === '' ||
            toUpdateCourse.descriptions === '' ||
            toUpdateCourse.payment === '' ||
            toUpdateCourse.images === ''
        ) {
            alert('Please fill all fields');
            return;
        }
        const result = await axios.put(
            `${baseUrl}/updateCourse/${courseId}/${toUpdateCourse.teacher.userId}`,
            toUpdateCourse,
        );
        console.log(result.data);
        loadCourse();
    };

    const deleteCourse = async (id) => {
        const result = await axios.delete(`${baseUrl}/deleteCourse/${id}`);
        console.log(result.data);
        loadCourse();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = (courseId) => {
        console.log(courseId);
        setIsModalOpen(true);
        loadCourseById(courseId);
    };

    useEffect(() => {
        loadCourse();
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
                <div className={cx('col-md-12')}>
                    <h1 className={cx('title')}>Course CRUD</h1>
                    <div className="d-flex justify-content-end">
                        <Button className={cx('add-btn')} onClick={() => setShowAddCourse(!showAddCourse)}>
                            Add Course
                        </Button>
                    </div>
                    {showAddCourse && (
                        <div className={cx('add-course')}>
                            <div className={cx('form-group')}>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    id="name"
                                    placeholder="Enter name"
                                    value={course.courseName}
                                    onChange={(e) => setCourse({ ...course, courseName: e.target.value })}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    id="description"
                                    placeholder="Enter description"
                                    value={course.descriptions}
                                    onChange={(e) => setCourse({ ...course, descriptions: e.target.value })}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="payment">Payment</label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    id="payment"
                                    placeholder="Enter payment"
                                    value={course.payment}
                                    onChange={(e) => setCourse({ ...course, payment: e.target.value })}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="image">Image</label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    id="image"
                                    placeholder="Enter image"
                                    value={course.images}
                                    onChange={(e) => setCourse({ ...course, images: e.target.value })}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="level">Level</label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    id="level"
                                    placeholder="Enter level"
                                    value={course.level.levelId}
                                    onChange={(e) => setCourse({ ...course, level: { levelId: e.target.value } })}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="teacher">Teacher</label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    id="teacher"
                                    placeholder="Enter teacher"
                                    value={course.teacher.userId}
                                    onChange={(e) => setCourse({ ...course, teacher: { userId: e.target.value } })}
                                />
                            </div>
                            <button className={cx('btn btn-primary')} onClick={() => addCourse(course.teacher.userId)}>
                                Add Course
                            </button>
                        </div>
                    )}
                    <table className={cx('table table-bordered table-striped')}>
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Payment</th>
                                <th scope="col">Image</th>
                                <th scope="col">Level</th>
                                <th scope="col">Teacher</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, index) => (
                                <tr key={index}>
                                    <th scope="row">{course.courseID}</th>
                                    <td><a style={
                                        {
                                            color: 'blue',
                                        }
                                    } href={`/courseDetail/${course.courseID}`}>{course.courseName}
                                    </a></td>
                                    <td>{course.descriptions}</td>
                                    <td>{course.payment}</td>
                                    <td>{course.images}</td>
                                    <td>{course.levelId}</td>
                                    <td>{course.teacherId}</td>
                                    <td>
                                        <button
                                            className={cx('btn btn-primary')}
                                            onClick={() => handleOpenModal(course.courseID)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className={cx('btn btn-danger')}
                                            onClick={() => deleteCourse(course.courseID)}
                                        >
                                            Delete
                                        </button>                               
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={isModalOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('container')}>
                        <div className={cx('row')}>
                            <div className={cx('col-md-12')}>
                                <h1 className={cx('title')}>Update Course</h1>
                                <div className={cx('form-group')}>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className={cx('form-control')}
                                        id="name"
                                        placeholder="Enter name"
                                        value={toUpdateCourse.courseName}
                                        onChange={(e) =>
                                            setToUpdateCourse({ ...toUpdateCourse, courseName: e.target.value })
                                        }
                                    />
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        className={cx('form-control')}
                                        id="description"
                                        placeholder="Enter description"
                                        value={toUpdateCourse.descriptions}
                                        onChange={(e) =>
                                            setToUpdateCourse({ ...toUpdateCourse, descriptions: e.target.value })
                                        }
                                    />
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="payment">Payment</label>
                                    <input
                                        type="text"
                                        className={cx('form-control')}
                                        id="payment"
                                        placeholder="Enter payment"
                                        value={toUpdateCourse.payment}
                                        onChange={(e) =>
                                            setToUpdateCourse({ ...toUpdateCourse, payment: e.target.value })
                                        }
                                    />
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="image">Image</label>
                                    <input
                                        type="text"
                                        className={cx('form-control')}
                                        id="image"
                                        placeholder="Enter image"
                                        value={toUpdateCourse.images}
                                        onChange={(e) =>
                                            setToUpdateCourse({ ...toUpdateCourse, images: e.target.value })
                                        }
                                    />
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="level">Level</label>
                                    <input
                                        type="text"
                                        className={cx('form-control')}
                                        id="level"
                                        placeholder="Enter level"
                                        value={toUpdateCourse.level.levelId}
                                        onChange={(e) =>
                                            setToUpdateCourse({ ...toUpdateCourse, level: { levelId: e.target.value } })
                                        }
                                    />
                                </div>
                                <button
                                    className={cx('btn btn-primary')}
                                    onClick={() => updateCourse(toUpdateCourse.courseID)}
                                >
                                    Update Course
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
