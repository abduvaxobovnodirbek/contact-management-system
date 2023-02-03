import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { toggleModal } from "../../../services/ui/modalSlice";
import { getCurrentUser } from "../../../services/api/user";
import { useEmailRegisterMutation } from "../../../services/api/auth";
import Spinner from "../../../components/spinner/Spinner";

const Register: React.FC = () => {
  const [emailRegister, { isLoading }] = useEmailRegisterMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cookie = new Cookies();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const { success, accessToken } = await emailRegister(values).unwrap();
      if (success) {
        cookie.set("token", accessToken);
      }
      const { payload } = await dispatch(getCurrentUser());
      if (payload) {
        cookie.set("role", payload.role);
        message.success("successfully registered in");
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
            name="name"
            rules={[
              {
                type: "string",
                required: true,
                message: (
                  <p
                    style={{
                      fontSize: "12px",
                      fontStyle: "italic",
                      marginLeft: "5px",
                    }}
                  >
                    The input is not valid E-mail!
                  </p>
                ),
              },
            ]}
          >
            <Input
              placeholder={"Enter full name" || ""}
              className="ant-btn_login"
            />
          </Form.Item>

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
                    {"Please input your E-mail!"}
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
                    {"Please input your password!"}
                  </p>
                ),
              },
            ]}
          >
            <Input.Password
              placeholder={"Enter password" || ""}
              className="ant-btn_login"
            />
          </Form.Item>

          <Form.Item className="text-center">
            <Button className="ant-btn_submit w-[120px]" htmlType="submit">
              {"Register"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Register;
