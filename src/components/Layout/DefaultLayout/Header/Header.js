import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/Engliterature_free-file.png';
import Button from '~/components/Button/Btn';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';

import Login from '~/pages/Auth/login';
import Register from '~/pages/Auth/register';

const cx = classNames.bind(styles);

function Header() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleLoginModalClose = () => setShowLoginModal(false);
    const handleLoginModalOpen = () => setShowLoginModal(true);

    const handleRegisterModalClose = () => setShowRegisterModal(false);
    const handleRegisterModalOpen = () => setShowRegisterModal(true);

    return (
        <header className={cx('header')}>
            <div className={cx('inner')}>
                <a href="/">
                    <img className={cx('logo')} src={images} alt="Engliterature" href="/Home"></img>
                </a>
                <div className={cx('Game')}>
                    <a href="/game">Game</a>
                </div>
                <div className={cx('Pro')}>
                    <text>Professional Education</text>
                </div>
                <div className={cx('Courses')}>
                    <a href="/courses">Courses</a>
                </div>
                <div className={cx('actions')}>
                    <FontAwesomeIcon className={cx('ilogin')} icon={faRightToBracket} />
                    <Button login onClick={handleLoginModalOpen}>
                        Login
                    </Button>
                    <Modal className={cx('auth-modal')} show={showLoginModal} onHide={handleLoginModalClose}>
                        <Modal.Header className={cx('modal-header')} closeButton>
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className={cx('modal-body')}>
                            <Login />
                        </Modal.Body>
                    </Modal>

                    <Button register onClick={handleRegisterModalOpen}>
                        Register
                    </Button>
                    <Modal className={cx('auth-modal')} show={showRegisterModal} onHide={handleRegisterModalClose}>
                        <Modal.Header className={cx('modal-header')} closeButton>
                            <Modal.Title>Register</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className={cx('modal-body')}>
                            <Register />
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </header>
    );
}

export default Header;
