import { gql } from '@apollo/client';

export const FETCH_SUPERMETRICS_POSTS = gql`
    query FetchPosts($sl_token: String) 
    { 
        fetchSupermetricsPosts(sl_token: $sl_token) 
        {
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

export const AVERAGE_CHARACTERS_LENGTH_OR_POSTS_PER_MONTH = gql`
    query { averageCharactersLengthOfPostsPerMonth { month,  averageCharacterLength} }
`;

export const GET_ONE_USER = gql`
    query getUser($id: ID){
        getUser(id: $id) {
            id, username
        }
    }    
`;