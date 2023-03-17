import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import images from '~/assets/images/Daco_4375001.png';
import newimage from '~/assets/images/like.png';
const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('home-container')}>
            <div className={cx('introduce')}>
                <div>
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

            <div className={cx('content2')}>
                <div className={cx('search1')}>
                    <input type="text" placeholder="Course name" />
                    <input type="text" placeholder="Tutor name" />
                    <input type="text" placeholder="Popular Course" />
                </div>
            </div>

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
                            <button> Practice</button>
                            <button> See Result</button>
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
                            <button> Practice</button>
                            <button> See Result</button>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>

            <div className={cx('introduce')}>
                <img className={cx('Idiot')} src={newimage} alt="Idiots"></img>
                <div>
                    <h1>
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
