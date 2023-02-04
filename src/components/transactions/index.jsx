import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import './index.css'

const schema = yup.object({
  role: 
      yup.string()
      .required('tipo é obrigatorio.'),  
}).required();

function Transactions(props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <div className="transactions">
      <h2>Transações</h2>
      <form onSubmit={handleSubmit(props.onSubmitTransactions)}>
        <select id="filter-select" {...register("role", {required: true})}>
          <option value="All">Todas</option>
          <option value="Cash-in">Recebidas</option>
          <option value="Cash-out">Enviadas</option>
        </select>

        <input 
        type="date" 
        name="data" 
        id="idata" 
        {...register("date", {required:false}) }/>

        <input type="submit" value="Ver"
        id='button-look' />

      </form>
    </div>
  )
}

export default Transactions