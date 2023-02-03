import { Image } from "cloudinary-react";

const Cloudinary = ({ img }) => {
  return (
    <Image
      cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
      publicId={"dev_setups/" + img}
      className="!w-[100%] !h-[100%]"
    />
  );
};

export default Cloudinary;
