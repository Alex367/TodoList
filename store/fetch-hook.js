import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDataDB } from "./modal-redux";

export function useFetchDataHook() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataDB());
    setIsLoading(false);
  }, [dispatch]);

  return isLoading;
}
