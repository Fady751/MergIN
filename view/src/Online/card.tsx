import "./card.css";
import Swal from "sweetalert2";
import { useState } from "react";
import type { IusersOnline } from "../Types/Iuser";
import { BsThreeDotsVertical } from "react-icons/bs";

function Card({ username, pfp }: IusersOnline) {
  const [option, setOption] = useState(false);

  const toggleOption = () => {
    setOption((prev) => !prev); // flip boolean value
  };

  const handleBlock = () => {
    Swal.fire({
      title: "Be CareFull",
      text: "By confirm you will not able to see and message (name)",
      color: "white",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Block",
      confirmButtonColor: "var(--error)",
      background: "var(--gray)",
      cancelButtonText: "Cancel",
      cancelButtonColor: "var(--whiteSecondary)",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Blocked!",
          color: "White",
          icon: "success",
          confirmButtonText: "Done",
          background: "var(--gray)",
          confirmButtonColor: "var(--whiteSecondary)",
        });
      }
    });
  };

  return (
    <div className="person-online-card">
      <div className="profile-section">
        <div className="photo">
          <img src={pfp} alt="" className="profile-picture" />
          <span className="dot"></span>
        </div>

        <span className="name">{username}</span>
      </div>

      <div className="options-container">
        <BsThreeDotsVertical size={15} onClick={toggleOption} />
        {option && (
          <div className="dropdown">
            <p>View Profile</p>
            <p>Send Message</p>
            <p style={{ color: "var(--error)" }} onClick={handleBlock}>
              Block
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
