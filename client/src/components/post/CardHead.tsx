import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Avatar, CardHeader, IconButton, Tooltip } from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Cloudinary from "../cloudImage/Cloudinary";
import { PostDetail, User } from "../../types/api";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toggleModal } from "../../services/ui/modalSlice";

const CardHead = ({
  post,
  includeSaveBtn,
  currentUser,
  handleAddToBasket,
}: {
  post: PostDetail | undefined;
  includeSaveBtn: boolean;
  currentUser: User | null;
  handleAddToBasket: ((str: string) => void) | undefined;
}) => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const dispatch = useAppDispatch();
  return (
    <>
      <CardHeader
        avatar={
          post?.user?.image ? (
            <div className="w-[35px] h-[35px] rounded-full overflow-hidden">
              <Cloudinary img={post?.user?.image} />
            </div>
          ) : (
            <Avatar sx={{ background: "#00000064" }} aria-label="recipe">
              <span>{post?.user?.name?.at(0)}</span>
            </Avatar>
          )
        }
        title={post?.user?.name}
        subheader={
          <span className="">
            {format(new Date(post?.createdAt || Date.now()), "MMM do. yyyy")}
          </span>
        }
        action={
          includeSaveBtn && !cookie.get("user_basket")?.includes(post?._id) ? (
            <Tooltip title="Save" placement="top">
              <span
                onClick={(e: any) => {
                  e.stopPropagation();
                  if (handleAddToBasket && currentUser?._id) {
                    handleAddToBasket(post?._id || "");
                  } else {
                    dispatch(toggleModal(true));
                  }
                }}
              >
                <IconButton
                  aria-label="save btn"
                  disabled={!currentUser}
                  sx={currentUser ? { color: "#03776f" } : {}}
                  className="!mr-2"
                >
                  <BookmarkAddIcon />
                </IconButton>
              </span>
            </Tooltip>
          ) : (
            ""
          )
        }
        className="!px-0"
      />
    </>
  );
};

export default CardHead;
