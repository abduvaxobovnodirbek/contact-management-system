import { SyntheticEvent } from "react";
import HTMLReactParser, { domToReact } from "html-react-parser";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Chip, Tooltip } from "@mui/material";
import useWindowSize from "../../hooks/useWindowSize";
import { PostDetail } from "../../types/api";
import { useAppSelector } from "../../hooks/useAppSelector";
import Cloudinary from "../cloudImage/Cloudinary";
import { AiFillStar } from "react-icons/ai";
import CardHead from "./CardHead";

export default function PostCard({
  includeHead,
  post,
  includeSaveBtn,
  handleAddToBasket,
}: {
  includeHead: boolean;
  post?: PostDetail;
  handleAddToBasket?: (str: string) => void;
  includeSaveBtn: boolean;
}) {
  const { currentUser } = useAppSelector((state) => state.users);
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const options = {
    replace: (domeNode: any) => {
      if (!domeNode.attribs) {
        return;
      }

      if (domeNode) {
        return (
          <span className="mr-1">{domToReact(domeNode.children, options)}</span>
        );
      }
    },
  };

  return (
    <Card
      sx={{ maxWidth: "100%" }}
      className="mb-2 cursor-pointer !bg-transparent "
      elevation={0}
      onClick={() => navigate(`/posts/${post?._id}`)}
    >
      {includeHead ? (
        <CardHead
          currentUser={currentUser}
          post={post}
          handleAddToBasket={handleAddToBasket}
          includeSaveBtn={includeSaveBtn}
        />
      ) : (
        ""
      )}

      <div
        className={`flex items-center ${
          width > 576 ? "justify-between" : "!flex-col"
        }`}
      >
        <div>
          <CardContent className="!px-0">
            <Typography
              variant="body1"
              color="text.primary"
              className="!font-bold !text-lg "
            >
              {post?.post_name}
            </Typography>
          </CardContent>
          <CardContent className="!px-0">
            <div className="flex flex-wrap font-serif text-sm">
              {HTMLReactParser(post?.description.slice(0, 300) || "", options)}
            </div>
          </CardContent>
        </div>

        {post?.imageList.length ? (
          <div
            className={`${
              width > 576 ? "w-[350px] h-[120px]" : "w-[100%] h-[220px]"
            }`}
          >
            <Cloudinary img={post.imageList[0]} />
          </div>
        ) : (
          ""
        )}
      </div>

      {post && post.tags.length ? (
        <div className="flex justify-between items-center border-b pb-1">
          <div>
            <span className="font-serif text-gray-500 text-sm">post tag</span>
            <Tooltip title="Tag" placement="top">
              <Chip
                label={post.tags[0]}
                component={"div"}
                className="!cursor-pointer !px-4 !py-0 ml-2 "
                onClick={(e: SyntheticEvent) => {
                  e.stopPropagation();
                  navigate(`/tags/${post.tags[0]}`);
                }}
              />
            </Tooltip>
          </div>
        </div>
      ) : (
        ""
      )}
    </Card>
  );
}
