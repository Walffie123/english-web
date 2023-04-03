import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ to, href, login, register, submit, onClick, children, choices, home, back, play, ...passProps }) {
    let Btn = 'button';
    const props = {
        onClick,
        ...passProps,
        login,
        register,
        submit,
        choices,
        home,
        back,
        play,
    };

    if (to) {
        props.to = to;
        Btn = Link;
    } else if (href) {
        props.href = href;
        Btn = 'a';
    }

    const btn = cx('btn', {
        login,
        register,
        submit,
        home,
        choices,
        back,
        play,
    });

    return (
        <Btn className={btn} {...props}>
            <span>{children}</span>
        </Btn>
    );
}

export default Button;