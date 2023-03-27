import React, { Component, useState } from 'react';
import classNames from 'classnames/bind';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styles from './Auth.module.scss';
import Button from '~/components/Button/btn';
import images from '~/assets/images/Engliterature_free-file.png';
import axios from 'axios';
const cx = classNames.bind(styles);

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function SendLoginRequest() {
        console.log(username);
        console.log(password);

        const loginDto = {
            usernameOrEmail: username,
            password: password,
        };

        axios
            .post('//localhost:8080/api/auth/signin', loginDto)
            .then((response) => {
                // status 200 la login thanh cong, nen them session hay token chi chi do vo day
                if (response.status === 200) window.location.href = '/';
                else return Promise.reject('Invalid login');
            })
            .catch((message) => {
                alert(message);
            });
    }

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
                                        placeholder="Enter user name or"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
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
                        <Button submit type="button" onClick={() => SendLoginRequest()}>
                            Submit
                        </Button>
                    </div>
                    <div className={cx('sign-in')}>
                        Dont Have Account?<a href="/register"> Sign Up Now</a>
                    </div>
                </div>
            </form>
        </div>
    );
}