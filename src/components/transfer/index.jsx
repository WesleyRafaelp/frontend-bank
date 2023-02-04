import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import './index.css'

const schema = yup.object({
  username: 
      yup.string()
      .required('O nome é obrigatório.')
      .min(3, 'O nome tem que ter no minímo 3 caracteres.'),
  value: 
      yup.number('valor tem que ser numero')
      .required('O valor obrigatório.')
      .positive('Não pode enviar valor negativo')
}).required();

function Transfer(props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

    return (
      <div className="transfer">
        <h2>Transferir</h2>
        <form onSubmit={handleSubmit(props.onSubmit)}>
          
          <h3>Para</h3>
          <input 
          type="text" 
          name="username" 
          id="iusername" 
          className='name-value' 
          {...register("username", {required: true})} />
          
          <h3>Valor</h3>
          <input 
          type= "number"
          name="valor" 
          id="ivalor" 
          className='name-value' 
          placeholder="0,00" 
          min={0.01} 
          step={0.01}
          {...register("value", {required: true})}/>
          <p>{errors.value?.message}</p>

          <input 
          type="submit" 
          value="Enviar" 
          id="button-enviar"/>
          
        </form>
      </div>
    )
}
  
export default Transfer