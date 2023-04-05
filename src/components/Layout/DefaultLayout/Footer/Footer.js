import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import { Link } from 'react-router-dom';
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

import { faFacebook, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);
export default function Footer() {
    return (
        <footer className={cx('text-center', 'text-lg-start', 'bg-white', 'text-muted')}>
            <section
                className={cx('d-flex', 'justify-content-center', 'justify-content-lg-between', 'p-4', 'border-bottom')}
            >
                <div className={cx('me-5', 'd-none', 'd-lg-block')}>
                    <span>Get connected with us on social networks:</span>
                </div>

                <div className={cx('footer-contact')}>
                    <a href="/" className={cx('me-4')}>
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="/" className={cx('me-4')}>
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="/" className={cx('me-4')}>
                        <FontAwesomeIcon icon={faGoogle} />
                    </a>
                    <a href="/" className={cx('me-4')}>
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="/" className={cx('me-4')}>
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="/" className={cx('me-4')}>
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </div>
            </section>

            <section>
                <div className={cx('footer-container', 'text-center', 'text-md-start', 'mt-5')}>
                    <div className={cx('row', 'mt-3')}>
                        <div className={cx('col-md-3', 'col-lg-4', 'col-xl-3', 'mx-auto', 'mb-4')}>
                            <h6 className={cx('text-uppercase', 'fw-bold', 'mb-4')}>
                                <i className={cx('fas', 'fa-gem', 'me-3', 'text-secondary')}></i>Engliterature
                            </h6>
                            <p className={cx('footer-introduce')}>
                                Engliterature is a premier English language training center, staffed by dedicated and
                                experienced teachers.
                            </p>
                        </div>

                        <div className={cx('col-md-2', 'col-lg-2', 'col-xl-2', 'mx-auto', 'mb-4')}>
                            <h6 className={cx('text-uppercase', 'fw-bold', 'mb-4')}>Products</h6>
                            <p>
                                <a href="#!" className={cx('text-reset')}>
                                    Angular
                                </a>
                            </p>
                            <p>
                                <a href="#!" className={cx('text-reset')}>
                                    React
                                </a>
                            </p>
                            <p>
                                <a href="#!" className={cx('text-reset')}>
                                    Vue
                                </a>
                            </p>
                            <p>
                                <a href="#!" className={cx('text-reset')}>
                                    Laravel
                                </a>
                            </p>
                        </div>

                        <div className={cx('col-md-3', 'col-lg-2', 'col-xl-2', 'mx-auto', 'mb-4')}>
                            <h6 className={cx('text-uppercase', 'fw-bold', 'mb-4')}>Useful links</h6>
                            <p>
                                <a href="#!" class={cx('text-rest')}>
                                    Pricing
                                </a>
                            </p>
                            <p>
                                <a href="#!" class={cx('text-rest')}>
                                    Settings
                                </a>
                            </p>
                            <p>
                                <a href="#!" class={cx('text-rest')}>
                                    Orders
                                </a>
                            </p>
                            <p>
                                <a href="#!" class={cx('text-rest')}>
                                    Help
                                </a>
                            </p>
                        </div>

                        <div className={cx('col-md-4', 'col-lg-3', 'col-xl-3', 'mx-auto', 'mb-md-0', 'mb-4')}>
                            <h6 className={cx('text-uppercase', 'fw-bold', 'mb-4')}>Contact</h6>
                            <p>
                                <i className={cx('fas', 'fa-home', 'me-3', 'text-secondary')}></i> Da Nang, Hoa Khanh
                                55000, VN
                            </p>
                            <p>
                                <i className={cx('fas', 'fa-envelope', 'me-3', 'text-secondary')}></i>
                                Engliterature@gmail.com
                            </p>
                            <p>
                                <i className={cx('fas', 'fa-phone', 'me-3', 'text-secondary')}></i> 084 123 456 789
                            </p>
                            <p>
                                <i className={cx('fas', 'fa-print', 'me-3', 'text-secondary')}></i> 084 123 456 789
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className={cx('text-center', 'p-4')} style={{ backgroundColor: 'rgba(0, 0, 0, 0.025)' }}>
                © 2023 Copyright:
                <a className={cx('text-reset', 'fw-bold')} href="/">
                    FireFlies FPT
                </a>
            </div>
        </footer>
    );
}
