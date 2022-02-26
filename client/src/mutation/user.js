import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($input: LoginInput) {
        loginUser(input: $input) {
            status, statusText, sl_token
        }
    }
`

export const CREATE_USER = gql`
    mutation createUser($input: UserInput) {
        createUser(input: $input) {
            id, username, age
        }
    }
`

export const GIVE_CONSENT = gql`
    mutation giveConsent($input: ConsentInput) {
        giveConsent(input: $input) {
            name, email
        }
    }
`