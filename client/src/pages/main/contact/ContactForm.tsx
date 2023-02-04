import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { message } from "antd";
import * as Yup from "yup";
import ProfileImage from "../../../features/profile/ProfileImage";
import { Avatar, FormControl, Input, InputLabel } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { FaUserEdit } from "react-icons/fa";
import InputMask from "react-input-mask";
import { useGetCategoriesQuery } from "../../../services/api/category";
import { usePostContactMutation } from "../../../services/api/contact";
import Spinner from "../../../components/spinner/Spinner";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const [newProfileImg, setNewProfileImg] = useState<boolean>(false);
  const { data } = useGetCategoriesQuery();
  const [createContact, { isLoading }] = usePostContactMutation();
  const navigate = useNavigate();

  let validationSchema = Yup.object({
    name: Yup.string().required("*contact name is required"),
    email: Yup.string().required("*contact email is required"),
    phoneNumber: Yup.string().required("*contact phone number is required"),
    image: Yup.array(),
    category: Yup.string().required("*contact category is required"),
  });

  type FormValues = Yup.InferType<typeof validationSchema>;

  const initialValues: FormValues = {
    name: "",
    email: "",
    phoneNumber: "",
    image: [],
    category: "",
  };

  const handleSubmit = (data: FormValues, { resetForm }: any) => {
    let info = {};
    if (data.image?.length) {
      info = {
        ...data,
        image: data.image[0].preview,
      };
    } else {
      info = {
        ...data,
        image: "",
      };
    }

    createContact({ ...info })
      .unwrap()
      .then((data) => {
        navigate("/contact-list");
        message.success("successfully created new contact!");
      })
      .catch((err: any) => {
        message.error("something went wrong");
      });
  };

  const handleNewImage = (value: boolean) => {
    setNewProfileImg(value);
  };

  return (
    <div className={`max-w-[600px] mx-auto mt-10 shadow-md p-4`}>
      <h3
        className="text-center text-xl font-serif text-white  shadow-md p-3 mb-8"
        style={{ background: "#03776f" }}
      >
        Add New Contact
      </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              {isLoading ? <Spinner isLoading={isLoading} /> : ""}
              <>
                {newProfileImg ? (
                  <div className="flex  justify-center">
                    <ProfileImage
                      formik={formik}
                      handleNewImage={() => console.log("")}
                    />
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <Avatar
                      sx={{
                        background: "#03776f",
                        width: 70,
                        height: 70,
                      }}
                    >
                      <AccountCircle className="text-white !text-7xl " />
                    </Avatar>
                    <FaUserEdit
                      onClick={() => {
                        handleNewImage(true);
                      }}
                      className="!cursor-pointer !text-gray-600 relative left-4"
                      fontSize={30}
                      color="gray"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <Field
                    name="name"
                    type="text"
                    className={`text-center border-b outline-none w-[100%] focus:border-gray-400 py-3 transition-colors font-serif text-xl tracking-wider ${
                      formik.touched.name && formik.errors.name
                        ? " placeholder:text-red-500 placeholder:text-sm  italic border-red-300 focus:border-red-300"
                        : ""
                    }`}
                    placeholder={
                      formik.touched.name && formik.errors.name
                        ? formik.errors.name
                        : "Add a Full Name"
                    }
                  />
                </div>

                <div>
                  <Field
                    as="select"
                    name="category"
                    id="category"
                    className={`text-center border-b outline-none w-[100%] focus:border-gray-400 py-3 transition-colors font-serif text-xl tracking-wider ${
                      formik.touched.category && formik.errors.category
                        ? " italic border-red-300 focus:border-red-300"
                        : ""
                    }`}
                    style={{ width: "100%" }}
                    onBlur={() => {
                      formik.setFieldTouched("category", true);
                    }}
                  >
                    <option value="">Add a contact category</option>
                    {data &&
                      data.map((category, index) => {
                        return (
                          <option value={category._id} key={index}>
                            {category.name}
                          </option>
                        );
                      })}
                  </Field>
                </div>

                <div className="mb-4">
                  <Field
                    name="email"
                    type="email"
                    className={`text-center border-b outline-none w-[100%] focus:border-gray-400 py-3 transition-colors font-serif text-xl tracking-wider ${
                      formik.touched.email && formik.errors.email
                        ? " placeholder:text-red-500 placeholder:text-sm  italic border-red-300 focus:border-red-300"
                        : ""
                    }`}
                    placeholder={
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : "Add an Email Address"
                    }
                  />
                </div>

                <div className="flex justify-center w-[100%] mt-5">
                  <InputMask
                    mask="+\9\98 (99) 999-99-99"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                  >
                    <FormControl
                      className="mt-5"
                      sx={{
                        m: 1,
                        margin: "0px",
                      }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="standard-adornment-login">
                        Phone number
                      </InputLabel>
                      <Input
                        id="standard-adornment-login"
                        type={"text"}
                        className="text-center"
                        name="phoneNumber"
                        error={
                          formik.touched.phoneNumber &&
                          Boolean(formik.errors.phoneNumber)
                        }
                      />
                    </FormControl>
                  </InputMask>
                </div>
                <div className="flex justify-center w-[100%] mt-2">
                  <button
                    className="!rounded-2xl !mt-4 !text-white bg-gray-600 !py-2 !px-4 !text-sm w-[50%]"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Confirm
                  </button>
                </div>
              </>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ContactForm;
