import { gql } from '@apollo/client';

export const CHATBOX_QUERY = gql`
    query Chatbox ($name: String!){
        chatboxs(name: $name){
            messages{
                sender{
                    name
                }
                body
            }
        }
    }
`;