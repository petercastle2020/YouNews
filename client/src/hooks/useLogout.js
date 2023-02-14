import { useAuthContext } from "./useAuthContext";
import { useArticlesContext } from "./useArticlesContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: articlesDispatch } = useArticlesContext();

  const logout = () => {
    // remove user from local storage.
    localStorage.removeItem("user");

    // dispatch logout action.
    dispatch({ type: "LOGOUT" });
    articlesDispatch({ type: "SET_ARTICLES", payload: null });
  };

  return { logout };
};
