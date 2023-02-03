import { Skeleton } from "antd";
import PostCard from "../../../components/post/PostCard";
import { useGetPostsQuery } from "../../../services/api/post";
import { PostDetail } from "../../../types/api";

const RecentlyAddedReviews = ({
  handleAddToBasket,
}: {
  handleAddToBasket: (str: string) => void;
}) => {
  const { data, isLoading } = useGetPostsQuery();

  const posts = data ?? [];

  const SkeletonElement = () => (
    <Skeleton loading={isLoading} avatar active className="mb-14  " />
  );

  return (
    <>
      <SkeletonElement />
      <SkeletonElement />
      <SkeletonElement />
      <SkeletonElement />

      {posts.map((post: PostDetail, i: number) => (
        <PostCard
          includeSaveBtn={true}
          includeHead={true}
          post={post}
          key={i}
          handleAddToBasket={handleAddToBasket}
        />
      ))}
    </>
  );
};

export default RecentlyAddedReviews;
