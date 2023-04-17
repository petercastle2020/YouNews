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

  //Track user changes
  const [userDataChanges, setUserDataChanges] = useState({});

  // Update the component once user is loaded.
  useEffect(() => {
    console.log(user);
    /* DISPATCH is not putting it updated user info. resulting in using the same url
    to delete old resources already deleted.
     */
    if (user) {
      setLoading(false);
      setOldAvatar(user.avatar);
      setJoinedAt(user.joinedAt);
      setAvatar(user.avatar);
      setName(user.name);
      setEmail(user.email);
      setHandle(user.handle);
    }
  }, [user, dispatch]);

  // Listen for changes in the context state and update the component.
  // useEffect(() => {
  //   if (user) {
  //     // setLoading(false);
  //     setOldAvatar(user.avatar);
  //     setJoinedAt(user.joinedAt);
  //     setAvatar(user.avatar);
  //     setName(user.name);
  //     setEmail(user.email);
  //     setHandle(user.handle);
  //   }
  // }, [dispatch, user]);

  const updateUserData = async (newAvatarFile, toBeDeletedURL, JsonBody) => {
    if (!user) {
      // handle the case where user is not available
      console.log("USER without Auth.");
      return;
    }

    if (!newAvatarFile && !JsonBody) {
      // Warning. ABOUT NO CHANGES.
      return;
    }

    // create formData
    const formData = new FormData();
    formData.append("file", newAvatarFile);
    formData.append("deleteURL", toBeDeletedURL);
    // iterate over the keys in JsonBody and append any non-empty values to the form data
    for (const [key, value] of Object.entries(JsonBody)) {
      if (value !== undefined && value !== "") {
        formData.append(key, value);
      }
    }

    const response = await fetch("/api/user/update", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        // "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    const json = await response.json();

    if (response.ok) {
      // console.log(json.newAvatar);
      console.log(json);
      return json.user;
    }
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
    setUserDataChanges({
      ...userDataChanges,
      name: event.target.value,
    });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEditing(true);
    setUserDataChanges({
      ...userDataChanges,
      email: event.target.value,
    });
  };

  const handleHandleChange = (event) => {
    setHandle(event.target.value);
    setEditing(true);
    setUserDataChanges({
      ...userDataChanges,
      handle: event.target.value,
    });
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    try {
      const userNew = await updateUserData(
        avatarFile,
        oldAvatar,
        userDataChanges
      );

      if (userNew) {
        localStorage.setItem("user", JSON.stringify(userNew));
        dispatch({ action: "LOGIN", payload: userNew });
        console.log("AFTER THE DISPATCH>");
      }

      setEditing(false);
    } catch (error) {
      console.log("Error updating user data:", error);
      // Display a message to the user informing them of the failure
      setEditing(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
