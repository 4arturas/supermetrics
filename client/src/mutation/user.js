import { gql } from '@apollo/client';

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