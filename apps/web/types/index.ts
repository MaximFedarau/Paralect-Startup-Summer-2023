export interface Vacancy {
  id: string;
  profession: string;
  firm_name: string;
  town: {
    id: string;
    title: string;
  };
  type_of_work: {
    id: string;
    title: string;
  };
  payment_from: number;
  payment_to: number;
  currency: string;
}
