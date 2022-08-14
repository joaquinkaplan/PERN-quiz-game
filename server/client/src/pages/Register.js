import React, { useState, useEffect } from "react";
import { Alert, FormRow } from "../components";
import { useAppContext } from "../context/appContext.js";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/RegisterPage";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  checkPassword: "",
  nickname: "",
  isMember: true,
};

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const { user, isLoading, showAlert, displayAlert, setUpUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      nickname,
      lastName,
      email,
      password,
      checkPassword,
      isMember,
    } = values;
    if (
      !isMember &&
      (!email ||
        !password ||
        !nickname ||
        password !== checkPassword ||
        (!isMember && !firstName) ||
        !lastName)
    ) {
      displayAlert();
      return;
    }
    const currentUser = {
      firstName,
      email,
      password,
      checkPassword,
      nickname,
      lastName,
      isMember,
    };

    if (isMember) {
      setUpUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setUpUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <h3 className="login-header">
          {values.isMember ? "Login" : "Register"}
        </h3>
        {showAlert && <Alert />}

        {/* firstName input */}
        {!values.isMember && (
          <FormRow
            type="text"
            labelText="first name"
            name="firstName"
            value={values.firstName}
            handleChange={handleChange}
          />
        )}
        {!values.isMember && (
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={values.lastName}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        {!values.isMember && (
          <FormRow
            type="password"
            labelText="password (again!)"
            name="checkPassword"
            value={values.checkPassword}
            handleChange={handleChange}
          />
        )}
        {!values.isMember && (
          <FormRow
            type="text"
            name="nickname"
            value={values.nickname}
            handleChange={handleChange}
          />
        )}

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
