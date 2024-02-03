import { PostImage } from './PostImage';
import { User } from './User';

interface UserId {
  userId: string;
}

export interface Post {
  postId: number;
  content: string;
  createdAt: Date;
  Images: PostImage[];
  User: User;
  Hearts: UserId[];
  Reposts: UserId[];
  Comments: UserId[];
  _count: {
    Hearts: number;
    Reposts: number;
    Comments: number;
  };
}
