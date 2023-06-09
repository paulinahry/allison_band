import React, { useEffect, useState } from 'react'
import { getUser } from '../api/apiFetch'

function Profil() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUser()
                setUsers([usersData])
            } catch (error) {
                console.log('Error:', error)
            }
        }

        fetchUsers()
    }, [])

    return (
        <div>
            <h1 className="text-5xl pt-20">USER PROFILE </h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.userName}
                        <p>hello {user.userName} </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Profil
