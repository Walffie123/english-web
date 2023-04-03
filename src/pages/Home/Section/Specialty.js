import React from 'react';
import classNames from 'classnames/bind';
import styles from './Specialty.module.scss';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import axios from 'axios';
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

export default function Specialty() {
    const [course, setCourse] = useState([]);
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
            payment: course.payment,
            image: course.images,
        }));
        console.log(newCourse);
        setCourse(newCourse);
    };
    let settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: 'linear',
        autoplay: true,
    };
    return (
        <div className={cx('specialty-slide-container')}>
            <Slider {...settings}>
                {course.map((course, index) => (
                    <div key={course.id} className={cx('slide-content')}>
                        <a courses href={`courseDetail/${course.id}`}>
                            <Card className={cx('card')}>
                                {/* <Card.Img src={studying} className={cx('cardimg')} /> */}
                                <Card.Body className={cx('cardbody')}>
                                    <Card.Title className={cx('cardtitle')}>{course.name}</Card.Title>
                                    <Card.Text className={cx('payment')}>{course.payment}$</Card.Text>
                                    <p>100% degree</p>
                                </Card.Body>
                            </Card>
                        </a>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
