import './index.css'

const MoneyDetails = props => {
  const {historyDetails, onClickDelete} = props
  const {id, title, type, amount} = historyDetails
  const onClickDeleteIcon = () => {
    onClickDelete(id)
  }
  return (
    <li className="list-container">
      <p className="title-value">{title}</p>
      <p className="amount-value">{amount}</p>
      <p className="type-value">{type}</p>
      <button
        testid="delete"
        className="delete-btn"
        type="button"
        onClick={onClickDeleteIcon}
      >
        <img
          className="delete-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default MoneyDetails
