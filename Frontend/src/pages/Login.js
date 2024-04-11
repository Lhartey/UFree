import{ useState } from 'react'
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('')
    const { login, error, isLoading} = useLogin()
    
    const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password, userType)
}

return (
    <form className="login" onSubmit={handleSubmit}>
        <h3>Log in</h3>
        <label>Email:</label>
        <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
        />
        <label>Password:</label>
        <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
        />
        <label>User Type:</label>
        <div className="radio-container">
        <input
            type="radio"
            name="userType" // Use the same name for all radio buttons
            value="employer"
            onChange={(e) => setUserType(e.target.value)}
            checked={userType === "employer"} // Set checked for the currently selected option
        />
        <label htmlFor="employer">Employer</label>
        <br />
        <input
            type="radio"
            name="userType" // Use the same name for all radio buttons
            value="student"
            onChange={(e) => setUserType(e.target.value)}
            checked={userType === "student"} // Set checked for the currently selected option
        />
        <label htmlFor="student">Student</label>
        </div>

        {/* <div>
            Already have an account? Log in <a href="/login">here</a>
        </div> */}
        <br />
        <button disabled={isLoading}>Log in</button>
        {error && <div className="error">{error}</div>}
    </form>
    )
}

export default Login