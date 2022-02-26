import { gql } from '@apollo/client';

export const FETCH_SUPERMETRICS_POSTS = gql`
    query {
        fetchSupermetricsPosts {
            id, from_name, from_id, message, type, created_time
        }
    }
`;

export const GENERATE_RANDOM_POSTS = gql`
    query {
        generateRandomPosts {
            id, from_name, from_id, message, type, created_time
        }
    }
`;

export const GET_ONE_USER = gql`
    query getUser($id: ID){
        getUser(id: $id) {
            id, username
        }
    }    
`;