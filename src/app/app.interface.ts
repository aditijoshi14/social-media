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

export interface SearchUser {
    fullName: string;
    userId: string;
    username: string;
}

export interface Notification{
    userId: string;
    notificationContributerFullName: string;
    notificationContributerUserId: string;
    notificationId: number;
    relatedPostId?: number;
    timePosted: Date;
}