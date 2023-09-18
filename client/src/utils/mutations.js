import {gql} from "@apollo/client";

export const SINGLE_UPLOAD = gql`
  mutation Mutation($file: Upload!) {
    singleUpload(file: $file) {
      encoding
      filename
      mimetype
      url
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation Mutation($userData: userInput!) {
    createUser(userData: $userData) {
      token
      user {
        _id
        firstName
      }
    }
  }
`;

export const SAVE_JOB = gql`
  mutation Mutation($id: ID!) {
    saveJob(id: $id) {
      _id
      jobSaves {
        _id
      }
      jobApp {
        _id
      }
    }
  }
`;

export const APPLY_JOB = gql`
mutation ApplyJob($id: ID!) {
  applyJob(id: $id) {
    _id
    title
  }
}
`;

export const CREATE_EMPLOYER = gql`
  mutation CreateEmployer($userData: empInput) {
    createEmployer(userData: $userData) {
      token
      employer {
        _id
        companyName
      }
    }
  }
`;

export const LOGIN_EMPLOYER = gql`
  mutation LoginEmployer($email: String!, $password: String!) {
    loginEmployer(email: $email, password: $password) {
      token
      employer {
        _id
        companyName
      }
    }
  }
`;

export const CREATE_JOB = gql`
  mutation Mutation($input: jobInput!) {
    createJob(input: $input) {
      _id
      description
      salary
      tags {
        name
        _id
      }
    }
  }
`;
