import './index.css'

function Balance(props) {
  
    return (
      <div className="balance">
        <h2>Conta</h2>
        <p>{props.balance}</p>
      </div>
    )
}
  
export default Balance