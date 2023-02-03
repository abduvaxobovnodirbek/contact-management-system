import { Field } from "formik";

export default function Title({ formik }: any) {
  return (
    <div className="mb-4">
      <Field
        name="post_name"
        type="text"
        className={`text-center border-b outline-none w-[100%] focus:border-gray-400 py-3 transition-colors font-serif text-2xl tracking-wider ${
          formik.touched.post_name && formik.errors.post_name
            ? " placeholder:text-red-500 placeholder:text-sm  italic border-red-300 focus:border-red-300"
            : ""
        }`}
        placeholder={
          formik.touched.post_name && formik.errors.post_name
            ? formik.errors.post_name
            : "Add a title"
        }
      />
    </div>
  );
}
