import { Link, Navigate, Outlet } from 'react-router-dom'

export default function Login() {

  const onSubmit = (ev) => {
    ev.preventDefault()
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
            Login into your account
          </h1>
          <input type="email" placeholder="Email"></input>
          <input type="password" placeholder="Password"></input>
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not Registered? <Link to={"/signup"}>Create and Account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
