import classNames from 'classnames/bind';
import styles from './Courses.module.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from '~/components/Button/Btn';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Courses() {

    return (
        <div className={cx('content3')}>
            <div className={cx('box')}>
                <span></span>
                <br></br>
                <h3 className={cx('textTitle')}> Practice by Unit </h3>
                <div className={cx('box-content')}>
                    <div className={cx('box-text')}>
                        <p>
                            Unit are Completed:
                            <span> 0/20</span>
                        </p>
                        <p>
                            Units are 90% above:
                            <span> 0/20</span>
                        </p>
                        <p>
                            Units are 90% below:
                            <span> 0/20</span>
                        </p>
                        <p>
                            Time spent on course:
                            <span>00:00:00</span>
                        </p>
                    </div>
                </div>
                <div className={cx('box-card')}>
                    <div>
                        <span> On Practice </span>
                        <p style={{ color: 'solid blue' }}> Unit 1 </p>
                    </div>
                    <div className={cx('box-button')}>
                        <Button home> Practice</Button>
                        <Button home> See Result</Button>
                    </div>
                </div>
            </div>
            <div className={cx('box')}>
                <span></span>
                <br></br>
                <h3 className={cx('textTitle')}> Practice by Game </h3>
                <div className={cx('box-content')}>
                    <div className={cx('box-text')}>
                        <p>
                            Game are Completed:
                            <span> 0/3</span>
                        </p>
                        <p>
                            Games are 90% above:
                            <span> 0/3</span>
                        </p>
                        <p>
                            Games are 90% below:
                            <span> 0/3</span>
                        </p>
                        <p>
                            Time spent on game:
                            <span>00:00:00</span>
                        </p>
                    </div>
                </div>
                <div className={cx('box-card')}>
                    <div>
                        <span> On Practice </span>
                        <p style={{ color: 'solid blue' }}> Game 1 </p>
                    </div>
                    <div className={cx('box-button')}>
                        <Button home> Practice</Button>
                        <Button home> See Result</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;
