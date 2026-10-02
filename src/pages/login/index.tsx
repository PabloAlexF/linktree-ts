import { Link } from "react-router-dom";

export function Login() {
    return(
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">
                <h1>Dev <span>Link</span></h1>
            </Link>
        </div>
    )
}