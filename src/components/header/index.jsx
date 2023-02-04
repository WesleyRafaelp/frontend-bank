import './index.css'

function Header(props) {

    return (
      <header className="header">
        <h2>Olá, {props.name}</h2>

        <button onClick= {props.onClick}>
          <label>
          <p>Logout</p>
          <span className="material-symbols-outlined">
                      logout
          </span>
          </label>
        </button>
      </header>
    )
}
  
export default Header
