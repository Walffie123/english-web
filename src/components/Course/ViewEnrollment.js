import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import styles from '../Course/CourseComponent.module.scss';

const cx = classNames.bind(styles);
export default function CourseComponent(props) {
    const [enrollment, setEnrollment] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [enrollmentsPerPage, setEnrollmentsPerPage] = useState(6);
    const baseUrl = 'http://localhost:8080'; // replace with your backend URL

    useEffect(() => {
        loadEnrollment();
    }, []);
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
        console.log(newEnrollment);
        setEnrollment(newEnrollment);
    };

    // Get current courses
    const indexOfLastEnrollment = currentPage * enrollmentsPerPage;
    const indexOfFirstEnrollment = indexOfLastEnrollment - enrollmentsPerPage;
    const currentEnrollments = enrollment.slice(indexOfFirstEnrollment, indexOfLastEnrollment);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(enrollment.length / enrollmentsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container">
            <div className="row">
                {currentEnrollments.map((enrollment, index) => (
                    <div className="col-md-4" key={enrollment.id}>
                        <Card className={cx('card')} style={{ width: '18rem' }}>
                            <Card.Body className="cardbody">
                                <Card.Text className={cx('description', 'text-center')} style={{fontSize: '24px', fontWeight: 'bold'}}>
                                    Course Name: {enrollment.name}
                                </Card.Text>
                                <Card.Text className={cx('payment')}>Price: ${enrollment.price}</Card.Text>
                                <Card.Text className={cx('payment')}>Enroll Date: {enrollment.date}</Card.Text>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant="primary" href={`courseDetail/${enrollment.courseid}`}>
                                        Course detail
                                    </Button>
                                </div>
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
