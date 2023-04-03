import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "../Course/CourseDetail.module.scss";

const cx = classNames.bind(styles);
export default function CourseDetailComponent(props) {
    const [course, setCourse] = useState([]);
    const { courseid } = useParams();
    const baseUrl = 'http://localhost:8080'; // replace with your backend URL

    useEffect(() => {
        loadCourseById();
    }, []);
    const loadCourseById = async () => {
        const result = await axios.get(`${baseUrl}/findCourse/${courseid}`);
        console.log(result.data);
        setCourse(result.data);
    }

    return (
        <div className="container">
            <div className="row">
        <div className={cx("col-md-4", "image-container")}>
          <img className={cx("image")} src={course.images} alt="Course Image" />
          <h3 className={cx("course-name")}>{course.courseName}</h3>
          <p className={cx("description")}>{course.descriptions}</p>
          <p className={cx("payment")}>{course.payment}$</p>
          <button className={cx("enroll-btn")}>Enroll Now</button>
        </div>
          
      </div>
        </div>
    )   
}