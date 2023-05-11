import { User } from "./user";

export interface GithubData {
    total_count: number;
    incomplete_results: boolean;
    items: User[]
}