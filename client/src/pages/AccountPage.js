import { Container } from "@mui/material";
import AccountPanel from "../components/AccountPanel";

import { useState, useEffect } from "react";

const AccountPage = ({ user }) => {
  const [loading, setLoading] = useState(true);
  // Update the component once user is loaded.
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  //   const pic =
  //     "https://res.cloudinary.com/dqjwxv8ck/image/upload/v1680977690/h8qciuuhzrbpzeuzlhyf.webp";

  // Define state variables and functions
  const { joinedAt } = user;
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [handle, setHandle] = useState(user.handle);
  const [editing, setEditing] = useState(false);

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
    setEditing(true);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setEditing(true);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEditing(true);
  };

  const handleHandleChange = (event) => {
    setHandle(event.target.value);
    setEditing(true);
  };

  const handleSaveClick = () => {
    // Save changes to user account
    setEditing(false);
  };

  return (
    <Container>
      <AccountPanel
        avatar={avatar}
        name={name}
        email={email}
        handle={handle}
        joinedAt={joinedAt}
        editing={editing}
        handleAvatarChange={handleAvatarChange}
        handleNameChange={handleNameChange}
        handleEmailChange={handleEmailChange}
        handleHandleChange={handleHandleChange}
        handleSaveClick={handleSaveClick}
      />
    </Container>
  );
};

export default AccountPage;
