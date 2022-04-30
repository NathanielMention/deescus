import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  GET_USER,
  UPDATE_USER,
} from "./actionType";

export async function registerUser(data) {
  try {
    const response = await fetch("http://localhost:5000/register", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const responseData = await response.json();

    return {
      type: REGISTER_USER,
      payload: responseData,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser(data) {
  try {
    const response = await fetch("http://localhost:5000/login", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 400 || response.status === 401) {
      return {
        type: LOGIN_USER,
        payload: { status: "unauth" },
      };
    } else {
      const responseData = await response.json();
      return {
        type: LOGIN_USER,
        payload: responseData,
      };
    }
  } catch (error) {
    console.log(error);
  }
}

export async function logoutUser() {
  try {
    const response = await fetch("http://localhost:5000/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 200) {
      return {
        type: LOGOUT_USER,
        payload: { success: true },
      };
    } else {
      const responseData = await response.json();
      return {
        type: LOGOUT_USER,
        payload: responseData,
      };
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getUser() {
  try {
    const response = await fetch("http://localhost:5000/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const responseData = await response.json();
    return {
      type: GET_USER,
      payload: responseData,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function updateAvatar(base64EncodedImage) {
  try {
    const response = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: JSON.stringify({ data: base64EncodedImage }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const responseData = await response.json();
    console.log(responseData);
    return {
      type: UPDATE_USER,
      payload: responseData,
    };
  } catch (error) {
    console.log(error);
  }
}
