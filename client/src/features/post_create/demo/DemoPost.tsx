import { useState } from "react";
import { Skeleton } from "antd";
import { Avatar, Button, CardHeader, Stack } from "@mui/material";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import ImageCarousel from "../../../components/corousel/ImageCorousel";
import PostEditor from "../../../components/postEditor/PostEditor";
import Tag from "../../../components/tag/Tag";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Cloudinary from "../../../components/cloudImage/Cloudinary";
import useEffectOnce from "../../../hooks/useEffectOnce";
import { PostDetail } from "../../../types/api";

const DemoPost = ({ formik, post }: { formik: any; post?: PostDetail }) => {
  const [showImageList, setShowImageList] = useState<boolean>(false);
  const { imageList, post_name, tags } = formik.values;
  const currentUser = { name: "", image: "" };
  //   const { currentUser } = useAppSelector((state) => state.users);
  useEffectOnce(() => {
    setTimeout(() => {
      setShowImageList(true);
    }, 200);
  });

  const location = useLocation();

  return (
    <div>
      <header
        className="font-serif tracking-wider ml-3 p-3 text-white"
        style={{ background: "#03776f" }}
      >
        {"Demo visualization"}
      </header>

      <CardHeader
        avatar={
          <Avatar sx={{ background: "#00000064" }} aria-label="recipe">
            {post?.user.image || currentUser?.image ? (
              <Cloudinary img={post?.user.image || currentUser?.image} />
            ) : (
              ""
            )}
          </Avatar>
        }
        title={post?.user.name || currentUser?.name}
        subheader={format(new Date(Date.now()), "MMM do. yyyy")}
      />

      <h2 className="font-serif tracking-wider ml-3 p-3 mb-2 flex flex-col  text-lg font-bold text-center">
        <span>{post_name}</span>
      </h2>

      {showImageList && imageList.length ? (
        <ImageCarousel images={imageList} />
      ) : imageList.length && !showImageList ? (
        <Skeleton.Image active={true} className="!w-full !h-[300px]" />
      ) : (
        ""
      )}

      <PostEditor displayMode="PREVIEW" formik={formik} createPost={true} />

      <Stack direction="row" spacing={1} className="ml-4">
        {tags.map((tag: string, i: number) => (
          <Tag key={i} label={tag} />
        ))}
      </Stack>

      <div className="w-[95%] flex justify-end my-3">
        <Button
          sx={{ border: "1px solid gray" }}
          className="!rounded-2xl !bg-black !text-white !py-2 !px-4 !text-sm"
          type="submit"
          disabled={!formik.isValid}
        >
          {location.pathname === "/post-create" ? "Publish post" : "Edit post"}
        </Button>
      </div>
    </div>
  );
};

export default DemoPost;
