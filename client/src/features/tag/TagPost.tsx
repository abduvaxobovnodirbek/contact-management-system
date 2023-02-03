import { message, Skeleton } from "antd";
import { AiFillTag } from "react-icons/ai";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import PostCard from "../../components/post/PostCard";
import Spinner from "../../components/spinner/Spinner";
import useWindowSize from "../../hooks/useWindowSize";
import { useInsertToBasketMutation } from "../../services/api/basket";
import { PostDetail } from "../../types/api";

const TagPost = ({
  data,
  postLoading,
}: {
  data: PostDetail[] | undefined;
  postLoading: boolean;
}) => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();
  const params = useParams();
  const [insertToBasket, { isLoading }] = useInsertToBasketMutation();

  const SkeletonElement = () => (
    <Skeleton loading={postLoading} avatar active className="mb-14" />
  );

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
    <div style={width > 900 ? { width: "65%" } : { width: "100%" }}>
      <div className=" flex items-center mb-4 border-b">
        <AiFillTag />{" "}
        <h3 className="font-serif text-xl ml-2 text-gray-600">{params.id}</h3>
      </div>
      <SkeletonElement />
      <SkeletonElement />
      <SkeletonElement />
      <SkeletonElement />
      {isLoading ? <Spinner isLoading={isLoading} /> : ""}
      {data
        ? data.map((post: PostDetail, i: number) => (
            <PostCard
              includeSaveBtn={true}
              includeHead={true}
              post={post}
              key={i}
              handleAddToBasket={handleAddToBasket}
            />
          ))
        : ""}
    </div>
  );
};

export default TagPost;
