import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert, Stack } from "@mui/material";
import { message } from "antd";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useAppSelector } from "../../hooks/useAppSelector";
import Spinner from "../../components/spinner/Spinner";
import Title from "../post_create/title/Title";
import TextEditor from "../../components/postEditor/PostEditor";
import CreateTags from "../post_create/createTags/CreateTags";
import Image from "../post_create/image/Image";
import DemoVisualization from "../post_create/demo/DemoPost";
import useWindowSize from "../../hooks/useWindowSize";
import { PostDetail } from "../../types/api";
import { useEditPostMutation } from "../../services/api/post";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { adminControlApi } from "../../services/api/admin";

let validationSchema = Yup.object({
  post_name: Yup.string().required("*post name  is required"),
  tags: Yup.array()
    .min(1, "*at least 1 tag must be provided")
    .required("*post tag is required"),
  description: Yup.string().min(100).required("*post description is required"),
  imageList: Yup.array(),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const EditForm = ({
  post,
  setShowEditForm,
}: {
  post: PostDetail | undefined;
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const initialValues: FormValues = {
    post_name: post?.post_name || "",
    description: post?.description || "",
    tags: post?.tags || [],
    imageList: [],
  };
  const [editPost, { isLoading }] = useEditPostMutation();
  const { currentUser } = useAppSelector((state) => state.users);
  const { width } = useWindowSize();
  const { stepFirst, stepSecond } = useAppSelector(
    (state) => state.postSteps
  );
  const dispatch = useAppDispatch();

  const handleSubmit = (data: FormValues, { resetForm }: any) => {
    const images: string[] = [];
    if (data.imageList) {
      data.imageList.forEach((file: any) => {
        images.push(file.preview);
      });
    }

    editPost({
      ...data,
      imageList: images,
      post_id: post?._id || "",
      userId: post?.user._id || currentUser?._id || "",
    })
      .unwrap()
      .then((data) => {
        message.success("Successfully edited post!");

        dispatch(
          adminControlApi.util.invalidateTags([{ type: "Posts", id: "LIST" }])
        );
        setShowEditForm(false);
      })
      .catch((err) => {
        message.error("Something went wrong");
      });
  };

  return (
    <div className={`${width > 1000 ? "w-[75%]" : "w-[90%]"}`}>
      <div
        className="flex items-center  absolute right-12 top-24 shadow-sm p-2 cursor-pointer"
        onClick={() => setShowEditForm(false)}
      >
        <MdOutlineArrowBackIos />{" "}
        <span className="ml-2 font-serif text-blue-900 z-50">
          back to posts table
        </span>
      </div>
      <>
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

                    <TextEditor
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
                          className="font-serif tracking-wider p-3 text-white"
                          style={{ background: "#f6f6f6", color: "red" }}
                        >
                          Please step back and fill the required form
                        </header>
                        <Stack
                          sx={{ width: "100%", marginTop: "35px" }}
                          spacing={2}
                        >
                          {Object.values(formik.errors).map(
                            (errName: any, i: number) => {
                              return (
                                <Alert severity="error" key={i}>
                                  {errName}
                                </Alert>
                              );
                            }
                          )}
                        </Stack>
                      </>
                    ) : (
                      <DemoVisualization formik={formik} post={post} />
                    )}
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      </>
    </div>
  );
};

export default EditForm;
