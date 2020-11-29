import {gql} from "apollo-boost";
import {ClientInput} from "@/types/types";


export const CLIENTS_QUERY = gql`
    query {
        clients {
            data {
                _id
                name
            }
        }
    }
`;

export const addClientTag = (data: ClientInput) => {
    return gql`
        mutation {
            createClient(data: {
                name: "${data.name}"
            }) {
                _id
                name
            }
        }
    `;
}

export const deleteClientTag = (id: string) => {
    return gql`
        mutation{
            deleteClient(id:"${id}"){
                name
            }
        }
    `;
}

export const updateClientTag = (data: ClientInput) => {
    return gql`
        mutation{
            updateClient(
                id:"${data.id}",
                data: {
                    name: "${data.name}"
                }
            ){
                _id
                name
            }
        }
    `;
}