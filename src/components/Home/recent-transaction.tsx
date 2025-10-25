type Props = { transactions: any[] };

export function RecentTransactions({ transactions }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Date</th>
            <th>Name</th>
            <th>Reason</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map(tx => (
            <tr key={tx._id} className="border-b border-gray-200 dark:border-gray-700">
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td>{tx.name}</td>
              <td>{tx.reason}</td>
              <td>{tx.transactionType}</td>
              <td>₹{tx.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
