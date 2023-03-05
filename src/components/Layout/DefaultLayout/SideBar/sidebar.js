import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function SideBar() {
    return <aside className={cx('wrapper')}>SideBar</aside>;
}

export default SideBar;
