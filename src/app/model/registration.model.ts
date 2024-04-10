export class userrs {
    userId: string;
    userName: string;
    userEmail: string;
}
export class Sendmessages {
    ReceiverId: string;
    Content: string;
}
export class ConversationHistoryRequest {
    UserId: string;
    Before: Date;
    Count: number// Default value: 20
    Sort: string;
}