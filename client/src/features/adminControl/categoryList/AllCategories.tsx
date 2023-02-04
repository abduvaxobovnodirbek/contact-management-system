import { useState } from "react";
import { message, Popconfirm, Skeleton } from "antd";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Spinner from "../../../components/spinner/Spinner";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../../services/api/category";
import { Category } from "../../../types/api";
import CategoryForm from "./CategoryForm";

const AllCategories = () => {
  const [currentCategory, setCategory] = useState<Category | undefined>(
    undefined
  );
  const { data, isLoading: getCategoryLoading } = useGetCategoriesQuery();
  const [deleteCategory, { isLoading: deleteCategoryLoading }] =
    useDeleteCategoryMutation();

  const handleDeleteCategory = (id: string) => {
    deleteCategory(id)
      .unwrap()
      .then(() => {
        message.success("Successfully deleted!");
      })
      .catch((err) => {
        message.error("Something went wrong");
      });
  };

  const SkeletonElement = () => (
    <Skeleton loading={getCategoryLoading} active className="mb-14" />
  );

  return (
    <div className={`max-w-[800px] mx-auto`}>
      <CategoryForm
        currentCategory={currentCategory}
        setCategory={setCategory}
      />
      <div>
        <SkeletonElement />
        <SkeletonElement />
        <SkeletonElement />
        <SkeletonElement />

        {deleteCategoryLoading ? (
          <Spinner isLoading={deleteCategoryLoading} />
        ) : (
          ""
        )}

        {data?.map((category: Category, i: number) => {
          return (
            <h3
              className="flex items-center justify-between font-serif text-gray-500 shadow-sm p-3 mb-3  mt-2"
              key={i}
            >
              <p>{category.name}</p>
              <>
                <div className="flex items-center">
                  <AiFillEdit
                    className="text-lg cursor-pointer"
                    style={{ color: "#03776f" }}
                    onClick={() => setCategory(category)}
                  />
                  <Popconfirm
                    title={"Sure to delete?"}
                    onConfirm={() => handleDeleteCategory(category._id)}
                  >
                    <MdDelete className="text-lg cursor-pointer text-red-600 ml-2" />
                  </Popconfirm>
                </div>
              </>
            </h3>
          );
        })}
      </div>
    </div>
  );
};

export default AllCategories;
