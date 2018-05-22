export interface Post{
    id: number;
    postContent: string;
    numVotes: number;
    postContributerFullName: string;
    postContributerId: string;
    timePosted: Date;
}