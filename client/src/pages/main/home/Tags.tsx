import { useParams } from "react-router-dom";
import Sharing from "../../../features/home/sharing/Sharing";
import TagPost from "../../../features/tag/TagPost";
import useWindowSize from "../../../hooks/useWindowSize";
import ContextWrapper from "../../../layout/ContextWrapper";
import { useGetSelectedPostsQuery } from "../../../services/api/search";

const Tags = () => {
  const params = useParams();
  const { width } = useWindowSize();

  const { data, isLoading } = useGetSelectedPostsQuery({
    type: "tags",
    value: params.id || "",
  });

  return (
    <div className="">
      <ContextWrapper flexOptions={"justify-between items-start"}>
        <TagPost data={data} postLoading={isLoading} />
        {width > 900 ? (
          <div className="w-[30%] border-l sticky top-0 min-h-screen">
            <Sharing />
          </div>
        ) : null}
      </ContextWrapper>
    </div>
  );
};

export default Tags;
