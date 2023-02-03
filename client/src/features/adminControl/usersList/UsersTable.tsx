import { message, Table } from "antd";
import useWindowSize from "../../../hooks/useWindowSize";
import {
  useChangeUserStatusMutation,
  useDeleteUserMutation,
} from "../../../services/api/admin";
import { panelProps } from "../../../types";
import { User } from "../../../types/api";
import ColumnData from "./TableColumns";

const UsersTable = ({
  users,
  isLoading,
  handleShowProfile,
  setUser,
}: panelProps) => {
  const { width } = useWindowSize();
  const [deleteUser, { isLoading: deleteUserLoading }] =
    useDeleteUserMutation();
  const [changeStatus, { isLoading: changeStatusLoader }] =
    useChangeUserStatusMutation();

  const filterData = (data: User[]) => (formatter: any) =>
    users?.map((item) => ({
      text: formatter(item),
      value: formatter(item),
    }));

  const handleDelete = async (id: string) => {
    await deleteUser(id)
      .unwrap()
      .then(() => {
        message.success("successfully deleted!");
      })
      .catch(() => message.error("Something went wrong!"));
  };

  const handleStatus = async (user: User) => {
    await changeStatus({ status: !user.status, id: user._id })
      .unwrap()
      .then(() => {
        message.success("Successfully status changed!");
      })
      .catch(() => message.error("Something went wrong!"));
  };

  return (
    <>
      <Table
        columns={ColumnData({
          handleDelete,
          handleShowProfile,
          setUser,
          filterData,
          users,
          handleStatus,
        })}
        dataSource={users}
        rowKey="_id"
        scroll={{ x: 1500, y: 600 }}
        loading={isLoading || deleteUserLoading || changeStatusLoader}
        pagination={false}
      
        expandable={{
          expandedRowRender: (record) => (
            <div
              className={`${width > 500 ? "px-8" : "px-2"}`}
            >
              <div className="flex items-center text-gray-600 ">
                <h3>Bio of {record.name}:</h3>
                <h3 className="ml-2 font-bold italic">{record.userInfo}</h3>
              </div>
            </div>
          ),
        }}
      />
    </>
  );
};

export default UsersTable;
