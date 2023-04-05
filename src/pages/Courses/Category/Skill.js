import classNames from 'classnames/bind';
import styles from './Skill.module.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from '~/components/Button/Btn';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Skill() {
    const [selectedCourse, setSelectedCourse] = useState('Vocabulary');
    return (
        <div className={cx('course-container')}>
            <div className={cx('course-sidebar')}>
                <div className={cx('sidebar-item')}>
                    <div className={cx('head-item')}>
                        <span className={cx('headText')}>Select Skill</span>
                    </div>
                    <ul className={cx('menu-item')}>
                        <li
                            className={cx('course-item', { selected: selectedCourse === 'Vocabulary' })}
                            onClick={() => setSelectedCourse('Vocabulary')}
                        >
                            Vocabulary
                        </li>
                        <li
                            className={cx('course-item', { selected: selectedCourse === 'Reading' })}
                            onClick={() => setSelectedCourse('Reading')}
                        >
                            Reading
                        </li>
                        <li
                            className={cx('course-item', { selected: selectedCourse === 'Grammar' })}
                            onClick={() => setSelectedCourse('Grammar')}
                        >
                            Grammar
                        </li>
                    </ul>
                </div>
            </div>
            <div className={cx('course-title')}>
                <div className={cx('title-text')}>
                    <span style={{ paddingLeft: '30px' }}> You are learning </span>
                    <span className={cx('title-text-bold')}>{selectedCourse}</span>
                </div>
            </div>
        </div>
    );
}

export default Skill;
