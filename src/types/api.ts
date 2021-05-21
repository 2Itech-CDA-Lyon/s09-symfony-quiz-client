export interface ApiResource {
  id?: number;
}

export interface User extends ApiResource {
  email: string;
  roles: string[];
  apiToken: string;
  username: string;
}

export interface Quiz extends ApiResource {
  title: string;
  description: string;
  difficulty: number;
}

export interface Question extends ApiResource {
  text: string;
  order: number;
}

export interface Answer extends ApiResource {
  text: string;
}
