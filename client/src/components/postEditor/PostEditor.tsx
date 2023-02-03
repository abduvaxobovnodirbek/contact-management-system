import { SetStateAction } from "react";
import parser from "html-react-parser";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { setOptions } from "./PostEditorConfig";
import { postEditorTypes } from "../../types";

const PostEditor = ({
  displayMode,
  formik,
  createPost,
  post,
}: postEditorTypes) => {
  const handleChange = (content: SetStateAction<string>) => {
    if (formik && createPost) {
      formik.setFieldValue("description", content);
    }
  };
  const description = createPost ? formik.values.description : post;
  return (
    <>
      {displayMode === "EDIT" ? (
        <div>
          <SunEditor
            defaultValue={description || undefined}
            onChange={handleChange}
            autoFocus={true}
            lang="en"
            setOptions={setOptions}
            placeholder={
              formik && formik.errors.description
                ? formik.errors.description
                : "type anything..."
            }
            onBlur={() => {
              if (formik) {
                formik.setFieldTouched("description", true);
              }
            }}
          />
        </div>
      ) : (
        <div>
          {description && (
            <div>
              <div className="sun-editor">
                <div className="sun-editor-editable ">
                  {parser(description)}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PostEditor;
