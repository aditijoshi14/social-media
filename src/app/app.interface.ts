export interface Post {
    id: number;
    postContent: string;
    numVotes: number;
    postContributerFullName: string;
    postContributerId: string;
    timePosted: Date;
    up?: boolean;
    down?: boolean;
}

export interface Follow {
    fullName: string;
    userId: string;
    username: string;
}