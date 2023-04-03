import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/Engliterature_free-file.png';
import Button from '~/components/Button/btn';

const cx = classNames.bind(styles);
const token = localStorage.getItem('user');
const user = JSON.parse(token);
// console.log(user.roles);
const isUserLoggedIn = user !== null;

function Header() {

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload(); // Reload the page to reflect the logout
    };

    return (
        <header className={cx('header')}>
            <div className={cx('inner')}>
                <img className={cx('logo')} src={images} alt="Engliterature"></img>
                <div className={cx('Home')}>
                    <a href="/">Home</a>
                </div>
                <div className={cx('Game')}>
                    <a href="/game">Game</a>
                </div>
                <div className={cx()}>
                    <a>Professional Education</a>
                </div>
                <div className={cx('Upload')}>
                    <a href="/upload">Upload</a>
                </div>
                <div className={cx('Courses')}>
                    <a href="/courses">Courses</a>
                </div>
                <div className={cx('actions')}>
                    {user ? (
                        <>
                            <div className={cx('username')}>Welcome, {user.username}</div>
                            <Button logout onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon className={cx('ilogin')} icon={faRightToBracket} />
                            <Button login href="/login" target="_blank">
                                Login
                            </Button>
                            <Button register href="/register" target="_blank">
                                Register
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
