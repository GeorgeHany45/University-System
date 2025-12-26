import { useNavigate } from "react-router-dom"

const Notfound = () => {
    const navigate = useNavigate()

    return (
        <div>
            <h2>Page not Found</h2>
            <button onClick={() => navigate('/')} className="returnbutton">Back to Home</button>
        </div>
    )
}

export default Notfound
