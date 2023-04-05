import { Link } from 'react-router-dom';
import Button from '~/components/Button/btn';
import classNames from 'classnames/bind';
import styles from './game.module.scss';
import quiz from '../../assets/images/quiz.jpg';
import fill from '../../assets/images/fillinbankintromenu.png';
import hangin from '../../assets/images/hangin.png';
const cx = classNames.bind(styles);

function Game() {
    return (
        <div className={cx('gamemenu-container')}>
            <h3>Game Menu</h3>
            <div>
                <div className={cx('game-box1')}>
                    <div>
                        <img className={cx('quiz-img')} src={quiz} alt="Quiz Game"></img>
                    </div>
                    <Button gamemenu href={'/wordassintro'}>
                        Quiz Game
                    </Button>
                </div>
                <div className={cx('game-box2')}>
                    <img className={cx('fill-img')} src={fill} alt="Fill In Blank Game"></img>
                    <Button gamemenu href={'/fillinblank'}>
                        Fill In Blank
                    </Button>
                </div>
                <div className={cx('game-box3')}>
                    <img className={cx('hangman-img')} src={hangin} alt="Hang in Man Game"></img>
                    <Button gamemenu href={'/hangman'}>
                        Hang In Man
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Game;
