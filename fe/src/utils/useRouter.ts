
import { useLocation } from "react-router-dom";

export const useGetPathname = () => {
  const { pathname } = useLocation();
  return pathname
}