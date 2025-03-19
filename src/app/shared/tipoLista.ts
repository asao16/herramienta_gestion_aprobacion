export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface MappedPost extends Post {
  estado: string;
  imageUrl: string;
}
