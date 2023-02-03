import { useSearchParams } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";
import { useGetSearchedPostsQuery } from "../../../services/api/search";
import ContextWrapper from "../../../layout/ContextWrapper";
import SearchList from "../../../features/search/SearchList";
import Sharing from "../../../features/home/sharing/Sharing";

const Search = () => {
  const { width } = useWindowSize();
  const [searchParams] = useSearchParams();

  const { data, isLoading } = useGetSearchedPostsQuery(
    searchParams.get("q") || ""
  );

  return (
    <div className="">
      <ContextWrapper flexOptions={"justify-between items-start"}>
        <SearchList data={data} postLoading={isLoading} />
        {width > 900 ? (
          <div className="w-[30%] border-l sticky top-0 min-h-screen">
            <Sharing />
          </div>
        ) : null}
      </ContextWrapper>
    </div>
  );
};

export default Search;
