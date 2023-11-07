import { useState } from "react";

import Drop from "../components/Dropdown";



export default function Account() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [contactInfo, setContactInfo] = useState("john.doe@example.com");
  const [profilePicture, setProfilePicture] = useState(
    "https://d1jj76g3lut4fe.cloudfront.net/processed/thumb/S1Yc7F14OY0nt2uB50.png?Expires=1698214046&Signature=fix6SRlz-nAX7wBqXnllf8e3caUuMCKFkTo5kEVp0XJlY~cAXzG4N9UB3cuFNmiQmelDDKCdonPGovRV7zTP-p7pqk9Q327kpO09CRs-LUNtyCF-l02yv~D5u-N7eF0ONKneNInShJyKghKTtk9Q8KYXsReIJTPl782Ab0NhX33z4w9wRhuSQsxEocqwqBu9W6bT75vwvjXuyopQTNtuT9TsUvU454dMheNsWFVMLFgzsTEM8TbizkO7rXorEaUFF3MSEDXNB7CFM01N85FUZMRe7Lc2~EF0LRw1RkFGEuJDYkmKQuwxMFQiRFEXy67CTrPpBISxPtJorwRTLXsVlQ__&Key-Pair-Id=K2YEDJLVZ3XRI",
  );

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
  };

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleContactInfoChange = e => {
    setContactInfo(e.target.value);
  };

  const handleProfilePictureChange = e => {
    setProfilePicture(e.target.value);
  };

  return (
    <div className="profile">
      <div className="profile-picture">
        <img
          style={{
            width: 300,
            height: 300,
            top: 30,
            left: 50,
            position: "relative",
          }}
          src={profilePicture}
          alt="Profile"
        />
        {editing && (
          <input
            style={{ top: 464, left: 172, position: "absolute" }}
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        )}
      </div>
      <div className="profile-info">
        {editing ? (
          <div style={{ top: 200, left: 500, position: "absolute" }}>
            <label>Name: </label>
            <input type="text" value={name} onChange={handleNameChange} />
            <label>Contact Info: </label>
            <input
              type="text"
              value={contactInfo}
              onChange={handleContactInfoChange}
            />
          </div>
        ) : (
          <div style={{ top: 200, left: 500, position: "absolute" }}>
            <Drop></Drop>
            <br></br>
            <br></br>
            <h2>{name}</h2>
            <p>{contactInfo}</p>
          </div>
        )}
      </div>
      <div className="profile-buttons">
        {editing ? (
          <button
            style={{ top: 294, left: 500, position: "absolute" }}
            onClick={handleSave}
          >
            <div>
              <div
                style={{
                  width: 120,
                  height: 41,
                  left: 0,
                  top: 0,
                  position: "absolute",
                  background: "#EFEEEE",
                  borderRadius: 5,
                }}
              />
              <div
                style={{
                  width: 140,
                  height: 18,
                  left: -8,
                  top: 9,
                  position: "relative",
                }}
              >
                Save
              </div>
            </div>
          </button>
        ) : (
          <button
            style={{ top: 350, left: 500, position: "absolute" }}
            onClick={handleEdit}
          >
            <div>
              <div
                style={{
                  width: 170,
                  height: 41,
                  left: 0,
                  top: 0,
                  position: "absolute",
                  background: "#EFEEEE",
                  borderRadius: 5,
                }}
              />
              <div
                style={{
                  width: 140,
                  height: 18,
                  left: 38,
                  top: 9,
                  position: "relative",
                }}
              >
                Edit Profile
              </div>
              <img
                style={{
                  width: 29,
                  height: 29,
                  left: 30,
                  top: 6,
                  position: "absolute",
                }}
                src="https://simpleicon.com/wp-content/uploads/pencil.png"
              />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
