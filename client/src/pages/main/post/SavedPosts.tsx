import { MdBookmarkRemove } from "react-icons/md";
import { message, Skeleton } from "antd";
import Cookies from "universal-cookie";
import {
  useGetBasketQuery,
  useRemoveFromBasketMutation,
} from "../../../services/api/basket";
import { PostDetail } from "../../../types/api";
import PostCard from "../../../components/post/PostCard";
import ContextWrapper from "../../../layout/ContextWrapper";
import Spinner from "../../../components/spinner/Spinner";

const SavedPosts = () => {
  const cookie = new Cookies();
  const [removeFromBasket, { isLoading: remove_basket_loading }] =
    useRemoveFromBasketMutation();

  const { data, isLoading: get_posts_loading } = useGetBasketQuery();

  const handleClear = async (id: string) => {
    const newCookie = [...cookie.get("user_basket")].filter(
      (_id) => _id !== id
    );
    await removeFromBasket(id)
      .unwrap()
      .then(() => {
        cookie.set("user_basket", newCookie);
        message.success("successfully removed!");
      })
      .catch((err) => {
        message.error("something went wrong!");
      });
  };

  return (
    <div className="">
      <ContextWrapper flexOptions={"justify-center w-[90%] max-w-[800px]"}>
        <div className="mx-4  w-[100%]">
          {remove_basket_loading ? (
            <Spinner isLoading={remove_basket_loading} />
          ) : (
            ""
          )}

          {get_posts_loading ? (
            <>
              {" "}
              <Skeleton active className="mb-8" />
              <Skeleton active className="mb-8" />
              <Skeleton active className="mb-8" />
            </>
          ) : (
            ""
          )}
          {data?.map((post: PostDetail, i: number) => {
            return (
              <div className="border-b flex flex-col items-end mb-3" key={i}>
                <MdBookmarkRemove
                  className="cursor-pointer text-2xl text-gray-600"
                  onClick={() => handleClear(post._id || "")}
                />
                <PostCard
                  includeHead={false}
                  includeSaveBtn={false}
                  post={post}
                />
              </div>
            );
          })}

          {!data?.length && !get_posts_loading ? (
            <h3 className="text-center text-xl font-serif text-gray-600  shadow-md p-3">
              You do not have saved posts yet
            </h3>
          ) : (
            ""
          )}
        </div>
      </ContextWrapper>
    </div>
  );
};

export default SavedPosts;
