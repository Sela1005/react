import React, { useEffect, useState } from "react";
import { Space, Radio, Input } from "antd";
import ButtonComponent from "../../component/ButtonComponent/ButtonComponent";
import InputForm from "../../component/InputForm/InputForm";
import {
  Container,
  Content,
  RadioGroupContainer,
  FormContainer,
  InputWrapper,
  ButtonWrapper,
  RadioButton,
  WapperContentLogin,
  WapperContentRegister,
} from "./style";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../component/LoadingComponent/Loading";
import * as message from "../../component/Messages/Message";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import InputFormPassword from "../../component/InputForm/InputFormPassword";
import { updateUser } from "../../redux/slices/userSlide";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [position, setPosition] = useState("login");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [confirmPasswordRegister, setConfirmPasswordRegister] = useState("");

  const mutationLogin = useMutationHooks((data) => UserService.loginUser(data));
  const mutationRegister = useMutationHooks((data) =>
    UserService.registerUser(data)
  );

  const {
    data: loginData,
    isPending: isLoginPending,
    isSuccess: isLoginSuccess,
    isError: isLoginError,
  } = mutationLogin;
  const {
    data: registerData,
    isPending: isRegisterPending,
    isSuccess: isRegisterSuccess,
    isError: isRegisterError,
  } = mutationRegister;

  const handleOnchangeEmailLogin = (value) => {
    setEmailLogin(value);
  };
  const handleOnchangePasswordLogin = (value) => {
    setPasswordLogin(value);
  };

  const handleOnchangeEmailRegister = (value) => {
    setEmailRegister(value);
  };
  const handleOnchangePasswordRegister = (value) => {
    setPasswordRegister(value);
  };
  const handleOnchangeConfirmPasswordRegister = (value) => {
    setConfirmPasswordRegister(value);
  };
  useEffect(() => {
    if (loginData?.status === "ERR") {
      message.error(
        "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập."
      );
      return;
    } else if (isLoginSuccess) {
      message.success("Đăng nhập thành công!");
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }
      localStorage.setItem(
        "access_token",
        JSON.stringify(loginData?.access_token)
      );
      if (loginData?.access_token) {
        const decoded = jwtDecode(loginData?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, loginData?.access_token);
        }
      }
    }
  }, [isLoginSuccess, isLoginError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  useEffect(() => {
    if (registerData?.status == "OK") {
      message.success("Đăng ký thành công");
      setPosition("login");
    }
  }, [isRegisterSuccess, isRegisterError]);

  const handleSignUp = () => {
    mutationRegister.mutate({
      email: emailRegister,
      password: passwordRegister,
      confirmPassword: confirmPasswordRegister,
    });
  };

  const handleSignIn = () => {
    mutationLogin.mutate({
      email: emailLogin,
      password: passwordLogin,
    });
  };

  return (
    <Container>
      <Content>
        <RadioGroupContainer>
          <Space
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Radio.Group
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <RadioButton value="login">Đăng Nhập</RadioButton>
              <RadioButton value="register">Đăng Ký</RadioButton>
            </Radio.Group>
          </Space>
        </RadioGroupContainer>
        <FormContainer>
          {position === "login" && (
            <WapperContentLogin>
              <div>
                <InputWrapper>
                  <p>Nhập Email</p>
                  <InputForm
                    placeholder="Email"
                    value={emailLogin}
                    onChange={handleOnchangeEmailLogin}
                  />
                </InputWrapper>
                <InputWrapper>
                  <p>Mật khẩu</p>
                  <InputFormPassword
                    placeholder="Nhập mật khẩu"
                    value={passwordLogin}
                    onChange={handleOnchangePasswordLogin}
                  />
                </InputWrapper>
                {loginData?.status === "ERR" && (
                  <span style={{ color: "red" }}>{loginData?.message}</span>
                )}
                <ButtonWrapper>
                  <Loading isPending={isLoginPending}>
                    <ButtonComponent
                      disabled={!emailLogin.length || !passwordLogin.length}
                      onClick={handleSignIn}
                      textButton="Đăng nhập"
                      type="primary"
                      style={{
                        width: "150px",
                        height: "34px",
                        marginTop: "20px",
                        background: "rgb(69, 136, 181)",
                      }}
                    />
                  </Loading>
                </ButtonWrapper>
                <p>Quên mật khẩu?</p>
              </div>
            </WapperContentLogin>
          )}

          {position === "register" && (
            <WapperContentRegister>
              <div>
                <InputWrapper>
                  <p>Nhập Email</p>
                  <InputForm
                    placeholder="Nhập Email"
                    value={emailRegister}
                    onChange={handleOnchangeEmailRegister}
                  />
                </InputWrapper>
                <InputWrapper>
                  <p>Mật khẩu</p>
                  <InputFormPassword
                    placeholder="Nhập mật khẩu"
                    value={passwordRegister}
                    onChange={handleOnchangePasswordRegister}
                  />
                </InputWrapper>
                <InputWrapper>
                  <p>Nhập lại mật khẩu</p>
                  <InputFormPassword
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPasswordRegister}
                    onChange={handleOnchangeConfirmPasswordRegister}
                  />
                </InputWrapper>
                {registerData?.status === "ERR" && (
                  <span style={{ color: "red" }}>{registerData?.message}</span>
                )}
                <ButtonWrapper>
                  <Loading isPending={isRegisterPending}>
                    <ButtonComponent
                      disabled={
                        !emailRegister.length ||
                        !passwordRegister.length ||
                        !confirmPasswordRegister.length
                      }
                      onClick={handleSignUp}
                      textButton="Đăng ký"
                      type="primary"
                      style={{
                        width: "150px",
                        height: "34px",
                        marginTop: "20px",
                        background: "rgb(69, 136, 181)",
                      }}
                    />
                  </Loading>
                </ButtonWrapper>
              </div>
            </WapperContentRegister>
          )}
        </FormContainer>
      </Content>
    </Container>
  );
};

export default SignInPage;
