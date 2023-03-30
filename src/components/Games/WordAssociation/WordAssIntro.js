import classNames from 'classnames/bind';
import styles from './WordAssIntro.module.scss';
import Button from '~/components/Button/btn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faArrowRight, faPlay, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function WordAssIntro() {
    return (
        <div className={cx('WA-container')}>
            <h1>Did You Know Game?</h1>
            <div>
                <p className={cx('intro')}>
                    Welcome to our exciting quiz game where knowledge is power and every question counts! Get ready to
                    put your thinking cap on and challenge yourself to see how much you really know. Our quiz game
                    covers a wide range of topics, from history and science to pop culture and current events. With
                    multiple levels of difficulty, you can choose the level that suits you best and work your way up to
                    the top. Answer questions correctly and earn points to climb the leaderboard and compete against
                    other players. But be warned, the questions get harder as you progress, so stay focused and sharp.
                    Are you up for the challenge? Let's play!
                </p>
            </div>
            <div>
                <Button play href={'/word/1'}>
                    <FontAwesomeIcon icon={faPlay} /> Play Now
                </Button>
            </div>
        </div>
    );
}

export default WordAssIntro;
