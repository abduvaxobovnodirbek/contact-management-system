import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { ImCancelCircle } from "react-icons/im";
import { Modal, Spin, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { getBase64 } from "../../utils/Base64Converter";


const ProfileImage = ({
  formik,
  handleNewImage,
}: {
  formik: any;
  handleNewImage: (val: boolean) => void;
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const imageList = formik.values.image || [];

  const handleCancel = () => setPreviewOpen(false);

  const createImagePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    formik.setFieldValue("image", newFileList);
    createImagePreview(newFileList[newFileList.length - 1]);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Profile Image</div>
    </div>
  );
  return (
    <div className=" flex !relative items-end justify-center">
      <Upload
        listType="picture-card"
        fileList={imageList}
        onPreview={handlePreview}
        onChange={handleChange}
        accept={".png,.jpg,.jpeg,.svg,.gif"}
        style={{ background: "red !important" }}
        iconRender={() => {
          return <Spin></Spin>;
        }}
        beforeUpload={(file) => {
          formik.setFieldValue("image", [...imageList, file]);
          return false;
        }}
      >
        {imageList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        style={{ zIndex: "10000" }}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>

      <ImCancelCircle
        onClick={() => {
          handleNewImage(false);
          formik.setFieldValue("image", []);
        }}
        className="!cursor-pointer !text-gray-600 absolute -right-5"
      />
    </div>
  );
};

export default ProfileImage;
