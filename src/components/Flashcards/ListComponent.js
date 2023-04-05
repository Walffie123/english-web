import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ListComponent(props) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        loadUsers();
    }, []);
    const loadUsers = async () => {
        const result = await axios.get('http://localhost:8080/list');
        setUsers(result.data);
        console.log(result.data.status);
    };
    return (
        <div className="container">
            <table class="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">FullName</th>
                        <th scope="col">Email</th>
                        {/* <th scope="col">Password</th> */}
                        <th scope="col">Address</th>
                        <th scope="col">Level</th>
                        <th scope="col">PhoneNumber</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr>
                            <th scope="row" key={index}>
                                {index + 1}
                            </th>
                            <td>{user.username}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            {/* <td>{user.password}</td> */}
                            <td>{user.address}</td>
                            <td>{user.level}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.roles[0].name}</td>
                            <td>{JSON.stringify(user.status)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
