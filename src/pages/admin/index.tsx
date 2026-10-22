import { Header } from "../../components/Header";
import { useState } from "react";
import { Input } from "../../components/Input";
import {
  FiLink,
  FiMail,
  FiYoutube,
  FiGithub,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";

export function Admin() {
  const [nameLink, setNameLink] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [textColorInput, settextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setbackgroundColorInput] = useState("#121212");
  const [subtitleTextColor, setSubtitleTextColor] = useState("#f2f2f2");
  const [backgroundColorIcon, setbackgroundColorIcon] = useState("transparent");

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

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
          onChange={(e) => setNameLink(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-b-blue-500 focus:ring-4 focus:ring-violet-500/10"
        />

        <label
          htmlFor="linkUrl"
          className="text-sm font-semibold text-gray-200"
        >
          Url do link
        </label>

        <Input
          type="url"
          placeholder="Digite a URL do link..."
          value={urlLink}
          onChange={(e) => setUrlLink(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-b-blue-500 focus:ring-4 focus:ring-violet-500/10"
        />

        <section className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-lg transition-all duration-200 hover:border-violet-500/40">
            <label className="text-sm font-semibold text-gray-200">
              Selecione a cor do título do link
            </label>

            <div className="flex items-center gap-3">
              <input
                type="color"
                value={textColorInput}
                onChange={(e) => settextColorInput(e.target.value)}
                className="h-12 w-14 cursor-pointer overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-1 transition-transform duration-200 hover:scale-105"
              />

              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Cor do texto</span>
                <span className="font-mono text-sm font-medium uppercase text-gray-200">
                  {textColorInput}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-lg transition-all duration-200 hover:border-violet-500/40">
            <label className="text-sm font-semibold text-gray-200">
              Selecione a cor de fundo do link
            </label>

            <div className="flex items-center gap-3">
              <input
                type="color"
                value={backgroundColorInput}
                onChange={(e) => setbackgroundColorInput(e.target.value)}
                className="h-12 w-14 cursor-pointer overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-1 transition-transform duration-200 hover:scale-105"
              />

              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Cor de fundo</span>
                <span className="font-mono text-sm font-medium uppercase text-gray-200">
                  {backgroundColorInput}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-lg transition-all duration-200 hover:border-violet-500/40">
            <label className="text-sm font-semibold text-gray-200">
              Selecione a cor do subtítulo
            </label>

            <div className="flex items-center gap-3">
              <input
                type="color"
                value={subtitleTextColor}
                onChange={(e) => setSubtitleTextColor(e.target.value)}
                className="h-12 w-14 cursor-pointer overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-1 transition-transform duration-200 hover:scale-105"
              />

              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Cor de fundo</span>
                <span className="font-mono text-sm font-medium uppercase text-gray-200">
                  {backgroundColorInput}
                </span>
              </div>
            </div>
          </div>


          <div className="flex flex-col gap-3 rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-lg transition-all duration-200 hover:border-violet-500/40">
            <label className="text-sm font-semibold text-gray-200">
              Selecione a cor de fundo do ícone
            </label>

            <div className="flex items-center gap-3">
              <input
                type="color"
                value={backgroundColorIcon}
                onChange={(e) => setbackgroundColorIcon(e.target.value)}
                className="h-12 w-14 cursor-pointer overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-1 transition-transform duration-200 hover:scale-105"
              />

              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Cor de fundo</span>
                <span className="font-mono text-sm font-medium uppercase text-gray-200">
                  {backgroundColorInput}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* preview */}

        <div>
          <article>
            <label className="text-sm font-semibold text-gray-200">
              Preview
            </label>

            <a
              href="*"
              className="block bg-gradient-to-r rounded-xl py-4 px-5 shadow-md transform hover:-translate-y-0.5 transition-all duration-200 select-none flex items-center justify-between"
              style={{
                color: textColorInput,
                backgroundColor: backgroundColorInput,
              }}
            >
              <div className="flex items-center gap-3">
                <div style={{backgroundColor: backgroundColorIcon}} className="p-3 rounded-md text-pink-600">
                  <FiYoutube size={22} />
                </div>
                <div className="text-left">
                  <p className="font-medium">Canal no YouTube</p>
                  <p style={{ color: subtitleTextColor }}>
                    Tutoriais e projetos
                  </p>
                </div>
              </div>
              <FiLink className="text-gray-400" />
            </a>
          </article>
        </div>
      </form>
    </div>
  );
}
