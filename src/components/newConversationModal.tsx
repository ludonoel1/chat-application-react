import { IUser } from "../models/user";
import Users from '../assets/users.json'
import { useState } from "react";
import './newConversationModal.css'


const NewConversationModal = ({ handleNewConversation }) => {
    const [users, setUsers] = useState<IUser[]>(Users)
    
    function onCloseDialog(user: IUser){
        handleNewConversation(user);
    }
    return (
        <div className="modal">
{users.map((user, index) => (
    <div key={'user-'+index} className="user" onClick={()=>onCloseDialog(user)}>
            <img src={user.picture} />
            <p>{user.name}</p>
        </div>
))}
        
    </div>
    )
}

export default NewConversationModal;