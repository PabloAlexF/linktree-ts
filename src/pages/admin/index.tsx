
import { Header } from "../../components/Header"
import { useState } from "react"
import { Input } from "../../components/Input"

export function Admin() {

    const [nameLink, setNameLink] = useState("")
    const [urlLink, setUrlLink] = useState("")

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>
            
            <form className=" mb-3 m-20 flex w-full max-w-md flex-col gap-2 max-w-xl">
                <label
                    htmlFor="linkName"
                    className="text-sm font-semibold text-gray-200"
                >
                    Nome do link
                </label>

                <Input
                    placeholder="Digite o nome do link..."
                    value={nameLink}
                    onChange={(e) => setNameLink(e.target.value) }
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-b-blue-500 focus:ring-4 focus:ring-violet-500/10"
                />


                <label
                    htmlFor="linkUrl"
                    className="text-sm font-semibold text-gray-200"
                >
                    Url do link
                </label>

                <Input
                    placeholder="Digite a URL do link..."
                    value={urlLink}
                    onChange={(e) => setUrlLink(e.target.value) }
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-b-blue-500 focus:ring-4 focus:ring-violet-500/10"
                />
            </form>

        </div>
    )
}