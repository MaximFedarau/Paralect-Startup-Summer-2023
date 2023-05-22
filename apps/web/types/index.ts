export interface TypeOfWork {
  id: string;
  title: string;
}

export interface Vacancy {
  id: string;
  profession: string;
  firm_name: string;
  town: {
    id: string;
    title: string;
  };
  type_of_work: TypeOfWork;
  agreement: boolean;
  payment_from: number;
  payment_to: number;
  currency: string;
}

export interface SearchQuery {
  searchBarValue?: string;
  catalogue?: string;
  paymentFrom?: string;
  paymentTo?: string;
}
