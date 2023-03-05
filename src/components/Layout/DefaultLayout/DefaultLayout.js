import classNames from 'classnames/bind';
import Header from './Header/header';
import styles from './DefaultLayout.module.scss';
import SideBar from './SideBar/sidebar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <SideBar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
