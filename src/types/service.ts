export type Transaction = {
  id: string;
  status: 'completed' | 'failed';
  amount: number;
  balance: number;
  createdAt: string;
};
export type TransactionsResponse = Transaction[];

export type Message = {
  role: string;
  content: string;
};

export type DreamDetailResponse = {
  createdAt: string;
  messages: Message[];
};
export type TarotResponse = {
  createdAt: string;
  messages: Message[];
};

export type NumerologyDetailResponse = {
  name: string;
  birthDate: string;
  lifePath: string;
  personalYear: string;
  radicalNumber: string;
  checkSpecificNumber: boolean;
  rulingPlanet: number;
  pinnacleNumber: string;
  expressionNumber: string;
};
