import { gql } from '@apollo/client';

export const CREATE_CHATBOX_MUTATION = gql`
    mutation createChatbox($name1: String!, $name2: String!){
        createChatbox(name1: $name1, name2: $name2){
            messages{
                sender{
                    name
                }
                body
            }
        }
    }
`;

export const CREATE_MESSAGE_MUTATION = gql`
    mutation createMessage($sender: String!, $to: String!, $body: String!){
        createMessage(sender: $sender, to: $to, body: $body){
            body
            sender{
                name
            }
        }
  }
`;