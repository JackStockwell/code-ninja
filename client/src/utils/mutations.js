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