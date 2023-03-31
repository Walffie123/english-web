import classNames from 'classnames/bind';
import styles from './Specialty.module.scss';
import Button from '~/components/Button/Btn';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const cx = classNames.bind(styles);

export default function Specialty() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className={cx('specialty-slide-container')}>
            <div className={cx('specialty-slide-content')}>
                <Slider {...settings}>
                    <div className={cx('slide-content-1')}>
                        <h3>1</h3>
                    </div>
                    <div className={cx('slide-content-2')}>
                        <h3>2</h3>
                    </div>
                    <div className={cx('slide-content-3')}>
                        <h3>3</h3>
                    </div>
                    <div className={cx('slide-content-4')}>
                        <h3>4</h3>
                    </div>
                    <div className={cx('slide-content-5')}>
                        <h3>5</h3>
                    </div>
                    <div className={cx('slide-content-6')}>
                        <h3>6</h3>
                    </div>
                </Slider>
            </div>
        </div>
    );
}
