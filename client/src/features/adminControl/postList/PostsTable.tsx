import { message, Table } from "antd";
import { useDeletePostMutation } from "../../../services/api/post";
import { PostDetail } from "../../../types/api";
import useWindowSize from "../../../hooks/useWindowSize";
import PostInfo from "../../../components/post/PostInfo";
import ColumnData from "./TableColumns";
import { adminControlApi } from "../../../services/api/admin";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

const PostsTable = ({
  posts,
  isLoading,
  setShowEditForm,
  setPost,
}: {
  posts: PostDetail[] | undefined;
  isLoading: boolean;
  setPost: React.Dispatch<React.SetStateAction<PostDetail | undefined>>;
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [deletePost, { isLoading: deletePostLoading }] =
    useDeletePostMutation();

  const { width } = useWindowSize();
  const dispatch = useAppDispatch();

  const filterData = (data: PostDetail[]) => (formatter: any) =>
    posts?.map((item) => ({
      text: formatter(item),
      value: formatter(item),
    }));

  const handleDelete = async (id: string) => {
    await deletePost(id)
      .unwrap()
      .then(() => {
        dispatch(
          adminControlApi.util.invalidateTags([{ type: "Posts", id: "LIST" }])
        );
        message.success("Successfully deleted post!");
      })
      .catch((err) => message.error("Something went wrong"));
  };

  return (
    <Table
      columns={ColumnData({
        handleDelete,
        setShowEditForm,
        setPost,
        filterData,
        posts,
      })}
      dataSource={posts}
      rowKey="_id"
      scroll={{ x: 1500, y: 600 }}
      loading={isLoading || deletePostLoading}
      pagination={false}
      expandable={{
        expandedRowRender: (record) => (
          <div className={`${width > 500 ? "px-8" : "px-2"} `}>
            <PostInfo
              postActionsExist={false}
              cardExist={false}
              width={100}
              post={record || ""}
            />
          </div>
        ),
      }}
    />
  );
};

export default PostsTable;
