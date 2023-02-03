import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { message } from "antd";
import * as Yup from "yup";
import { Alert, Stack } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import CreateTags from "./createTags/CreateTags";
import Title from "./title/Title";
import DemoVisualization from "./demo/DemoPost";
import Image from "./image/Image";
import PostEditor from "../../components/postEditor/PostEditor";
import useWindowSize from "../../hooks/useWindowSize";
import Spinner from "../../components/spinner/Spinner";
import { useCreatePostMutation } from "../../services/api/post";


const FormComponent = () => {
  const navigate = useNavigate();
  const [createPost, { isLoading }] = useCreatePostMutation();

  let validationSchema = Yup.object({
    post_name: Yup.string().required("*post title is required" || ""),
    tags: Yup.array()
      .min(1, "*at least 1 tag must be provided" || "")
      .required("*post tag is required" || ""),
    description: Yup.string()
      .min(100)
      .required("*post description is required" || ""),
    imageList: Yup.array(),
  });

  type FormValues = Yup.InferType<typeof validationSchema>;

  const initialValues: FormValues = {
    post_name: "",
    description: "",
    tags: [],
    imageList: [],
  };

  const { width } = useWindowSize();
  const { stepFirst, stepSecond } = useAppSelector((state) => state.postSteps);

  const handleSubmit = (data: FormValues, { resetForm }: any) => {
    const images: string[] = [];
    if (data.imageList) {
      data.imageList.forEach((file: any) => images.push(file.preview));
    }

    createPost({ ...data, imageList: images })
      .unwrap()
      .then((data) => {
        message.success("successfully created new post!");
        navigate("/");
      })
      .catch((err: any) => {
        message.error(err.data.error || "something went wrong");
      });
  };

  return (
    <div className={`${width > 1000 ? "w-[75%]" : "w-[90%]"}`}>
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
              {stepFirst ? (
                <>
                  <Title formik={formik} />

                  <PostEditor
                    displayMode="EDIT"
                    formik={formik}
                    createPost={true}
                  />
                </>
              ) : stepSecond ? (
                <div className={`${width > 1000 ? "w-[70%]" : "w-[100%]"}`}>
                  <CreateTags formik={formik} />
                  <Image formik={formik} />
                </div>
              ) : (
                <div className="max-w-[750px] mx-auto">
                  {Object.values(formik.errors).length ||
                  !formik.values.description ? (
                    <>
                      <header
                        className="font-serif tracking-wider p-3 text-white "
                        style={{ background: "#f6f6f6", color: "red" }}
                      >
                        {"Please step back and fill the required form"}
                      </header>
                      <Stack
                        sx={{ width: "100%", marginTop: "35px" }}
                        spacing={2}
                      >
                        {Object.values(formik.errors).map(
                          (errName: any, i: number) => {
                            return (
                              <Alert severity="error" key={i} className="">
                                {errName}
                              </Alert>
                            );
                          }
                        )}
                      </Stack>
                    </>
                  ) : (
                    <DemoVisualization formik={formik} />
                  )}
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormComponent;
