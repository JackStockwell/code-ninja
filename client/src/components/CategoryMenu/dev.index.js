import React, { useEffect } from 'react';
import { useJobContext } from '../../utils/GlobalState';

// Queries
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';

// Utils
import { idbPromise } from '../../utils/helpers';

const CategoryMenu = () => {
    const [state, dispatch] = useJobContext();

    const { categories } = state;

    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES)

    useEffect(() => {
        if (categoryData) {
          dispatch({
            type: UPDATE_CATEGORIES,
            categories: categoryData.categories,
          });
          categoryData.categories.forEach((category) => {
            idbPromise('categories', 'put', category);
          });
        } else if (!loading) {
          idbPromise('categories', 'get').then((categories) => {
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
      };

    return (
        <div>
            <h2>Filter Jobs.</h2>
            {categories.map((item) => (
                <button
                    key={item._id}
                    onClick={() => {
                        handleClick(item._id)
                    }}
                >
                    {item.name}
                </button>
            )
            )}
            
        </div>
    )
}

export default CategoryMenu;