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

    console.log(categoryData)


    return (
        <div>
            <h2>Filter Jobs.</h2>
            
        </div>
    )
}