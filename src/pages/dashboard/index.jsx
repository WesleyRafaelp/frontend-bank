import Header from "../../components/header"
import './index.css'
import Balance from "../../components/balance"
import Transfer from "../../components/transfer"
import Transactions from "../../components/transactions"
import Table from "../../components/table-transactions"
import { useEffect, useState } from "react"
import CashOut from "../../components/cash-out"
import CashIn from "../../components/cash-in"

function Dashboard() {
  const [user, setUser] = useState({ id: 0, username: '', balance: 0 })
  const [cashOuts, setCashOuts] = useState([])
  const [cashIns, setCashIns] = useState([])

  const token = localStorage.getItem("token")

  function click() {
    localStorage.removeItem("token")
    window.location.replace('http://localhost:5173')
  }

  useEffect(() => {
    fetch('http://localhost:8001/users/account',
      {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setUser({
          id: data.id,
          username: data.username,
          balance: data.account.balance.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })
        });
      }
      )
      .catch(error => {
        console.error(error)
        window.location.replace('http://localhost:5173')

      })
  }, [])

  function onSubmit(transfer) {

    const newTransfer = transfer

    fetch('http://localhost:8001/transactions',
      {
        method: 'POST',
        body: JSON.stringify(newTransfer),
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response => {
        console.log(response.statusText)

        document.location.reload(true)
      })
      .catch(error => { return console.error(error) })
  }

  function onSubmitTransactions(data) {
    const table = document.querySelectorAll('.table')

    const url = `http://localhost:8001/transactions?date=${data.date}&role=${data.role}`

    setCashOuts([])
    setCashIns([])

    fetch(url,
      {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response => response.json())
      .then(dataTransactions => {

        console.log(dataTransactions)

        if (dataTransactions.length === 0) {
          table[0].style.display = 'none'
          window.alert('there are no transactions in this date')
          return
        }

        if (data.role === "Cash-out") {
          dataTransactions.forEach((value) => {
            fetch(`http://localhost:8001/users/user/${value.creditedAccount.id}`)
              .then(response => response.json())
              .then(dataUser => {
                console.log(dataUser)
                const newCashOut = {
                  name: dataUser.username,
                  value: value.value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }),
                  date: value.createdAt
                }

                setCashOuts(prevState => [...prevState, newCashOut])

              })
              .catch(error => console.error(error))
          })
          table[0].style.display = 'flex'
          return
        }

        if (data.role === "Cash-in") {
          dataTransactions.forEach((value) => {
            fetch(`http://localhost:8001/users/user/${value.debitedAccount.id}`)
              .then(response => response.json())
              .then(dataUser => {
                const newCashIn = {
                  name: dataUser.username,
                  value: value.value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }),
                  date: value.createdAt
                }

                setCashIns(prevState => [...prevState, newCashIn])

              })
              .catch(error => console.error(error))

          })

          table[0].style.display = 'flex'
          return
        }

        if (dataTransactions.cashOut.length === 0 && dataTransactions.cashIn.length === 0) {
          table[0].style.display = 'none'
          window.alert('there are no transactions in this date')
          return
        }

        if (data.role === "All") {
          dataTransactions.cashOut.forEach((value) => {
            fetch(`http://localhost:8001/users/user/${value.creditedAccount.id}`)
              .then(response => response.json())
              .then(dataUser => {
                console.log(dataUser)
                const newCashOut = {
                  name: dataUser.username,
                  value: value.value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }),
                  date: value.createdAt
                }

                setCashOuts(prevState => [...prevState, newCashOut])

              })
              .catch(error => console.error(error))
          })

          dataTransactions.cashIn.forEach((value) => {
            fetch(`http://localhost:8001/users/user/${value.debitedAccount.id}`)
              .then(response => response.json())
              .then(dataUser => {
                const newCashIn = {
                  name: dataUser.username,
                  value: value.value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }),
                  date: value.createdAt
                }

                setCashIns(prevState => [...prevState, newCashIn])

              })
              .catch(error => console.error(error))
          })

          table[0].style.display = 'flex'
          return
        }
      })
      .catch(error => { return console.error(error) })

  }

  return (
    <div className="dashboard">
      <Header name={user.username} onClick={click} />
      <div className="corpo">
        <Balance balance={user.balance} />
        <Transfer onSubmit={onSubmit} />
        <Transactions onSubmitTransactions={onSubmitTransactions} />
        <Table
          cashOut={
            cashOuts.map(cashOut => <CashOut
              key={cashOut.date}
              name={cashOut.name}
              value={cashOut.value}
              date={new Date(cashOut.date)
                .toLocaleDateString('pt-BR', {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit"
                })} />
            )
          }

          cashIn={
            cashIns.map(cashIn => <CashIn
              key={cashIn.date}
              name={cashIn.name}
              value={cashIn.value}
              date={new Date(cashIn.date)
                .toLocaleDateString('pt-BR', { 
                  day: "2-digit", 
                  month: "2-digit", 
                  year: "2-digit", 
                  hour: "2-digit", 
                  minute: "2-digit" 
                })} />
            )
          }
        />
      </div>
    </div>
  )
}

export default Dashboard
