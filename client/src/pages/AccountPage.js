import { Container } from "@mui/material";
import AccountPanel from "../components/AccountPanel";
import { useAuthContext } from "../hooks/useAuthContext";
import { AuthContext } from "../context/AuthContext";

import { useState, useEffect, useContext } from "react";

const AccountPage = () => {
  const { dispatch } = useContext(AuthContext);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  // Define state variables and functions
  const [joinedAt, setJoinedAt] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [handle, setHandle] = useState(null);
  const [editing, setEditing] = useState(false);
  // field to be updated.
  const [oldAvatar, setOldAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const updatedUser = {};

  // User Auth Token

  // Update the component once user is loaded.
  useEffect(() => {
    if (user) {
      setLoading(false);
      setOldAvatar(user.avatar);
      setJoinedAt(user.joinedAt);
      setAvatar(user.avatar);
      setName(user.name);
      setEmail(user.email);
      setHandle(user.handle);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  //   const pic =
  //     "https://res.cloudinary.com/dqjwxv8ck/image/upload/v1680977690/h8qciuuhzrbpzeuzlhyf.webp";

  // const uploadAvatar = async (selectedFile) => {
  //   if (!user) {
  //     // handle the case where user is not available
  //     console.log("USER WAS EMPTY");
  //     return;
  //   }
  //   // create formData
  //   const formData = new FormData();
  //   formData.append("file", selectedFile);

  //   const response = await fetch("/api/user/upload", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //       // "Content-Type": "multipart/form-data",
  //     },
  //     body: formData,
  //   });

  //   const json = await response.json();
  //   console.log(json);

  //   if (response.ok) {
  //     console.log(json.newAvatar);
  //   }

  //   return json.newAvatar;
  // };

  const uploadAvatar = async (selectedFile) => {
    if (!user) {
      // handle the case where user is not available
      console.log("USER without Auth.");
      return;
    }
    // create formData
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("deleteURL", oldAvatar);

    console.log(user.token);

    const response = await fetch("/api/user/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        // "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    const json = await response.json();
    console.log(json);

    if (response.ok) {
      // console.log(json.newAvatar);
      console.log(json);
    }

    // return json.newAvatar;
    return json.newAvatar;
  };

  // const deleteAvatar = async (imgURL) => {
  //   const response = await fetch(`/api/user/delete`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ imgURL: imgURL }),
  //   });

  //   const json = await response.json();

  //   if (response.ok) {
  //     console.log(json.deletedAvatar);
  //   }

  //   return json.deletedAvatar;
  // };

  const updateUser = async (jsonBody) => {
    if (!user) {
      // handle the case where user is not available
      console.log("USER without Auth.");
      return;
    }

    const response = await fetch(`/api/user/update`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonBody),
    });

    const json = await response.json();

    if (response.ok) {
      console.log(json.user);
    }

    return json.user;
  };

  const handleAvatarChange = (selectedFile) => {
    const url = URL.createObjectURL(selectedFile);
    setAvatar(url);
    setAvatarFile(selectedFile);
    setEditing(true);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setEditing(true);
    updatedUser.name = event.target.value;
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEditing(true);
    updatedUser.email = event.target.value;
  };

  const handleHandleChange = (event) => {
    setHandle(event.target.value);
    setEditing(true);
    updatedUser.handle = event.target.value;
  };

  const handleSaveClick = async () => {
    console.log("NUMBER OF TIMES");
    // Save changes to user account
    if (avatarFile) {
      const newAvatar = await uploadAvatar(avatarFile);
      console.log("NEW AVATAR", newAvatar);
      updatedUser.avatar = newAvatar;
    }
    // set user data OBJ to update the user doc.
    const userNew = await updateUser(updatedUser);
    console.log("AFTER FUnc, userNew result:", userNew);
    dispatch({ action: "LOGIN", payload: userNew });
    console.log("AFTER THE DISPATCH>");
    // handle error, e.g. show error message to user
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
