import { gql } from '@apollo/client';

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
    mutation CreateUser($userData: userInput!) {
        createUser(userData: $userData) {
            token
            user {
                _id
                firstName
                lastName
            }
        }
    }
`
export const ADD_JOB = gql`
    mutation Mutation($id: ID!) {
        saveJob(id: $id) {
            _id
            email
            password
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