import { Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { useGetPostDetailQuery } from "../../../services/api/post";
import PostInfo from "../../../components/post/PostInfo";
import useWindowSize from "../../../hooks/useWindowSize";
import ContextWrapper from "../../../layout/ContextWrapper";
import Sharing from "../../../features/home/sharing/Sharing";

const PostDetails = () => {
  const { width } = useWindowSize();
  const { id } = useParams();
  const { data: post, isLoading: postLoading } = useGetPostDetailQuery(
    id || ""
  );

  return (
    <ContextWrapper
      flexOptions={`justify-between items-start ${
        width < 900 ? "w-[95%]" : ""
      }`}
    >
      {postLoading ? (
        <div className="w-full flex flex-col items-center">
          <Skeleton.Image active className="!w-[90%] !h-[250px]" />
          <Skeleton active className="!w-[90%] mt-8" />
          <Skeleton active className="!w-[90%] mt-8" />
          <Skeleton active className="!w-[90%] mt-8" />
        </div>
      ) : (
        <PostInfo
          postActionsExist={true}
          cardExist={true}
          width={width}
          post={post}
        />
      )}

      {width > 900 ? (
        <div className="w-[30%] border-l sticky top-0 min-h-screen">
          <Sharing />
        </div>
      ) : null}
    </ContextWrapper>
  );
};

export default PostDetails;
