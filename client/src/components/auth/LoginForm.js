import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { Link } from "react-router-dom"
import { useState, useContext} from 'react';
import { AuthContext } from "../../contexts/AuthContext"
import AlertMessage from "../layout/AlertMessage";

function LoginForm() {
    // Context
    const { loginUser } = useContext(AuthContext)

    // Local state
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })

    const [alert, setAlert] = useState(null)

    const {username, password} = loginForm

    const onChangeLoginForm = e => {
        setLoginForm({...loginForm, [e.target.name]: e.target.value })
    }

    const login = async event => {
        event.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if (!loginData.success) {
				setAlert({ type: 'danger', message: loginData.message })
				setTimeout(() => setAlert(null), 5000)
            }
        } catch (err) {
            console.log(err)
        }
        
    }
    return (
        <>
            <Form className="my-4" onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group className="my-2">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                    <Form.Group className="my-2">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button variant="success" type="submit">Login</Button>
            </Form>
            <p>Don't have an account?
                <Link to='/register'>
                    <Button variant="info" size="sm">
                        Register
                    </Button>
                </Link>
            </p>
        </>
    )
}

export default LoginForm
