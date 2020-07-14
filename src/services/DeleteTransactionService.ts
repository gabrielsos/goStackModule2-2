import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepositoty = getCustomRepository(TransactionsRepository);

    const transactionExists = await transactionRepositoty.findOne(id);

    if (!transactionExists) {
      throw new AppError('Transaction not found!');
    }

    await transactionRepositoty.remove(transactionExists);
  }
}

export default DeleteTransactionService;
