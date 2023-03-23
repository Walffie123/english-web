import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import images from '~/assets/images/Daco_4375001.png';
const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div>
                <h1>
                    The <span className={cx('abc')}>Future</span> Of Education Is Here!
                </h1>
                <p className={cx('para')}>
                    This course is designed to help you improve your English language skills, whether you are a beginner
                    or an advanced learner. Our program is structured to provide you with the tools and resources you
                    need to succeed in your English language learning journey.
                </p>
                <div className={cx('d')}>
                    <button className={cx('Explore')}>Explore Course</button>
                </div>
            </div>
            <img className={cx('Idiots')} src={images} alt="Idiots"></img>
        </div>
    );
}

export default Home;
