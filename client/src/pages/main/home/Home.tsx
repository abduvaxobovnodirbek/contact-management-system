import PostList from "../../../features/home/post/PostList";
import Sharing from "../../../features/home/sharing/Sharing";
import TabMenu from "../../../features/home/tab/TabMenu";
import useWindowSize from "../../../hooks/useWindowSize";
import ContextWrapper from "../../../layout/ContextWrapper";

const Home = () => {
  const { width } = useWindowSize();
  return (
    <ContextWrapper flexOptions={"justify-between items-start"}>
      <TabMenu
        tabOptions={{
          names: ["Recently Added"],
        }}
      >
        <PostList detailed={true} />
      </TabMenu>
      {width > 900 ? (
        <div className="w-[30%] border-l sticky top-0 min-h-screen ">
          <Sharing />
        </div>
      ) : null}
    </ContextWrapper>
  );
};

export default Home;
