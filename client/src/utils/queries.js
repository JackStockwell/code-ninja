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
    email
    firstName
    lastName
    resume
    jobSaves {
      _id
      company {
        companyName
        _id
      }
      salary
      title
      description
      category {
        name
        _id
      }
      tags {
        _id
        name
      }
    }
  }
}
`;

export const GET_ME_EMP = gql`
query GetEmp {
  getEmp {
    _id
    email
    companyName
    about
    location {
      firstLine
      secondLine
      _id
    }
    jobs {
      _id
      title
      company {
        companyName
        _id
      }
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
      applicants {
        _id
        firstName
        lastName
        email
        resume
      }
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