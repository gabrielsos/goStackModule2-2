import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const transactions = await this.find();

    transactions.map(transaction => {
      if (transaction.type === 'income') {
        balance.income += transaction.value;
      }
      if (transaction.type === 'outcome') {
        balance.outcome += transaction.value;
      }

      return balance;
    });
    balance.total = balance.income - balance.outcome;

    return balance;
  }
}

export default TransactionsRepository;
