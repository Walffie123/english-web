import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import styles from './Profile.module.scss';
const cx = classNames.bind(styles);
function Profile() {
    const baseUrl = 'http://localhost:8080';

    const t = localStorage.getItem('user');
    const user = JSON.parse(t);

    const [updateUser, setUpdateUser] = useState({
        username: '',
        password: '',
        email: '',
        fullName: '',
        address: '',
        phoneNumber: '',
        level: '',
        status: user.status,
        roles: [
            {
                id: user.roles[0].id,
            },
        ],
    });

    const updateUserById = async (id) => {
        console.log(id);
        await axios.put(`${baseUrl}/update/user/${id}`, updateUser);
    };

    useEffect(() => {
        loadUserById(user.id);
    }, []);

    const loadUserById = async (uid) => {
        const result = await axios.get(`${baseUrl}/list/${uid}`);
        console.log(result.data);
        setUpdateUser(result.data);
    };
    return (
        <div class={cx("profile-wrapper")}>
            <h4 class="pb-4 border-bottom">Account settings</h4>
            <div class="py-2">
                <div class="row py-2">
                    <div class="col-md-6">
                        <label for="firstname">Username</label>
                        <input
                            type="text"
                            class="bg-light form-control"
                            placeholder="Steve"
                            value={updateUser.username}
                            onChange={(e) => setUpdateUser({ ...updateUser, username: e.target.value })}
                        />
                    </div>
                    <div class="col-md-6 pt-md-0 pt-3">
                        <label for="lastname">Fullname</label>
                        <input
                            type="text"
                            class="bg-light form-control"
                            placeholder="Smith"
                            value={updateUser.fullName}
                            onChange={(e) => setUpdateUser({ ...updateUser, fullName: e.target.value })}
                        />
                    </div>
                </div>
                <div class="row py-2">
                    <div class="col-md-6">
                        <label for="email">Email Address</label>
                        <input
                            type="text"
                            class="bg-light form-control"
                            placeholder="steve_@email.com"
                            value={updateUser.email}
                            onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
                        />
                    </div>
                    <div class="col-md-6 pt-md-0 pt-3">
                        <label for="phone">Phone Number</label>
                        <input
                            type="tel"
                            class="bg-light form-control"
                            placeholder="+1 213-548-6015"
                            value={updateUser.phoneNumber}
                            onChange={(e) => setUpdateUser({ ...updateUser, phoneNumber: e.target.value })}
                        />
                    </div>
                </div>
                <div class="row py-2">
                    <div class="col-md-6">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            class="bg-light form-control"
                            placeholder="+1 213-548-6015"
                            value={updateUser.password}
                            onChange={(e) => setUpdateUser({ ...updateUser, password: e.target.value })}
                        />
                    </div>
                    <div class="col-md-6 pt-md-0 pt-3" id="lang">
                        <label for="language">Address</label>
                        <div class="arrow">
                            <input
                                type="text"
                                class="bg-light form-control"
                                placeholder="+1 213-548-6015"
                                value={updateUser.address}
                                onChange={(e) => setUpdateUser({ ...updateUser, address: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <div class="row py-2">
                    <div class="col-md-6">
                        <label for="text">Level</label>
                        <input
                            type="text"
                            class="bg-light form-control"
                            value={updateUser.level}
                            onChange={(e) => setUpdateUser({ ...updateUser, level: e.target.value })}
                        />
                    </div>
                </div>
                <div class="py-3 pb-4 border-bottom">
                    <button class="btn btn-primary mr-3" onClick={() => updateUserById(updateUser.userId)}>
                        Save Changes
                    </button>
                    <button class="btn border button">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
