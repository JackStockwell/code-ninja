import React, { useEffect } from "react";
import { useJobContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  UPDATE_JOBS,
} from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES, QUERY_JOBS_BY_CATEGORY } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

import "../css/category.css";

const CategoryMenu = () => {
  const [state, dispatch] = useJobContext();

  const { categories, currentCategory } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  // If the category, loading or dispatch changes. This is called.
  // Updates the categories. Also saves to local storage.
  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  // Updates the current category save in state using reducer.
  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  const handClearFilter = () => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    })
  }

  
  return (
<div className="category-container">
  <div className="category-menu">
    <h2>Filter Jobs by Category</h2>
    <div className="category-buttons">
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
          className={`category-button ${
            currentCategory === item._id ? "active" : ""
          }`}
        >
          {item.name}
        </button>
      ))}
      <button
        className={'category-button'}
        style={{ backgroundColor: "black" }}
        onClick={handleClick}
      >
        Clear
      </button>
    </div>
    </div>
  </div>
  );
};

export default CategoryMenu;
