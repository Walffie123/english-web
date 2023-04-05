import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
// import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faXmark } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

function AccountCRUD() {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [updateUser, setUpdateUser] = useState({
        username: '',
        password: '',
        email: '',
        fullName: '',
        address: '',
        phoneNumber: '',
        level: '',
        status: '',
        roles: [
            {
                id: '',
            },
        ],
    });

    const baseUrl = 'http://localhost:8080';
    useEffect(() => {
        loadUsers();
    });
    const loadUsers = async () => {
        const result = await axios.get(`${baseUrl}/list`);
        setUsers(result.data);
        // console.log(result.data);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = (id) => {
        console.log(id);
        setIsModalOpen(true);
        loadUserById(id);
        console.log(users);
    };

    const loadUserById = async (uid) => {
        const result = await axios.get(`${baseUrl}/list/${uid}`);
        console.log(result.data);
        setUpdateUser(result.data);
    };

    const updateUserById = async (id) => {
        console.log(id);
        await axios.put(`${baseUrl}/update/user/${id}`, updateUser);
        // console.log(result.data);
        setUpdateUser({
            username: '',
            password: '',
            email: '',
            fullName: '',
            address: '',
            phoneNumber: '',
            level: '',
            status: '',
            roles: [
                {
                    id: '',
                },
            ],
        });
        setIsModalOpen(false);
    };

    return (
        <div className="account-container">
            <table class="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">FullName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Level</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr>
                            <th scope="row" key={index}>
                                {index + 1}
                            </th>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.level}</td>
                            <td>{user.roles[0].name}</td>
                            <td>{JSON.stringify(user.status)}</td>
                            <td>
                                <Button onClick={() => handleOpenModal(user.userId)}>
                                    <FontAwesomeIcon icon={faUserPen} />
                                </Button>
                                <Button>
                                    <FontAwesomeIcon icon={faXmark} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={isModalOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>
                            <h1>Update User</h1>
                            <div>
                                <label htmlFor="name">UserName</label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Enter username"
                                    value={updateUser.username}
                                    onChange={(e) => setUpdateUser({ ...updateUser, username: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="name">FullName</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter name"
                                    value={updateUser.fullName}
                                    onChange={(e) => setUpdateUser({ ...updateUser, fullName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="name">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    placeholder="Enter Email"
                                    value={updateUser.email}
                                    onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="name">Password</label>
                                <input
                                    type="password"
                                    id="email"
                                    placeholder="Enter Password"
                                    value={updateUser.password}
                                    onChange={(e) => setUpdateUser({ ...updateUser, password: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="name">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    placeholder="Enter Address"
                                    value={updateUser.address}
                                    onChange={(e) => setUpdateUser({ ...updateUser, address: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="name">Phone</label>
                                <input
                                    type="text"
                                    id="phone"
                                    placeholder="Enter Phone"
                                    value={updateUser.phoneNumber}
                                    onChange={(e) => setUpdateUser({ ...updateUser, phoneNumber: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="name">Level</label>
                                <input
                                    type="text"
                                    id="level"
                                    placeholder="Enter Level"
                                    value={updateUser.level}
                                    onChange={(e) => setUpdateUser({ ...updateUser, level: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="name">Role</label>
                                <input
                                    type="text"
                                    id="role"
                                    placeholder="Enter Role"
                                    value={updateUser.roles[0].id}
                                    onChange={(e) => setUpdateUser({ ...updateUser, roles: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="name">Status</label>
                                <select
                                    id="status"
                                    onChange={(e) => setUpdateUser({ ...updateUser, status: e.target.value })}
                                >
                                    <option value="true">true</option>
                                    <option value="false">false</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={() => updateUserById(updateUser.userId)}>Update User</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default AccountCRUD;
