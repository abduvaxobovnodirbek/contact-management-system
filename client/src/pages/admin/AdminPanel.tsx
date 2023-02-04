import TabPanel from "../../components/tabPanel/TabPanel";
import AllCategories from "../../features/adminControl/categoryList/AllCategories";
import AllPosts from "../../features/adminControl/postList/AllPosts";
import AllUsers from "../../features/adminControl/usersList/AllUsers";
import TabMenu from "../../features/home/tab/TabMenu";
import ContextWrapper from "../../layout/ContextWrapper";

const AdminPanel = () => {
  return (
    <ContextWrapper flexOptions={"justify-center"}>
      <TabMenu
        tabOptions={{
          names: ["Users", "Post List","Category"],
        }}
      >
        <Panels />
      </TabMenu>
    </ContextWrapper>
  );
};

const Panels = ({ value }: any) => {
  return (
    <div>
      <TabPanel value={value} index={0}>
        <AllUsers />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AllPosts />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AllCategories />
      </TabPanel>
    </div>
  );
};

export default AdminPanel;
