import _ from "lodash";
import { Popconfirm } from "antd";
import { format } from "date-fns";
import type { ColumnsType } from "antd/es/table";
import { PostDetail } from "../../../types/api";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { ColumnProps } from "../../../types";

const ColumnData = ({
  handleDelete,
  setShowEditForm,
  setPost,
  filterData,
  posts,
}: ColumnProps) => {
  const columns: ColumnsType<PostDetail> = [
    {
      title: "Post Name",
      width: 100,
      dataIndex: "post_name",
      key: "2",
      filters: _.uniqWith(
        filterData(posts || [])((i: PostDetail) => i?.post_name),
        _.isEqual
      ),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string | number | boolean, record) =>
        record.post_name.startsWith(value as string),
    },

    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "6",
      width: 100,
      render(value, record, index) {
        return (
          <span>
            {format(new Date(record?.createdAt || Date.now()), "MMM do. yyyy")}
          </span>
        );
      },
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Actions",
      key: "operation",
      fixed: "right",
      width: 50,
      render: (_: any, record: PostDetail) => {
        return (
          <div className="flex items-center">
            <AiFillEdit
              className="text-lg cursor-pointer"
              style={{ color: "#03776f" }}
              onClick={() => {
                setShowEditForm(true);
                setPost(record);
              }}
            />
            <Popconfirm
              title={"Sure to delete?"}
              onConfirm={() => handleDelete(record._id || "")}
            >
              <MdDelete className="text-lg cursor-pointer text-red-600 ml-2" />
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return columns;
};
export default ColumnData;
