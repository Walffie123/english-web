import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import images from '~/assets/images/Engliterature_free-file.png';
const cx = classNames.bind(styles);
export default class Login extends Component {
    render() {
        return (
            <form>
                <div>
                    <div className={cx('logo-img')}>
                        <img className={cx('logo')} src={images} alt="Engliterature"></img>
                    </div>
                    <div className="">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>
                    <div className="">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>
                    <div className="">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div className="">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        Forgot{' '}
                        <a href="#">
                            <span className="blue">password?</span>
                        </a>
                    </p>
                </div>
            </form>
        );
    }
}
