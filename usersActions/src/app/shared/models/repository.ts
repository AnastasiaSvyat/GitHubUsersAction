import { User } from "./user";

export interface Reposytory {
    id: number,
    node_id: string,
    name: string,
    full_name: string,
    private: boolean,
    owner: User
}