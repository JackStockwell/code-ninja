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
    query Jobs($limit: Int, $offset: Int) {
        jobs(limit: $limit, offset: $offset) {
            _id
            title
            company {
                _id
                companyName
                about
            }
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

export const GET_ME = gql`
    query Me {
        me {
            _id
            firstName
            lastName
            jobSaves {
                _id
            }
            jobApp {
                _id
            }
        }
    }
`;

export const GET_ME_EMP = gql`
    query Query {
        getEmp {
            _id
            email
            companyName
            location {
                _id
                firstLine
                secondLine
                city
                county
                postCode
            }
            about
            jobs {
                _id
                title
                description
            }
        }
    }
`;
