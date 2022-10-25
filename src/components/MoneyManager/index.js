import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import TransactionItem from '../TransactionItem'

import MoneyDetails from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    totalIncome: 0,
    totalExpenses: 0,
    titleInput: '',
    amountInput: '',
    type: 'Income',
    history: [],
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {titleInput, amountInput} = this.state
    let {totalBalance, type, totalIncome, totalExpenses} = this.state
    if (type === 'EXPENSES') {
      totalExpenses += parseInt(amountInput)
      type = 'Expenses'
    } else {
      totalIncome += parseInt(amountInput)
      type = 'Income'
    }
    totalBalance = totalIncome - totalExpenses
    const newHistory = {
      id: uuidv4(),
      title: titleInput,
      amount: amountInput,
      type,
    }
    this.setState(prevState => ({
      history: [...prevState.history, newHistory],
      titleInput: '',
      type: 'Income',
      amountInput: '',
      totalBalance,
      totalIncome,
      totalExpenses,
    }))
    // this.setState({title: '', type: '', amount: '', balance, income, expenses})
  }

  onClickDelete = id => {
    const {history, totalIncome, totalExpenses} = this.state
    let newIncome = totalIncome
    let newExpenses = totalExpenses

    const newHistory = history.filter(eachItem => {
      if (eachItem.id === id) {
        if (eachItem.type === 'Income') {
          newIncome = totalIncome - parseInt(eachItem.amount)
        } else {
          newExpenses = totalExpenses - parseInt(eachItem.amount)
        }
        return false
      }
      return true
    })
    this.setState({
      history: newHistory,
      totalIncome: newIncome,
      totalExpenses: newExpenses,
    })
  }

  render() {
    const {
      totalIncome,
      totalExpenses,
      titleInput,
      amountInput,
      type,
      history,
    } = this.state
    const totalBalance = totalIncome - totalExpenses
    return (
      <div className="app-container">
        <div className="card-container">
          <div className="heading-container">
            <h1 className="name-heading">Hi,Richard</h1>
            <p className="welcome-text">
              Welcome back to your
              <span className="special-text"> Money Manager</span>
            </p>
          </div>
          <div className="money-manager-container">
            <div className="money-container balance-container">
              <img
                className="round-img"
                src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
                alt="balance"
              />
              <div className="money-text-container">
                <p className="money-title">Your balance</p>
                <p className="money">Rs {totalBalance}</p>
              </div>
            </div>

            <div className="money-container income-container">
              <img
                className="round-img"
                src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
                alt="income"
              />
              <div className="money-text-container">
                <p className="money-title">Your Income</p>
                <p className="money">Rs {totalIncome}</p>
              </div>
            </div>
            <div className="money-container expenses-container">
              <img
                className="round-img"
                src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
                alt="expenses"
              />
              <div className="money-text-container">
                <p className="money-title">Your Expenses</p>
                <p className="money">Rs {totalExpenses}</p>
              </div>
            </div>
          </div>

          <div className="transaction-history-container">
            <div className="transaction-container">
              <h1 className="bottom-title">Add Transaction</h1>
              <form className="transaction-form" onSubmit={this.onSubmitForm}>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  className="input"
                  id="title"
                  type="text"
                  placeholder="TITLE"
                  value={titleInput}
                  onChange={this.onChangeTitle}
                />
                <label htmlFor="amount" className="label">
                  AMOUNT
                </label>
                <input
                  className="input"
                  id="amount"
                  type="text"
                  placeholder="AMOUNT"
                  value={amountInput}
                  onChange={this.onChangeAmount}
                />
                <label htmlFor="type" className="label">
                  TYPE
                </label>
                <select
                  id="type"
                  className="input"
                  value={type}
                  onChange={this.onChangeType}
                >
                  {transactionTypeOptions.map(eachItem => (
                    <TransactionItem
                      key={eachItem.optionId}
                      transactionDetails={eachItem}
                    />
                  ))}
                </select>
                <button className="button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <ul className="history-container">
              <h1 className="bottom-title">History</h1>
              <li className="list-container">
                <p className="title">Title</p>
                <p className="amount">Amount</p>
                <p className="type">Type</p>
                <p> </p>
              </li>
              {history.map(eachItem => (
                <MoneyDetails
                  key={eachItem.id}
                  historyDetails={eachItem}
                  onClickDelete={this.onClickDelete}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
