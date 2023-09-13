
import React, {useEffect} from "react";
import {useJobContext} from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  UPDATE_JOBS,
} from "../../utils/actions";
import {useQuery} from "@apollo/client";
import {QUERY_CATEGORIES, QUERY_JOBS_BY_CATEGORY} from "../../utils/queries";
import {idbPromise} from "../../utils/helpers";


import "../css/category.css";

const CategoryMenu = () => {
  const [state, dispatch] = useJobContext();

  const { categories, currentCategory } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

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

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
    // Fetch jobs for the selected category
    // fetchJobsByCategory(id);
  };

  // Fetch jobs for the selected category
  // const fetchJobsByCategory = async (categoryId) => {
  //   try {
  //     const response = await fetch(`/api/jobs/category/${categoryId}`);
  //     if (!response.ok) {
  //       throw new Error("Job data could not be fetched.");
  //     }

  //     const data = await response.json();

  //     dispatch({
  //       type: UPDATE_JOBS,
  //       jobs: data,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
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
      </div>
    </div>
  );
};

export default CategoryMenu;
