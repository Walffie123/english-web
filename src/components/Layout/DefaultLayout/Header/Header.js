import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('header')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>Logo</div>
            </div>
        </header>
    );
}

export default Header;
