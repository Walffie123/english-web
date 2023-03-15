import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import images from '~/assets/images/Daco_4375001.png';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
const cx = classNames.bind(styles);

function Home() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/user/list')
            .then((res) => res.json())
            .then((result) => {
                setUser(result);
            });
    }, []);

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
                    {/* <div>
                        <Paper elevation={3}>
                            {user.map((users) => (
                                <Paper elevation={6} key={users.userId}>
                                    ID:{users.userId}
                                    username:{users.username}
                                    Password:{users.password}
                                </Paper>
                            ))}
                        </Paper>
                    </div> */}
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
