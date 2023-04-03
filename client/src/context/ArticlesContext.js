import { createContext, useReducer } from "react";

export const ArticlesContext = createContext();

export const articlesReducer = (state, action) => {
  switch (action.type) {
    case "SET_ARTICLES":
      return {
        articles: action.payload,
      };
    case "CREATE_ARTICLE":
      return {
        articles: [action.payload, ...state.articles],
      };
    case "EDIT_ARTICLE":
      const updatedArticles = state.articles.map((article) => {
        if (article._id === action.payload._id) {
          // If the current article's ID matches the ID of the edited article,
          // return the edited article instead of the original article
          return action.payload;
        }
        // Otherwise, return the original article.
        return article;
      });
      return {
        articles: updatedArticles,
      };
    case "DELETE_ARTICLE_SUCCESS":
      return {
        ...state,
        showAlert: true,
        alertType: "success",
        articles: state.articles.filter(
          (article) => article._id !== action.payload._id
        ),
      };
    case "DELETE_ARTICLE_FAILURE":
      return {
        ...state,
        showAlert: true,
        alertType: "failure",
      };
    case "HIDE_ALERT":
      return {
        ...state,
        showAlert: false,
        alertType: "",
      };

    default:
      return state;
  }
};

export const ArticlesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(articlesReducer, {
    articles: [],
    showAlert: false,
    alertType: "",
  });

  return (
    <ArticlesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ArticlesContext.Provider>
  );
};
