import { IUser } from "../models/user";
import Users from '../assets/users.json'
import { useState } from "react";
import './userDetailsModal.css'

interface Props {
    userId: number
}

const UserDetailsModal = ({userId}: Props) => {
    const [user, setUser] = useState<IUser>(Users.filter((user)=> user.id === userId)[0])
    
    return (
        <div className="modal">
            <img src={user.picture} />
            <p>name: {user.name}</p>
            <p>gender: {user.gender}</p>
            <p>email: {user.email}</p>
        </div>
    )
}

export default UserDetailsModal;