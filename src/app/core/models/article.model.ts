import { Profile } from '.';

export interface Article {
  slug?: string; // The article ID - Unique
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

export interface ArticleFilter {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}

export interface ArticleListFilter {
  type: string;
  filters: ArticleFilter;
}

export interface ArticleSearchRespose {
  articles: Article[];
  articlesCount: number;
}
