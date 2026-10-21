
import {
  BiLogOut,
  BiHomeAlt,
  BiLink,
  BiShareAlt,
} from "react-icons/bi";

import { Link } from "react-router-dom";

import {auth} from "../../services/firebaseConnection"
import {signOut} from "firebase/auth"


 async function handleLogout(){
    await signOut(auth)
}

export function Header() {
  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b text-white shadow-lg">
        <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          <Link
            to="/"
            className="flex shrink-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 shadow-md shadow-violet-950/40">
              <BiLink size={25} />
            </div>

            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight">
                ReactLinks
              </h1>

              <p className="text-xs text-gray-400">
                Painel de gerenciamento
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-gray-800 hover:text-white sm:px-4"
            >
              <BiHomeAlt size={20} />
              <span>Home</span>
            </Link>

            <Link
              to="/admin"
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-gray-800 hover:text-white sm:px-4"
            >
              <BiLink size={20} />
              <span>Links</span>
            </Link>

            <Link
              to="/admin/social"
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-gray-800 hover:text-white sm:px-4"
            >
              <BiShareAlt size={20} />
              <span className="hidden md:inline">
                Redes Sociais
              </span>
              <span className="md:hidden">
                Redes
              </span>
            </Link>

            <button
              onClick={handleLogout}
              type="button"
              aria-label="Sair da conta"
              title="Sair"
              className="ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 transition-all duration-200 hover:border-red-500/50 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-950"
            >
              <BiLogOut size={24} />
            </button>
          </div>

        </nav>
      </header>
    </div>
  );
}
