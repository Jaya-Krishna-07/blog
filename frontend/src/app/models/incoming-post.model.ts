export interface IncomingPost {
    id: number;
    name: string;
    content: string;
    postedBy: string;
    img: string;
    date: Date;
    likeCount: number;
    viewCount: number;
    tags: string[];
}
