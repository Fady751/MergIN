import "./Card.css";
import type { IusersOnline } from "../../../Types/Iuser";

function Card({ userName, pfp }: IusersOnline) {

    return (
        <div className="person-online-card">
            <img src={pfp} alt={`${userName}'s profile`} className="profile-picture" />
            <span className="user-name">{userName}</span>
        </div>
    );

}

export default Card;