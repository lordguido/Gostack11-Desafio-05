import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateRepositoryDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const returnData = {
      income: 0,
      outcome: 0,
    };

    this.transactions.forEach(transaction => {
      returnData[transaction.type] += transaction.value;
    });

    return {
      ...returnData,
      total: returnData.income - returnData.outcome,
    };
  }

  public create({ title, type, value }: CreateRepositoryDTO): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
