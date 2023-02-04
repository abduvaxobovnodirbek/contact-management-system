import { message } from "antd";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Spinner from "../../../components/spinner/Spinner";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  useCreateCategoryMutation,
  useEditCategoryMutation,
} from "../../../services/api/category";
import { postApi } from "../../../services/api/post";
import { Category } from "../../../types/api";

let validationSchema = Yup.object({
  category: Yup.string().required("*review category  is required"),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const CategoryForm = ({
  currentCategory,
  setCategory,
}: {
  currentCategory: Category | undefined;
  setCategory: React.Dispatch<React.SetStateAction<Category | undefined>>;
}) => {
  const initialValues: FormValues = {
    category: currentCategory?.name || "",
  };
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [editCategory, { isLoading: editCategoryLoading }] =
    useEditCategoryMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = (data: FormValues, { resetForm }: any) => {
    if (!currentCategory) {
      createCategory({ name: data.category })
        .unwrap()
        .then((data) => {
          message.success("Successfully created category!");
          resetForm();
        })
        .catch((err) => {
          message.error("Something went wrong");
        });
    } else {
      editCategory({ name: data.category, _id: currentCategory._id })
        .unwrap()
        .then((data) => {
          message.success("Successfully edited!");
          resetForm();
          setCategory(undefined);
          dispatch(postApi.util.invalidateTags([{ type: "Post", id: "LIST" }]));
        })
        .catch((err) => {
          message.error("Something went wrong");
        });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <>
            {isLoading || editCategoryLoading ? (
              <Spinner isLoading={isLoading} />
            ) : (
              ""
            )}

            <Form className="w-[100%] relative">
              {currentCategory ? (
                <span
                  className="absolute right-0 top-4 cursor-pointer"
                  onClick={() => setCategory(undefined)}
                >
                  X
                </span>
              ) : (
                ""
              )}
              <Field
                name="category"
                type="text"
                className={`text-center border-b  outline-none w-[100%] focus:border-gray-400 py-3 transition-colors font-serif text-2xl tracking-wider ${
                  formik.touched.category && formik.errors.category
                    ? " placeholder:text-red-500 placeholder:text-sm  italic border-red-300 focus:border-red-300"
                    : ""
                }`}
                placeholder={
                  formik.touched.category && formik.errors.category
                    ? formik.errors.category
                    : currentCategory
                    ? "Edit a category"
                    : "Add a category"
                }
              />
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default CategoryForm;
