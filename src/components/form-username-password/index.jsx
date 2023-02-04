import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import './index.css'

const schema = yup.object({
    username: 
        yup.string()
        .required('O nome é obrigatório.')
        .min(3, 'O nome tem que ter no minímo 3 caracteres.'),
    password: 
        yup.string()
        .required('A senha é obrigatória.')
        .min(8, 'A senha tem que ter no minímo 8 caracteres.')
        .matches(
            /(?=.*[A-Z].*)(?=.*\d.*)/gm,
            'É obrigatório ter no minímo um número e uma letra maiúscula.'
            ),
  }).required();

function FormUsernamePassword(props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
      });

    return (
        <form className="form" onSubmit={handleSubmit(props.onSubmit)}>
            
            <div className="campo">
                <span className="material-symbols-outlined">
                    person
                </span>
                <input type="text"
                    name="username"
                    id="iusername"
                    placeholder="username" {...register("username", {required: true})}/>
                <p>{errors.username?.message}</p>
            </div>
            
            <div className="campo">
                <span className="material-symbols-outlined">
                    key
                </span>
                <input type="password"
                    name="password"
                    id="ipassword"
                    placeholder="password" {...register("password", {required: true})}/>
                <p>{errors.password?.message}</p>
            </div>

            <div id='area-buttons'>
                <a href="/cadastro">Cadastre-se</a>
                <input type="submit" value="Entrar" id='button' />
            </div>
        </form>
    )
}

export default FormUsernamePassword
