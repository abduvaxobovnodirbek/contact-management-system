import { Select } from "antd";
import type { SelectProps } from "antd";
import { useGetTagsQuery } from "../../../services/api/post";

const CreateTags = ({ formik }: any) => {
  const getTagsFunc = useGetTagsQuery();
  const options: SelectProps["options"] =
    getTagsFunc.data?.map((tag) => {
      return { value: tag, label: tag };
    }) || [];

  const handleChange = (value: string) => {
    formik.setFieldValue("tags", value);
  };

  return (
    <>
      <label
        htmlFor="tag"
        className={`font-serif text-gray-400 tracking-wider cursor-pointer ${
          formik.touched.tags && formik.errors.tags ? "text-red-600" : ""
        }`}
      >
        {formik.touched.tags && formik.errors.tags
          ? formik.errors.tags
          : "Tags you defined:"}
      </label>
      <Select
        mode="tags"
        id="tag"
        style={{ width: "100%" }}
        className={`font-serif text-xl tracking-wider pb-3 ${
          formik.touched.tags && formik.errors.tags
            ? "!border-red-500 border-b"
            : ""
        }`}
        onChange={handleChange}
        tokenSeparators={[","]}
        options={options}
        defaultValue={formik.values.tags}
        onBlur={() => {
          formik.setFieldTouched("tags", true);
        }}
      />
    </>
  );
};

export default CreateTags;
