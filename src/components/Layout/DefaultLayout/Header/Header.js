import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images/Engliterature_free-file.png';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('header')}>
            <div className={cx('inner')}>
                <div>
                    <img className={cx('logo')} src={images} alt="Engliterature"></img>
                </div>
                <div className={cx('Home')}>
                    <a href="/">Home</a>
                </div>
                <div className={cx('Progams')}>
                    <text>Progmas</text>
                </div>
                <div>
                    <text>Professional Education</text>
                </div>
                <div>
                    <text>Admissions</text>
                </div>
                <div className={cx('Courses')}>
                    <a href="/courses">Courses</a>
                </div>
                <div className={cx('actions')}>
                    <button className={cx('button1')} href="/login">
                        Log in
                    </button>
                    <button className={cx('button2')} href="/register">
                        Register
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
