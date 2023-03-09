import classNames from 'classnames/bind';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    return (
        // <div>
        //     <h1>Login</h1>
        // </div>
        <section>
            <div className={cx('form-box')}>
                <div className={cx('form-value')}>
                    <form action="">
                        <h2>Login</h2>
                        <div className={cx('inputbox')}>
                            <input type="email" required></input>
                            <label for="">Email</label>
                        </div>
                        <div className={cx('inputbox')}>
                            <input type="password" required></input>
                            <label for="">Password</label>
                        </div>
                        <div className={cx('inputbox')}>
                            <label for="">
                                <input type="checkbox">
                                    Remember Me <a href="/register">Forget Password</a>
                                </input>
                            </label>
                        </div>
                        <button>Log in</button>
                        <div className="register">
                            <p>
                                Don't have a account <a href="/register">Register</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;
