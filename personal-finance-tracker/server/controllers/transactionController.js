const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
    const type = req.query.type || 'all';
    const sort = req.query.sort || 'latest';
    const skip = (page - 1) * limit;

    // Get both incomes and expenses
    const [incomes, expenses] = await Promise.all([
      prisma.income.findMany({
        select: {
          income_id: true,
          amount: true,
          description: true,
          date: true,
          created_at: true,
          category: {
            select: {
              name: true
            }
          }
        },
        ...(type === 'income' ? {} : type === 'expense' ? { where: { income_id: -1 } } : {}),
        orderBy: {
          created_at: sort === 'latest' ? 'desc' : 'asc'
        }
      }),
      prisma.expense.findMany({
        select: {
          expense_id: true,
          amount: true,
          description: true,
          date: true,
          created_at: true,
          category: {
            select: {
              name: true
            }
          }
        },
        ...(type === 'expense' ? {} : type === 'income' ? { where: { expense_id: -1 } } : {}),
        orderBy: {
          created_at: sort === 'latest' ? 'desc' : 'asc'
        }
      })
    ]);

    // Combine and format the transactions
    let allTransactions = [
      ...incomes.map(income => ({
        id: income.income_id,
        amount: Number(income.amount),
        description: income.description,
        category: income.category.name,
        date: income.date,
        created_at: income.created_at,
        type: 'income'
      })),
      ...expenses.map(expense => ({
        id: expense.expense_id,
        amount: Number(expense.amount),
        description: expense.description,
        category: expense.category.name,
        date: expense.date,
        created_at: expense.created_at,
        type: 'expense'
      }))
    ];

    // Sort combined results
    allTransactions.sort((a, b) => {
      if (sort === 'latest') {
        return b.created_at - a.created_at;
      }
      return a.created_at - b.created_at;
    });

    // Paginate results
    const total = allTransactions.length;
    const paginatedTransactions = allTransactions.slice(skip, skip + limit);

    res.json({
      data: paginatedTransactions,
      hasMore: skip + limit < total
    });
  } catch (error) {
    console.error('Error in getTransactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

module.exports = {
  getTransactions,
};
