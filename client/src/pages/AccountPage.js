import { Container, Box } from "@mui/material";
import AccountPanel from "../components/AccountPanel";
import { useAuthContext } from "../hooks/useAuthContext";
import { AuthContext } from "../context/AuthContext";

// spinner
import CircularIndeterminate from "../components/CircularIndeterminate";

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
  const [userData, setUserData] = useState(null);

  //Track user changes
  const [userDataChanges, setUserDataChanges] = useState({});

  // Update the component once user is loaded.
  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user, dispatch]);

  //  use the user from Auth to create a userData obj, therefore changes into userData
  //  can be made right away and displayed.
  // REASON: dispatch has delay, so the component cannot re-render with new values immediately.
  useEffect(() => {
    if (userData) {
      setLoading(false);
      setOldAvatar(userData.avatar);
      setJoinedAt(userData.createdAt);
      setAvatar(userData.avatar);
      setName(userData.name);
      setEmail(userData.email);
      setHandle(userData.handle);
    }
  }, [userData]);

  const updateUserData = async (newAvatarFile, toBeDeletedURL, JsonBody) => {
    if (!user) {
      // handle the case where user is not available
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
    setLoading(true);

    try {
      const userNew = await updateUserData(
        avatarFile,
        oldAvatar,
        userDataChanges
      );

      if (userNew) {
        localStorage.setItem("user", JSON.stringify(userNew));
        dispatch({ action: "LOGIN", payload: userNew });
        // setting the user new info, reason: dispatch has delay.
        setUserData(userNew);
        console.log("AFTER THE DISPATCH>");
      }

      setLoading(false);
      setEditing(false);
      window.location.reload();
    } catch (error) {
      console.log("Error updating user data:", error);
      // Display a message to the user informing them of the failure
      setEditing(false);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <CircularIndeterminate size={100} />
      </Box>
    );
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
