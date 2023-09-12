import TodoComponent from "@/components/TodoComponent";
import { useFetchDataHook } from "@/store/fetch-hook";

export default function TodoPage() {
  const loadingData = useFetchDataHook();

  return (
    <div>
      {!loadingData ? <TodoComponent /> : <p className="loading">Loading...</p>}
    </div>
  );
}
