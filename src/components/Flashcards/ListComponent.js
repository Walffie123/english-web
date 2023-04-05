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
        console.log(result.data);
    }
    return (
        <div className='container'>
            <table class="table border shadow">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">FullName</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => (
                        <tr>
                            <th scope="row" key={index}>{index + 1}</th>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    );
}
