import React, {useState, useEffect} from "react";
import classNames from "classnames/bind";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import styles from "../Course/CourseComponent.module.scss";

const cx = classNames.bind(styles);
export default function CourseComponent(props) {
    const [course, setCourse] = useState([]);
    const baseUrl = 'http://localhost:8080'; // replace with your backend URL

    useEffect(() => {
        loadCourse();
    }, []);
    const loadCourse = async () => {
        const result = await axios.get(`${baseUrl}/loadCourse`);
        // console.log(result.data);
        const newCourse = result.data.map((course) => ({
            id : course.courseID,
            name : course.courseName,
            description : course.descriptions,
            payment : course.payment,
            image : course.images
        }));
        console.log(newCourse);
        setCourse(newCourse);
    }

    return (
        <div className="container">
            <div className="row">
                {course.map((course, index) => (
                    <div className="col-md-4" key={course.id}>
                        <Card className={cx("card")} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={course.image} className={cx("cardimg")} />
                            <Card.Body className="cardbody">
                                <Card.Title className={cx("cardtitle")}>{course.name}</Card.Title>
                                <Card.Text className={cx("description" )}>
                                    {course.description}
                                </Card.Text>
                                <Card.Text className={cx("payment")}>
                                    {course.payment}$
                                </Card.Text>
                                <Button variant="primary" href={`courseDetail/${course.id}`}>Course detail</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );        
}