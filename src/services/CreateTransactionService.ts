import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw new Error('the type of should be income or outcome');
    }

    if (
      type === 'outcome' &&
      this.transactionsRepository.getBalance().total < value
    ) {
      throw new Error("you don't have enough balance for this transaction");
    }

    return this.transactionsRepository.create({ title, type, value });
  }
}

export default CreateTransactionService;
