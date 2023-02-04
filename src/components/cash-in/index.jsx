
function CashIn(props) {
  
  
  return (
    <section className="recebeu">
      <p>Recebeu de <strong>{props.name}</strong> {props.value}</p>
      <p>{props.date}</p>
    </section>
  )
}

export default CashIn