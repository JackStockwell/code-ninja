import { gql } from '@apollo/client';

export const QUERY_CATEGORIES = gql`
    query Categories {
        categories {
            _id
            name
        }
    }
`;

export const QUERY_TAGS = gql`
    query Tags {
        tags {
            _id
            name
        }
    }
`;

export const QUERY_JOBS = gql`
    query Query($limit: Int, $offset: Int, $category: String) {
        jobs(limit: $limit, offset: $offset, category: $category) {
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

export const COMPANY_QUERY = gql`
query GetCompany($getCompanyId: ID) {
    getCompany(id: $getCompanyId) {
      _id
      companyName
      jobs {
        _id
        title
        description
        salary
        category {
          _id
          name
        }
        tags {
          _id
          name
        }
        company {
          _id
          companyName
        }
      }
      about
      location {
        _id
        firstLine
        city
        postCode
      }
      email
    }
  }
`;