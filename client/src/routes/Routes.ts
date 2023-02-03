import PostCreate from "../pages/admin/post/PostCreate";
import Error from "../pages/main/Error";
import Home from "../pages/main/home/Home";
import Tags from "../pages/main/home/Tags";
import PostDetails from "../pages/main/post/PostDetails";
import SavedPosts from "../pages/main/post/SavedPosts";
import Search from "../pages/main/search/Search";
import { routesType } from "../types";

const routes: routesType = [
  {
    path: "/",
    element: Home,
    protected: false,
  },
  {
    path: "/search",
    element: Search,
    protected: false,
  },
  {
    path: "/posts/:id",
    element: PostDetails,
    protected: false,
  },
  {
    path: "/post-create",
    element: PostCreate,
    protected: true,
  },
  {
    path: "/saved-posts",
    element: SavedPosts,
    protected: true,
  },
  {
    path: "/tags/:id",
    element: Tags,
    protected: false,
  },
  {
    path: "*",
    element: Error,
    protected: false,
  },
];

export default routes;
