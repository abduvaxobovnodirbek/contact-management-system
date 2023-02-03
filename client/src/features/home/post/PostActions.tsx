import { SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import Tooltip from "@mui/material/Tooltip";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Chip from "@mui/material/Chip";
import { message } from "antd";
import Cookies from "universal-cookie";
import { PostDetail } from "../../../types/api";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Spinner from "../../../components/spinner/Spinner";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { toggleModal } from "../../../services/ui/modalSlice";
import { useInsertToBasketMutation } from "../../../services/api/basket";

const PostActions = ({ post }: { post: PostDetail }) => {
  const [insertToBasket, { isLoading: insert_to_basket_loading }] =
    useInsertToBasketMutation();

  const { currentUser } = useAppSelector((state) => state.users);
  const cookie = new Cookies();
  const getCookie = cookie.get("user_basket");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleAddToBasket = (id: string) => {
    insertToBasket({ postId: id })
      .unwrap()
      .then(() => {
        cookie.set("user_basket", [...cookie.get("user_basket"), id]);
        message.success("successfully saved post!");
        navigate(location.pathname);
      })
      .catch((err) => {
        message.error("something went wrong try again!");
      });
  };

  return (
    <>
      {insert_to_basket_loading ? (
        <Spinner isLoading={insert_to_basket_loading} />
      ) : (
        ""
      )}
      <CardActions disableSpacing>
        {!getCookie?.includes(post?._id) ? (
          <Tooltip
            title="Save"
            placement="top"
            sx={currentUser ? { color: "#03776f" } : {}}
          >
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
        )}

        <Tooltip title="Share" placement="top" sx={{ color: "black" }}>
          <IconButton aria-label="share">
            <ShareIcon className="" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Tag" placement="top">
          <Chip
            label={post.tags[0]}
            component={"div"}
            className="!cursor-pointer "
            onClick={(e: SyntheticEvent) => {
              e.stopPropagation();
              navigate(`/tags/${post.tags[0]}`);
            }}
          />
        </Tooltip>
      </CardActions>
    </>
  );
};

export default PostActions;
