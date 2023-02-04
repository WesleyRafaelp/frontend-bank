import './index.css'

function Table(props) {
  
  
  return (
    <div className="table">
      <h2>Tabela de Transações</h2>
      {props.cashOut}
      {props.cashIn}
    </div>
  )
}

export default Table