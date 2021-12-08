import { Profile } from '.';

export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  author: Profile;
}
