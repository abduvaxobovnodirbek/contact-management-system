import TabPanel from "../../components/tabPanel/TabPanel";
import AllPosts from "../../features/adminControl/postList/AllPosts";
import AllUsers from "../../features/adminControl/usersList/AllUsers";
import TabMenu from "../../features/home/tab/TabMenu";
import ContextWrapper from "../../layout/ContextWrapper";

const AdminPanel = () => {
  return (
    <ContextWrapper flexOptions={"justify-center"}>
      <TabMenu
        tabOptions={{
          names: ["Users", "Post List"],
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
    </div>
  );
};

export default AdminPanel;
