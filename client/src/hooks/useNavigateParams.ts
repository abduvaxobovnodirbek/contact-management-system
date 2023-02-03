import { createSearchParams, useNavigate } from "react-router-dom";

const useNavigateParams = () => {
  const navigate = useNavigate();

  return (pathname: any, params: string) => {
    const path = {
      pathname,
      search: createSearchParams(params).toString(),
    };
    navigate(path);
  };
};
export default useNavigateParams;
