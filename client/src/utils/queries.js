import { gql } from '@apollo/client';

export const QUERY_CATEGORIES = gql`
    {
        categories {
            _id
            name
        }
    }
`;

export const QUERY_JOBS = gql`
    query Jobs($limit: Int, $offset: Int, $category: String) {
        jobs(limit: $limit, offset: $offset, category: $category) {
            _id
            title
            company
            location
            salary
            description
            category {
                _id
                name
            }
            tags {
                _id
                name
            }
        }
    }
`;
