export interface Post {
    id: number;
    author: {
      ID : number ;
      pfp: string;
      username: string;
      rating: number;
    };
    title: string;
    content: string;
    time: Date;
    status : string;
    reactions: number;
    comments: number;
    requests: number;
    tags: { name: string; color: string }[];
    commentsList?: {
      id: string;
      author: {
        name: string;
        avatar: string;
        username: string;
      };
      content: string;
      timestamp: string;
    }[];
}

  author    JobProfile @relation(fields: [authorId], references: [id])

  comments    Comment[]
  reacts      React[]
  savedBy     SavedPost[]
  tags        TagsOnPosts[]
  attachments Attachment[]
  jobReqs     JobReq[]