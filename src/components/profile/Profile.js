import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser, updateAvatar } from "../../redux/actions/userActions";
import "../../styles/Profile.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [fileInputState, setFileInputState] = useState("");

  function handleSubmit() {
    dispatch(logoutUser()).then((response) => {
      if (response.payload.success) {
        history.push("/login");
      }
    });
  }

  function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      uploadImage(e.target.result);
    };
    reader.onerror = (err) => {
      console.log(err);
    };
  }

  const uploadImage = async (base64EncodedImage) => {
    try {
      dispatch(updateAvatar(base64EncodedImage));
      setFileInputState("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="overlay">
        <div className="modalContent">
          <p>
            <span>
              <label className="filePicker" htmlFor="filePicker">
                Edit Avatar
              </label>
              <input
                id="filePicker"
                value={fileInputState}
                style={{ visibility: "hidden" }}
                type={"file"}
                onChange={handleUpload}
              />
            </span>
          </p>
          <p>
            <span>
              <button onClick={handleSubmit} className="btn">
                Logout
              </button>
            </span>
          </p>
          <button className="btn" onClick={() => history.push("/")}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
