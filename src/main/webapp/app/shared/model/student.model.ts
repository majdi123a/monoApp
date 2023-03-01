import { Moment } from 'moment';

export interface IStudent {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  dateobirth?: Moment;
}

export class Student implements IStudent {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public phone?: string,
    public address?: string,
    public dateobirth?: Moment
  ) {}
}
