import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/Engliterature_free-file.png';

import { Modal } from 'react-bootstrap';
import { useState } from 'react';

import Login from '~/pages/Auth/login';
import Register from '~/pages/Auth/register';
import Button from '~/components/Button/btn';

const cx = classNames.bind(styles);
const token = localStorage.getItem('user');
const user = JSON.parse(token);
// console.log(user.roles);
const isUserLoggedIn = user !== null;

function Header() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleLoginModalClose = () => setShowLoginModal(false);
    const handleLoginModalOpen = () => setShowLoginModal(true);

    const handleRegisterModalClose = () => setShowRegisterModal(false);
    const handleRegisterModalOpen = () => setShowRegisterModal(true);

    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload(); // Reload the page to reflect the logout
    };

    return (
        <header className={cx('header')}>
            <div className={cx('inner')}>
                <a href="/">
                    <img className={cx('logo')} src={images} alt="Engliterature" href="/Home"></img>
                </a>
                <div>
                    <a className={cx('Game')} href="/game">
                        Game
                    </a>
                </div>
                <div>
                    <a className={cx('Pro')} href="/teacher">
                        Professional Education
                    </a>
                </div>
                <div>
                    <a className={cx('Courses')} href="/courses">
                        Courses
                    </a>
                </div>
                <div className={cx('actions')}>
                    <Modal className={cx('auth-modal')} show={showLoginModal} onHide={handleLoginModalClose}>
                        <Modal.Header className={cx('modal-header')} closeButton>
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className={cx('modal-body')}>
                            <Login />
                        </Modal.Body>
                    </Modal>

                    <Modal className={cx('auth-modal')} show={showRegisterModal} onHide={handleRegisterModalClose}>
                        <Modal.Header className={cx('modal-header')} closeButton>
                            <Modal.Title>Register</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className={cx('modal-body')}>
                            <Register />
                        </Modal.Body>
                    </Modal>

                    {user ? (
                        <>
                            <div className={cx('username')} onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}>
                                Welcome, {user.username}
                            </div>
                            <div className={cx('sub-menu-wrap', { 'open-menu': isSubMenuOpen })}>
                                <div className={cx('sub-menu')}>
                                    <div className={cx('user-info')}>
                                        <h3> {user.fullname}</h3>
                                        <p>ID: {user.id}</p>
                                    </div>
                                    <hr />
                                    <a href="/profile" className={cx('sub-menu-link')}>
                                        <p>Edit Profile</p>
                                        <span></span>
                                    </a>
                                    <a href="/profile" className={cx('sub-menu-link')}>
                                        <p>Settings & Privacy</p>
                                        <span></span>
                                    </a>

                                    {user.roles[0] === 'ROLE_TEACHER' && (
                                        <a href={`/courseCRUD/${user.id}`} className={cx('sub-menu-link')}>
                                            <p>Course Management</p>
                                        </a>
                                    )}
                                    {user.roles[0] === 'ROLE_ADMIN' && (
                                        <a href={`/AccountCRUD/`} className={cx('sub-menu-link')}>
                                            <p>Account Management</p>
                                        </a>
                                    )}
                                    <a href="#" className={cx('sub-menu-link')}>
                                        <p onClick={handleLogout}>Logout</p>
                                        <span></span>
                                    </a>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Button login onClick={handleLoginModalOpen}>
                                Login
                            </Button>
                            <Button register onClick={handleRegisterModalOpen}>
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
