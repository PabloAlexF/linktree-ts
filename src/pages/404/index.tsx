import { Link } from "react-router-dom";
import { BiLink, BiHomeAlt, BiArrowBack } from "react-icons/bi";

export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-white">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-400 shadow-lg shadow-violet-950/20">
          <BiLink size={42} />
        </div>

        <h1 className="text-8xl font-extrabold tracking-tighter text-violet-500 sm:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
          Página não encontrada!
        </h2>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-gray-400 sm:text-base">
          Ops! Parece que o link que você acessou não existe ou foi movido para
          outro endereço.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition-all duration-200 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-gray-950"
          >
            <BiHomeAlt size={20} />
            Voltar ao início
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-700 bg-gray-900 px-6 py-3 text-sm font-semibold text-gray-300 transition-all duration-200 hover:border-gray-500 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-950"
          >
            <BiArrowBack size={20} />
            Voltar à página anterior
          </button>
        </div>

        <p className="mt-12 text-xs text-gray-600">Pablo | Linketree</p>
      </div>
    </div>
  );
}
