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

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const handleValidation = () => {
        let formIsValid = true;

        // Validate username
        const usernamePattern = /^[a-zA-Z0-9]{3,20}$/;
        if (!usernamePattern.test(username)) {
            setUsernameError('Username must contain only letters and numbers, and be between 3 and 20 characters long');
            formIsValid = false;
        } else {
            setUsernameError('');
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailError('Invalid email address');
            formIsValid = false;
        } else {
            setEmailError('');
        }

        // Validate password
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordPattern.test(password)) {
            setPasswordError('Password must contain at least 8 characters, including uppercase, lowercase and numbers');
            formIsValid = false;
        } else {
            setPasswordError('');
        }

        // Validate phone
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phone)) {
            setPhoneError('Invalid phone number. Must be exactly 10 digits');
            formIsValid = false;
        } else {
            setPhoneError('');
        }

        return formIsValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (handleValidation()) {
            // Perform registration request here
            console.log('Registration request submitted');
        } else {
            console.log('Registration request failed due to validation errors');
        }
    };

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
            fullName: name,
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
        <form onSubmit={handleSubmit}>
            <div>
                <div className="logo-img">
                    <img className="logo" src={images} alt="Engliterature"></img>
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
                    {usernameError && <div className="error-message">{usernameError}</div>}
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
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <div className="error-message">{passwordError}</div>}
                </div>
                <div className="">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {phoneError && <div className="error-message">{phoneError}</div>}
                </div>
                <div className="">
                    <label>Email address</label>
                    <div>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />
                        {emailError && <div className="error-message">{emailError}</div>}
                    </div>
                </div>
                <div className="">
                    <label>Address</label>
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>
                <div>
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
                </div>
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
