import { ChangeEvent, FormEvent, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import useNavigateParams from "../../hooks/useNavigateParams";

const SearchInput = () => {
  const [value, setValue] = useState<string>("");
  const navigateParams = useNavigateParams();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      navigateParams("", { q: value } as any);
      setValue("");
    }
  };

  return (
    <div className="flex items-center">
      <form
        onSubmit={handleSearch}
        className="relative text-gray-400  rounded-xl  px-2"
        style={{ width: "100%" }}
      >
        <span className="absolute inset-y-0 left-1 flex items-center pl-2">
          <button type="submit" className="p-1 outline-none shadow-outline">
            <AiOutlineSearch className=" text-xl" />
          </button>
        </span>
        <input
          type="search"
          name=""
          className="py-3 text-sm border rounded-xl pl-8 outline-none bg-gray-400 text-gray-900"
          style={{ background: "#FAFAFA", width: "100%" }}
          placeholder="Search quickly"
          autoComplete="off"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        />
      </form>
    </div>
  );
};

export default SearchInput;
