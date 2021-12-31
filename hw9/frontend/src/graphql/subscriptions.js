import { gql } from '@apollo/client';

export const CHATBOX_SUBSCRIPTION = gql`
    subscription chatboxSubscribe($cName: String!){
        chatbox(cName: $cName){
            sender{
                name
            }
            body
        }
    }
`;