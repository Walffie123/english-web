import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Auth.module.scss';
import Button from '~/components/Button/btn';
import images from '~/assets/images/Engliterature_free-file.png';
import { useState } from 'react';
import axios from 'axios';
const cx = classNames.bind(styles);

export default function Register() {
    const [username, setUsername] = useState('');
    const [name, setFullName] = useState('');
    const [email, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [level, setLevel] = useState('');

    function SendRegisterRequest() {
        console.log(username);
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(address);
        console.log(phone);
        console.log(level);

        const registerDto = {
            username: username,
            name: name,
            email: email,
            password: password,
            address: address,
            phoneNumber: phone,
            level: level,
        };

        axios
            .post('//localhost:8080/api/auth/signup', registerDto)
            .then((response) => {
                // status 200 la login thanh cong, nen them session hay token chi chi do vo day
                if (response.status === 200) window.alert('success');
                else return Promise.reject('Invalid login');
            })
            .catch((message) => {
                alert(message);
            });
    }

    return (
        <form>
            <div>
                <div className={cx('logo-img')}>
                    <img className={cx('logo')} src={images} alt="Engliterature"></img>
                </div>
                <div className="">
                    <label>User Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="User Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="">
                    <label>Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className="">
                    <label>Email address</label>
                    <div>
                        <input
                            FontAwesomeIcon={faUser}
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />
                    </div>
                </div>
                <div className="">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="">
                    <label>Address</label>
                    <input
                        type="Address"
                        className="form-control"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="">
                    <label>Phone</label>
                    <input
                        type="Phone"
                        className="form-control"
                        placeholder="Enter Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <label for="level" style={{ marginTop: '20px' }}>
                    Select Level:
                </label>
                <select name="level" id="level" value={level} onChange={(e) => setLevel(e.target.value)}>
                    {/* <option></option> */}
                    <option value="1">Grade 6</option>
                    <option value="2">Grade 7</option>
                    <option value="3">Grade 8</option>
                    <option value="4">Grade 9</option>
                </select>

                <div className={cx('box2')}>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className={cx('remember')} htmlFor="customCheck1">
                            I have read and accpet the{' '}
                            <span style={{ textDecoration: 'underline', color: 'blue' }}>terms and conditions</span>
                        </label>
                    </div>
                </div>
                <div className={cx('submit-login')}>
                    <Button submit type="button" onClick={() => SendRegisterRequest()}>
                        Register
                    </Button>
                </div>
                <p style={{ textAlign: 'center' }}>
                    Already registered ? <a href="/login">Sign In</a>
                </p>
            </div>
        </form>
    );
}