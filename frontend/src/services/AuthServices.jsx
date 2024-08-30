import axios from "axios";
import { BACKEND_URL } from "../App";
import { toast } from "react-toastify";

// ----------------- VALIDATE EMAIL -----------------
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// ----------------- REGISTER USER -----------------
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/register`,
      userData
    );
    if (response.status === 201) {
      toast.success("Successfully registered");
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// ----------------- LOGIN USER -----------------
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/login`,
      userData
    );
    if (response.statusText === "OK") {
      toast.success("Successfully loggedin");
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// ----------------- GET ALL TODOS -----------------
export const getTodos = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BACKEND_URL}/api/todos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// ----------------- GET A SINGLE TODO -----------------
export const getTodo = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BACKEND_URL}/api/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// ----------------- ADD A TODO -----------------
export const addTodo = async (todoData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BACKEND_URL}/api/todos/add`,
      todoData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.status === 201) {
      toast.success("Todo added successfully!!");
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// ----------------- DELETE A TODO -----------------
export const deleteTodo = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BACKEND_URL}/api/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      toast.success("Todo deleted successfully!!");
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// ----------------- UPDATE A TODO -----------------
export const updateTodo = async (todoData) => {
  try {
    const token = localStorage.getItem("token");
    const { id, ...tempData } = todoData;
    const response = await axios.put(
      `${BACKEND_URL}/api/todos/${todoData.id}`,
      tempData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

