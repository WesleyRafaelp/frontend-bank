
function CashOut(props) {
  
  
  return (
    <section className="enviou">
        <p>Enviou para <strong>{props.name}</strong> {props.value}</p>
        <p>{props.date}</p>
    </section>
  )
}

export default CashOut