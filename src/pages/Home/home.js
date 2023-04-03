import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import images from '~/assets/images/Daco_4375001.png';
import newimage from '~/assets/images/like.png';
import Button from '~/components/Button/btn';
import Specialty from './Section/Specialty';
import { AnimatePresence, motion } from 'framer-motion';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('home-container')}>
            <div className={cx('introduce')}>
                <div className={cx('introduce-wrap')}>
                    <h1 className={cx('introduce-title')}>
                        The <span className={cx('abc')}>Future</span> Of Education Is Here!
                    </h1>
                    <p className={cx('para')}>
                        This course is designed to help you improve your English language skills, whether you are a
                        beginner or an advanced learner. Our program is structured to provide you with the tools and
                        resources you need to succeed in your English language learning journey.
                    </p>
                    <div className={cx('d')}>
                        <button className={cx('Explore')}>Explore Course</button>
                    </div>
                </div>

                <img className={cx('Idiots')} src={images} alt="Idiots"></img>
            </div>

            <div className={cx('content-2')}>
                <Specialty />
            </div>
            <div className={cx('introduce-2')}>
                <img className={cx('Idiot')} src={newimage} alt="Idiots"></img>
                <div>
                    <h1 className={cx('introduce-title')}>
                        WHY WE LEARN FROM <span className={cx('abc')}>ENGLITERATURE</span>
                    </h1>
                    <p className={cx('para')}>
                        Our experienced and qualified instructors will guide you through the course content, which
                        includes grammar, vocabulary, speaking, listening, reading, and writing. We use a variety of
                        teaching methods, such as interactive activities, group discussions, and multimedia resources,
                        to ensure that you are engaged and motivated to learn.
                    </p>
                    <div className={cx('d')}>
                        <button className={cx('Explore')}>Join Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
