import { useState } from "react";
import { Box } from "@mui/material";
import { PostDetail } from "../../../types/api";
import PostsTable from "./PostsTable";
import { useGetAllPostsQuery } from "../../../services/api/admin";
import Stepper from "../../post_create/stepper/Stepper";
import EditForm from "../../post_edit/EditForm";
import ContextWrapper from "../../../layout/ContextWrapper";
import useWindowSize from "../../../hooks/useWindowSize";


const AllPosts = () => {
  const { isLoading, data: posts } = useGetAllPostsQuery();
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [post, setPost] = useState<PostDetail | undefined>(undefined);
  const { width } = useWindowSize();

  return (
    <Box sx={{ width: "100%" }}>
      {!showEditForm ? (
        <>
          <h3
            className="text-center text-xl font-serif text-white  shadow-md p-3 mb-8"
            style={{ background: "#03776f" }}
          >
           All posts created by you
          </h3>
          <PostsTable
            posts={posts}
            isLoading={isLoading}
            setShowEditForm={setShowEditForm}
            setPost={setPost}
          />
        </>
      ) : (
        <ContextWrapper
          flexOptions={`w-[100%] ${
            width > 1000 ? "justify-between" : "flex-col items-center"
          }`}
        >
          <Stepper />
          <EditForm post={post} setShowEditForm={setShowEditForm} />
        </ContextWrapper>
      )}
    </Box>
  );
};

export default AllPosts;
