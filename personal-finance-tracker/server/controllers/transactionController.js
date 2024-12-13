const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
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
        orderBy: {
          created_at: 'desc'
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
        orderBy: {
          created_at: 'desc'
        }
      })
    ]);

    // Combine and format the transactions
    const allTransactions = [
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
    ].sort((a, b) => b.created_at - a.created_at);

    // Apply pagination
    const paginatedTransactions = allTransactions.slice(skip, skip + limit);
    const totalItems = allTransactions.length;
    const hasMore = skip + limit < totalItems;

    res.json({
      data: paginatedTransactions,
      page,
      limit,
      hasMore,
      totalItems,
    });

  } catch (error) {
    console.error('Transaction fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch transactions',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

module.exports = {
  getTransactions,
};
