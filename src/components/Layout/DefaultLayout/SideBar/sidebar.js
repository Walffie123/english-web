import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function SideBar() {
    return <aside className={cx('wrapper')}>Huhu Nghi Me di</aside>;
}

export default SideBar;
