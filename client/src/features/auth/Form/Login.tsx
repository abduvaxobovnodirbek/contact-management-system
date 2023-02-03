import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { toggleModal } from "../../../services/ui/modalSlice";
import { useEmailLoginMutation } from "../../../services/api/auth";
import { getCurrentUser } from "../../../services/api/user";
import Spinner from "../../../components/spinner/Spinner";

const Login: React.FC = () => {
  const [emailLogin, { isLoading }] = useEmailLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cookie = new Cookies();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const { success, accessToken } = await emailLogin(values).unwrap();
      if (success) {
        cookie.set("token", accessToken);
      }
      const { payload } = await dispatch(getCurrentUser());
      if (payload) {
        cookie.set("role", payload.role);
        message.success("successfully logged in");
        navigate("/");
      }
      form.resetFields();
      dispatch(toggleModal(false));
    } catch (error: any) {
      dispatch(toggleModal(false));
      message.error(error.data.error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {isLoading ? <Spinner isLoading={isLoading} /> : ""}

      <div className="flex flex-col items-center">
        <Form
          name="basic"
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: (
                  <p style={{ fontSize: "12px", fontStyle: "italic" }}>
                    The input is not valid E-mail!
                  </p>
                ),
              },
              {
                required: true,
                message: (
                  <p
                    style={{
                      fontSize: "12px",
                      fontStyle: "italic",
                      marginLeft: "5px",
                    }}
                  >
                    Please input your E-mail!
                  </p>
                ),
              },
            ]}
          >
            <Input
              type="email"
              placeholder={"Enter email address" || ""}
              className="ant-btn_login"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: (
                  <p
                    style={{
                      fontSize: "12px",
                      fontStyle: "italic",
                      marginLeft: "5px",
                    }}
                  >
                    Please input your password!
                  </p>
                ),
              },
            ]}
          >
            <Input.Password
              placeholder="enter password"
              className="ant-btn_login"
            />
          </Form.Item>

          <Form.Item className="text-center">
            <Button className="ant-btn_submit w-[120px]" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
