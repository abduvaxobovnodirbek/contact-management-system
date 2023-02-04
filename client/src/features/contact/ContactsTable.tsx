import { message, Table } from "antd";
import useWindowSize from "../../hooks/useWindowSize";
import { useRemoveContactMutation } from "../../services/api/contact";
import { panelContactProps } from "../../types";
import { ContactDetail } from "../../types/api";
import ColumnData from "./TableColumns";

const UsersTable = ({ users, isLoading }: panelContactProps) => {
  const { width } = useWindowSize();
  const [deleteUser, { isLoading: deleteUserLoading }] =
    useRemoveContactMutation();

  const filterData = (data: ContactDetail[]) => (formatter: any) =>
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

  return (
    <>
      <Table
        columns={ColumnData({
          handleDelete,
          filterData,
          users,
        })}
        dataSource={users}
        rowKey="_id"
        scroll={{ x: 1500, y: 600 }}
        loading={isLoading || deleteUserLoading}
        pagination={false}
        expandable={{
          expandedRowRender: (record) => (
            <div className={`${width > 500 ? "px-8" : "px-2"}`}>
              <div className="flex items-center text-gray-600 ">
                <h3>Email address:</h3>
                <h3 className="ml-2 font-bold italic">{record.email}</h3>
              </div>
            </div>
          ),
        }}
      />
    </>
  );
};

export default UsersTable;
