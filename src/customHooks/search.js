import { useNavigate } from "react-router-dom";
import useDebounce from "./debounce";
export function useSearch() {
  const navigate = useNavigate();
  return useDebounce((searchText) => {
    navigate(`/search?searchText=${searchText}`);
  }, 300);
}
