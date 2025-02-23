export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  accountId: string;
  gender: string;
};
export type Balance = {
  id: string;
  userId: string;
  totalBalance: number;
  totalAmountPaid: number;
  createdAt: string;
  updatedAt: string;
};
