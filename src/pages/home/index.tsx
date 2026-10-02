import { FiLink, FiMail, FiYoutube, FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { Social } from '../../components/Social';

export function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-start py-8">
            <header className="flex flex-col items-center mt-12">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                    PA
                </div>
                <h1 className="text-white text-3xl md:text-4xl font-semibold mt-4">Pablo Andrade</h1>
                <p className="text-gray-300 mt-1">Desenvolvedor • Frontend • TypeScript</p>
                <p className="text-gray-400 mt-2">Veja meus links 👇</p>
            </header>

            <main className="w-11/12 max-w-xl mt-8">
                <section className="space-y-4">
                    <a
                        href="*"
                        className="block bg-gradient-to-r from-white/95 to-white/90 text-gray-900 rounded-xl py-4 px-5 shadow-md transform hover:-translate-y-0.5 transition-all duration-200 select-none flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-md bg-white/70 text-pink-600">
                                <FiYoutube size={22} />
                            </div>
                            <div className="text-left">
                                <p className="font-medium">Canal no YouTube</p>
                                <p className="text-sm text-gray-500">Tutoriais e projetos</p>
                            </div>
                        </div>
                        <FiLink className="text-gray-400" />
                    </a>

                    <a
                        href="mailto:seu@email.com"
                        className="block bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl py-4 px-5 shadow-sm transition transform hover:scale-[1.01] flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3 text-white">
                            <div className="p-3 rounded-md bg-white/10">
                                <FiMail size={20} />
                            </div>
                            <div className="text-left">
                                <p className="font-medium">Contato</p>
                                <p className="text-sm text-gray-400">Envie um e-mail</p>
                            </div>
                        </div>
                        <FiLink className="text-gray-400" />
                    </a>

                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="block bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl py-4 px-5 shadow-sm transition transform hover:scale-[1.01] flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3 text-white">
                            <div className="p-3 rounded-md bg-white/10">
                                <FiGithub size={20} />
                            </div>
                            <div className="text-left">
                                <p className="font-medium">GitHub</p>
                                <p className="text-sm text-gray-400">Projetos e repositórios</p>
                            </div>
                        </div>
                        <FiLink className="text-gray-400" />
                    </a>
                </section>
            </main>

            <footer className='flex justify-center gap-3 my-4'>
                <Social url="https://www.linkedin.com/in/pabloalex/">
                    <FiLinkedin size={35} color='#fff'/>
                </Social>
                <Social url="https://github.com/PabloAlexF">
                    <FiGithub size={35} color='#fff'/>
                </Social>
            </footer>
        </div>
    );
}