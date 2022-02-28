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

export const AVERAGE_CHARACTERS_LENGTH_OF_POSTS_PER_MONTH = gql`
    query { averageCharactersLengthOfPostsPerMonth { month,  averageCharacterLength} }
`;

export const LONGEST_POST_BY_CHARACTER_LENGTH_PER_MMONTH = gql`
    query { longestPostByCharacterLengthPerMonth { month,  longestMessage} }
`;

export const TOTAL_LONGEST_POST_BY_CHARACTER_LENGTH_PER_MONTH = gql`
    query { totalPostsSplitByWeekNumber { week,  messagesCount} }
`;

export const AVERAGE_NUMBER_OF_POSTS_PER_USER_PER_MONTH = gql`
    query { averageNumberOfPostsPerUserPerMonth { from_id,  averagePerMonth } }
`;

export const GET_ONE_USER = gql`
    query getUser($id: ID){
        getUser(id: $id) {
            id, username
        }
    }    
`;