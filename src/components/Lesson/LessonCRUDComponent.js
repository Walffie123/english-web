import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from '../Lesson/LessonCRUDComponent.module.scss';
import { Modal, Button } from 'react-bootstrap';
import { faFileCirclePlus, faPenToSquare, faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);
export default function LessonCRUDComponent(props) {
    const [lesson, setLesson] = useState({
        lessonName: '',
        content: '',
        pdfFile: '',

    });
    const [toUpdateLesson, setToUpdateLesson] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [showAddLesson, setShowAddLesson] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { courseid } = useParams();
    const [isDelete, setIsDelete] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const baseUrl = 'http://localhost:8080'; // replace with your backend URL

    useEffect(() => {
        loadLesson(courseid);
    }, [isDelete, isSave, isUpdate]);

    const loadLesson = async (courseid) => {
        
        const result = await axios.get(`${baseUrl}/loadLesson/${courseid}`);
        console.log(result.data);
        setLessons(result.data);
        
    };
    console.log(lessons);

    const loadLessonById = async (lessonId) => {
        const result = await axios.get(`${baseUrl}/findLesson/${lessonId}`);
        console.log(result.data);
        console.log(result.data.content);
        setToUpdateLesson(result.data);      
    };
    console.log(toUpdateLesson.courseId);

    const addLesson = async () => {
        if (lesson.lessonName === '' || lesson.content === '' ) {
            alert('Please fill all fields');
            return;
        }
        console.log(lesson);
        const result = await axios.post(`${baseUrl}/saveLesson/${courseid}`, lesson);
        setIsSave(!isSave);
        console.log(result.data);

    };

    const updateLesson = async (lessonId) => {
        if (
            toUpdateLesson.lessonName === '' ||
            toUpdateLesson.content === ''
        ) {
            alert('Please fill all fields');
            return;
        }
        console.log(toUpdateLesson.courseId);
        const result = await axios.put(`${baseUrl}/updateLesson/${lessonId}/${courseid}`, toUpdateLesson);
        console.log(result.data);
        setToUpdateLesson({
            lessonName: '',
            content: '',
            pdfFile: '',
        });
        setIsUpdate(!isUpdate);
        setIsModalOpen(false); 
    };

    const deleteLesson = async (id) => {
        const result = await axios.delete(`${baseUrl}/deleteLesson/${id}`);
        setIsDelete(!isDelete);
        console.log(result.data);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = (lessonId) => {
        console.log(lessonId);
        setIsModalOpen(true);
        loadLessonById(lessonId);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
                <div className={cx('col-md-12')}>
                    <h1 className={cx('title')}>Lesson CRUD</h1>
                    <div className="d-flex justify-content-end">
                        <Button className={cx('add-btn')} onClick={() => setShowAddLesson(!showAddLesson)} style={
                            showAddLesson ? { backgroundColor: '#ff0000', borderColor: '#ff0000' } : { backgroundColor: '#28a745', borderColor: '#28a745' }
                        }>
                            <FontAwesomeIcon icon={faFileCirclePlus} />
                            {showAddLesson ? ' Close' : ' Add Lesson'}
                        </Button>
                    </div>
                    {showAddLesson && (
                        <div className={cx('add-lesson')}>
                            <div className={cx('form-group')}>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    id="name"
                                    placeholder="Enter name"
                                    value={lesson.lessonName}
                                    onChange={(e) => setLesson({ ...lesson, lessonName: e.target.value })}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="description">Content</label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    id="description"
                                    placeholder="Enter description"
                                    value={lesson.content}
                                    onChange={(e) => setLesson({ ...lesson, content: e.target.value })}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="level">Resource link, Drive</label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    id="level"
                                    placeholder="Enter Resource link, Drive"
                                    value={lesson.pdfFile}
                                    onChange={(e) => setLesson({ ...lesson, pdfFile: e.target.value })}
                                />
                            </div>
                            
                            <div className={cx('form-group')}>
                                <label htmlFor="level">CourseID</label>
                                <input
                                    type="text"
                                    className={cx('form-control')}
                                    id="level"
                                    placeholder="Enter CourseID"
                                    value={courseid}
                                    disabled
                                    onChange={(e) => setLesson({ ...lesson, courseId: e.target.value })}
                                />
                            </div>
                            <button className={cx('btn btn-primary')} onClick={() => addLesson()}>
                                Add Lesson
                            </button>
                        </div>
                    )}
                    <table className={cx('table table-bordered table-striped')}>
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Content</th>
                                <th scope="col">Resource link, Drive</th>
                                <th scope="col">Course ID</th>
                                <th scope="col">Action</th>
                                <th scope="col">FlashCard</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lessons.map((lesson, index) => (
                                <tr key={index}>
                                    <th scope="row">{lesson.lessonId}</th>
                                    <td><a>{lesson.lessonName}
                                    </a></td>
                                    <td>{lesson.content}</td>
                                    <td>
                                        <a className={cx('pdf-file')} href={lesson.pdfFile}>{lesson.pdfFile}</a>
                                    </td>
                                    <td>{lesson.courseId}</td>
                                    <td>
                                        <button
                                            className={cx('btn btn-primary', 'col-md-6')}
                                            onClick={() => handleOpenModal(lesson.lessonId)}
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button
                                            className={cx('btn btn-danger', 'col-md-6') }
                                            onClick={() => deleteLesson(lesson.lessonId)}
                                        >
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </button>                               
                                    </td>
                                    <td>
                                        <a href={`/crudFlashCard/${lesson.lessonId}`}>
                                        Forward <FontAwesomeIcon icon={faArrowRight} /> 
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={isModalOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Lesson</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('container')}>
                        <div className={cx('row')}>
                            <div className={cx('col-md-12')}>
                                <h1 className={cx('title')}>Update Lesson</h1>
                                <div className={cx('form-group')}>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className={cx('form-control')}
                                        id="name"
                                        placeholder="Enter name"
                                        value={toUpdateLesson.lessonName}
                                        onChange={(e) =>
                                            setToUpdateLesson({ ...toUpdateLesson, lessonName: e.target.value })
                                        }
                                    />
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="description">Content</label>
                                    <input
                                        type="text"
                                        className={cx('form-control')}
                                        id="description"
                                        placeholder="Enter content"
                                        value={toUpdateLesson.content}
                                        onChange={(e) =>
                                            setToUpdateLesson({ ...toUpdateLesson, content: e.target.value })
                                        }
                                    />
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="description">Resource Link, Drive</label>
                                    <input
                                        type="text"
                                        className={cx('form-control')}
                                        id="description"
                                        placeholder="Enter link"
                                        value={toUpdateLesson.pdfFile}
                                        onChange={(e) =>
                                            setToUpdateLesson({ ...toUpdateLesson, pdfFile: e.target.value })
                                        }
                                    />
                                </div>
                                <button
                                    className={cx('btn btn-primary')}
                                    onClick={() => updateLesson(toUpdateLesson.lessonId)}
                                >
                                    Update Lesson
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
