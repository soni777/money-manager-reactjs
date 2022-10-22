const TransactionItem = props => {
  const {transactionDetails} = props
  const {optionId, displayText} = transactionDetails
  return <option value={optionId}>{displayText}</option>
}

export default TransactionItem
