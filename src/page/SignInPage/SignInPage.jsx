import React, { useState } from "react";
import { Space, Radio } from "antd";
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
  WapperContentRegister
} from "./style";

const SignInPage = () => {
  const [position, setPosition] = useState("login");

  return (
    <Container>
      <Content>
        <RadioGroupContainer>
          <Space style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)}>
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
                  <p>Số điện thoại/Email</p>
                  <InputForm placeholder='Nhập số điện thoại hoặc Email'/>
                </InputWrapper>
                <InputWrapper>
                  <p>Mật khẩu</p>
                  <InputForm placeholder='Nhập mật khẩu' />
                </InputWrapper>
                <ButtonWrapper>
                  <ButtonComponent
                    textButton="Đăng nhập"
                    type="primary"
                    style={{
                      width: "150px",
                      height: "34px",
                      marginTop: "20px",
                      background: "rgb(69, 136, 181)",
                    }}
                  />
                </ButtonWrapper>
                <p>Quên mật khẩu?</p>
              </div>
            </WapperContentLogin>
          )}

          {position === "register" && (
            <WapperContentRegister>
              <div>
                <InputWrapper>
                  <p>Số điện thoại</p>
                  <InputForm placeholder='Nhập số điện thoại'/>
                </InputWrapper>
                <InputWrapper>
                  <p>Mật khẩu</p>
                  <InputForm placeholder='Nhập nhập mật khẩu'/>
                </InputWrapper>
                <InputWrapper>
                  <p>Nhập lại mật khẩu</p>
                  <InputForm placeholder='Nhập lại mật khẩu'/>
                </InputWrapper>
                <ButtonWrapper>
                  <ButtonComponent
                    textButton="Đăng nhập"
                    type="primary"
                    style={{
                      width: "150px",
                      height: "34px",
                      marginTop: "20px",
                      background: "rgb(69, 136, 181)",
                    }}
                  />
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
