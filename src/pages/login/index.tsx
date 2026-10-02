import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
export function Login() {
    return(
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">
                <h1>Dev <span>Link</span></h1>

                <form className="w-full max-w-xl flex flex-col px-2">
                    <Input/>
                    <button type="submit" className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white">
                        Acessar
                    </button>
                </form>
            </Link>
        </div>
    )
}