import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';

const CategoryMenu = () => {

    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES)


    return (
        <div>
            <h2>Filter Jobs.</h2>
            
        </div>
    )
}