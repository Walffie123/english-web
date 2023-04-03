import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import styles from '../Course/CourseComponent.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
export default function CourseComponent(props) {
    const [course, setCourse] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage, setCoursesPerPage] = useState(9);
    const [searchTerm, setSearchTerm] = useState('');
    const baseUrl = 'http://localhost:8080'; // replace with your backend URL

    useEffect(() => {
        loadCourse();
    }, []);
    const loadCourse = async () => {
        const result = await axios.get(`${baseUrl}/loadCourse`);
        // console.log(result.data);
        const newCourse = result.data.map((course) => ({
            id: course.courseID,
            name: course.courseName,
            description: course.descriptions,
            payment: course.payment,
            image: course.images,
        }));
        console.log(newCourse);
        setCourse(newCourse);
    };

    // Filter courses by name
    const filteredCourses = course.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get current courses
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredCourses.length / coursesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={cx("container")}>
             <div className="row">
                <div className="col-md-12">
                    <div className={cx('wrapper')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faMagnifyingGlass}></FontAwesomeIcon>
                    <input
                        type="text"
                        className={cx("search-bar", 'col-md-6')}
                        placeholder="  Search by course name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    </div>
                </div>
            </div>
            <div className="row">
                {currentCourses.map((course, index) => (
                    <div className="col-md-4" key={course.id}>
                        <Card className={cx('card')} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={course.image} className={cx('cardimg')} />
                            <Card.Body className={cx("cardbody")}>
                                <Card.Title className={cx('cardtitle')}>{course.name}</Card.Title>
                                <Card.Text className={cx('description')}>{course.description}</Card.Text>
                                <Card.Text className={cx('payment')}>{course.payment}$</Card.Text>
                                <Button variant="primary" href={`courseDetail/${course.id}`}>
                                    Course detail
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
            <div className="row">
                <div className="col-md-12">
                    <nav>
                        <ul className="pagination" style={
                            {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '20px',                           
                            }
                        }>
                            {pageNumbers.map((number) => (
                                <li key={number} className="page-item">
                                    <button onClick={() => paginate(number)} className="page-link">
                                        {number}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
