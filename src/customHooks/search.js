import { useNavigate } from "react-router-dom";
import useDebounce from "./debounce";
export function useSearch() {
  const navigate = useNavigate();

  return useDebounce((e) => {
    if (e.target.value.length > 0) {
      navigate(`/search?searchText=${e.target.value}`);
    } else {
      navigate(
        localStorage.getItem("lastRoute")
          ? localStorage.getItem("lastRoute")
          : "/"
      );
    }
  }, 300);
}
