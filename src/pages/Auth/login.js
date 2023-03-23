import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styles from './Auth.module.scss';
import Button from '~/components/Button/Btn';
import images from '~/assets/images/Engliterature_free-file.png';
const cx = classNames.bind(styles);
export default class Login extends Component {
    render() {
        return (
            <div className={cx('form-body')}>
                <form>
                    <div className={cx('form-container')}>
                        <div className={cx('logo-img')}>
                            <img className={cx('logo')} src={images} alt="Engliterature"></img>
                        </div>
                        <div className="">
                            <label for="inputfield">User Name</label>
                            <div>
                                <div>
                                    <div className={cx('input-group')}>
                                        <input
                                            type="user"
                                            className={cx('form-control')}
                                            placeholder="Enter user name"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>
                        <div className={cx('box2')}>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className={cx('remember')} htmlFor="customCheck1">
                                    Remember me
                                </label>
                            </div>
                            <p className={cx('forgot')}>
                                Forgot <a href="#">password?</a>
                            </p>
                        </div>
                        <div className={cx('submit-login')}>
                            <Button submit>Submit</Button>
                        </div>
                        <div className={cx('sign-in')}>
                            Dont Have Account?<a href="/register"> Sign In Now</a>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
