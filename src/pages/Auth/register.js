import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Auth.module.scss';
import Button from '~/components/Button/btn';
import images from '~/assets/images/Engliterature_free-file.png';
const cx = classNames.bind(styles);
export default class Register extends Component {
    render() {
        return (
            <div className = {cx('auth-body')} >
            <form>
                <div>
                    <div className={cx('logo-img')}>
                        <img className={cx('logo')} src={images} alt="Engliterature"></img>
                    </div>
                    <div className="">
                        <label>User Name</label>
                        <input type="text" className="form-control" placeholder="User Name" />
                    </div>
                    <div className="">
                        <label>Full Name</label>
                        <input type="text" className="form-control" placeholder="Full Name" />
                    </div>
                    <div className="">
                        <label>Email address</label>
                        <div>
                            <input
                                FontAwesomeIcon={faUser}
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                            />
                        </div>
                    </div>
                    <div className="">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <div className="">
                        <label>Address</label>
                        <input type="Address" className="form-control" placeholder="Enter Address" />
                    </div>
                    <label for="level" style={{ marginTop: '20px' }}>
                        Select Level:
                    </label>
                    <select name="level" id="level">
                        <option></option>
                        <option value="1">Grade 6</option>
                        <option value="2">Grade 7</option>
                        <option value="3">Grade 8</option>
                        <option value="4">Grade 9</option>
                    </select>

                    <div className={cx('box2')}>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className={cx('remember')} htmlFor="customCheck1">
                                I have read and accpet the{' '}
                                <span style={{ textDecoration: 'underline', color: 'blue' }}>terms and conditions</span>
                            </label>
                        </div>
                    </div>
                    <div className={cx('submit-login')}>
                        <Button submit>Register</Button>
                    </div>
                    <p style={{ textAlign: 'center' }}>
                        Already registered ? <a href="/login">Sign Up</a>
                    </p>
                </div>
            </form>
            </div>
        );
    }
}
