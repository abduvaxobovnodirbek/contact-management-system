import RecentlyAddedPosts from "./RecentlyAddedPosts";
import TabPanel from "../../../components/tabPanel/TabPanel";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useInsertToBasketMutation } from "../../../services/api/basket";
import { message } from "antd";
import Spinner from "../../../components/spinner/Spinner";

const PostList = ({ value }: any) => {
  const [insertToBasket, { isLoading }] = useInsertToBasketMutation();
  const navigate = useNavigate();
  const cookie = new Cookies();

  const handleAddToBasket = (id: string) => {
    insertToBasket({ postId: id })
      .unwrap()
      .then(() => {
        cookie.set("user_basket", [...cookie.get("user_basket"), id]);
        message.success("successfully saved post!");
        navigate("/");
      })
      .catch((err) => {
        message.error("something went wrong try again!");
      });
  };
  return (
    <>
    {isLoading ? <Spinner isLoading={isLoading} /> : ""}
      <TabPanel value={value} index={0}>
        <RecentlyAddedPosts handleAddToBasket={handleAddToBasket} />
      </TabPanel>
    </>
  );
};

export default PostList;
