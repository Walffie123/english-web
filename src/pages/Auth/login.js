import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from '~/components/Button/btn';
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
                    <div className={cx('box2')}>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">
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
                </div>
            </form>
        );
    }
}
