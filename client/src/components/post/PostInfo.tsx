import { Avatar, CardHeader, Stack } from "@mui/material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { PostDetail } from "../../types/api";
import ImageCarousel from "../corousel/ImageCorousel";
import TextEditor from "../postEditor/PostEditor";
import Tag from "../tag/Tag";
import PostActions from "../../features/home/post/PostActions";
import Cloudinary from "../cloudImage/Cloudinary";
import { SyntheticEvent } from "react";

const PostInfo = ({
  width,
  post,
  cardExist,
  postActionsExist,
}: {
  width: number;
  cardExist: boolean;
  postActionsExist: boolean;
  post: PostDetail | undefined;
}) => {
  const navigate = useNavigate();

  return (
    <div className={`${width < 900 ? "w-[100%]" : "w-[70%]"} p-4`}>
      {cardExist ? (
        <CardHeader
          avatar={
            post?.user?.image ? (
              <Avatar>
                <div>
                  <Cloudinary img={post?.user?.image} />
                </div>
              </Avatar>
            ) : (
              <Avatar sx={{ background: "#00000064" }} aria-label="recipe">
                <span>{post?.user?.name.at(0)}</span>
              </Avatar>
            )
          }
          title={post?.user?.name}
          subheader={
            <span className="">
              {format(new Date(post?.createdAt || Date.now()), "MMM do. yyyy")}
            </span>
          }
          action={<PostActions post={post as PostDetail} />}
        />
      ) : (
        ""
      )}

      <h2 className="font-serif tracking-wider ml-3 p-3 mb-2 flex flex-col  text-lg font-bold text-center ">
        <span>{post?.post_name}</span>
      </h2>

      {post?.imageList?.length ? (
        <ImageCarousel images={post?.imageList} />
      ) : (
        ""
      )}

      <TextEditor
        displayMode={"PREVIEW"}
        createPost={false}
        post={post?.description || ""}
      />

      <div
        className={`ml-4 flex justify-between items-end ${
          width < 700 ? "flex-col !items-start !justify-end" : ""
        }`}
      >
        {postActionsExist ? (
          <div className="relative -left-5 -top-4">
            <PostActions post={post as PostDetail} />
          </div>
        ) : (
          ""
        )}
      </div>

      <Stack direction="row" spacing={1} className={`ml-4 flex`}>
        {post?.tags?.map((tag: string, i: number) => (
          <Tag
            key={i}
            label={tag}
            handleClick={(e: SyntheticEvent) => {
              e.stopPropagation();
              navigate(`/tags/${tag}`);
            }}
          />
        ))}
      </Stack>
    </div>
  );
};

export default PostInfo;
