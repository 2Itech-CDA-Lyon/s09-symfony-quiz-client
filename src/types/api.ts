export interface ApiResource {
  id?: number;
}

export interface Quiz extends ApiResource {
  title: string;
  description: string;
  difficulty: number;
}
