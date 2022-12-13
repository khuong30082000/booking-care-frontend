import React, { useState } from "react";
// import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
// import { FormattedMessage } from "react-intl";
import { handleLogin } from "../../services/userService.js";
import { set } from "lodash";
import { useDispatch } from "react-redux";
import { userLoginSuccess } from "../../store/actions";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const handleBtnLogin = async () => {
    try {
      let res = await handleLogin(username, password);
      if (res && res.errCode !== 0) {
        setErrorMessage(res.message);
      }
      if (res && res.errCode === 0) {
        setErrorMessage("");

        dispatch(userLoginSuccess(res.user));
      }
    } catch (error) {
      // console.log(error);
      setErrorMessage(error.message);
    }
  };

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleBtnLogin();
    }
  };
  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content row">
          <div className="col-12  text-login">Login</div>
          <div className="col-12 form-group login-input">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="col-12 form-group login-input">
            <label>Password:</label>
            <div className="custom-input-password">
              <input
                type={isShowPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <i
                className={isShowPassword ? "far fa-eye" : "far fa-eye-slash"}
                onClick={handleShowPassword}
              ></i>
            </div>
          </div>
          <div className="col-12" style={{ color: "red" }}>
            {errorMessage}
          </div>
          <div className="col-12">
            <button className="btn-login" onClick={handleBtnLogin}>
              Log in
            </button>
          </div>
          <div className="col-12">
            <span className="forgot-password">Forgot your password?</span>
          </div>
          <div className="col-12 text-center mt-3">
            <span className="text-orther-login">Or Login with:</span>
          </div>
          <div className="col-12 social-login">
            <i className="fab fa-google-plus-g google"></i>
            <i className="fab fa-facebook-f facebook"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     language: state.app.language,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     navigate: (path) => dispatch(push(path)),
//     adminLoginSuccess: (adminInfo) =>
//       dispatch(actions.adminLoginSuccess(adminInfo)),
//     adminLoginFail: () => dispatch(actions.adminLoginFail()),
//   };
// };

export default Login;
