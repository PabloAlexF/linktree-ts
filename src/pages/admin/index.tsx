import { Header } from "../../components/Header";
import { useState, type FormEvent } from "react";
import { Input } from "../../components/Input";
import { FiLink, FiYoutube, FiSend } from "react-icons/fi";

// Importando Firestore para manipular o banco de dados
import { db } from "../../services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";

export function Admin() {
  const [nameLink, setNameLink] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [textColorInput, settextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setbackgroundColorInput] = useState("#121212");
  const [subtitleTextColor, setSubtitleTextColor] = useState("#f2f2f2");
  const [backgroundColorIcon, setbackgroundColorIcon] = useState("transparent");

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (nameLink.trim() === "" || urlLink.trim() === "") {
        alert("Preencha todos os campos!");
        return;
      }

      await addDoc(collection(db, "links"), {
        name: nameLink,
        url: urlLink,
        bg: backgroundColorIcon,
        color: textColorInput,
        subtitleColor: subtitleTextColor,
        bgColor: backgroundColorInput,
      });

      setNameLink("");
      setUrlLink("");

      console.log("Cadastrado com sucesso!");
    } catch (error) {
      console.log(
        `Impossível realizar o cadastro desejado, por favor, confira o erro: ${error}`,
      );
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-2 pb-7">
      <Header />

      <form
        onSubmit={handleRegister}
        className="my-20 mb-3 flex w-full max-w-xl flex-col gap-2"
      >
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
                <span className="text-xs text-gray-400">Cor do subtítulo</span>

                <span className="font-mono text-sm font-medium uppercase text-gray-200">
                  {subtitleTextColor}
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
                <span className="text-xs text-gray-400">
                  Cor de fundo do ícone
                </span>

                <span className="font-mono text-sm font-medium uppercase text-gray-200">
                  {backgroundColorIcon}
                </span>
              </div>
            </div>
          </div>

          {/* Botão de enviar */}
          <button
            type="submit"
            className="group col-span-1 mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl hover:shadow-violet-950/40 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-gray-950 active:translate-y-0 sm:col-span-2"
          >
            <FiSend
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
            Enviar link
          </button>
        </section>

        {/* Preview */}
        {nameLink !== "" && (
          <div>
            <article>
              <label className="text-sm font-semibold text-gray-200">
                Preview
              </label>

              <a
                href={urlLink || "#"}
                onClick={(e) => e.preventDefault()}
                className="block rounded-xl bg-gradient-to-r px-5 py-4 shadow-md transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  color: textColorInput,
                  backgroundColor: backgroundColorInput,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      style={{ backgroundColor: backgroundColorIcon }}
                      className="rounded-md p-3 text-pink-600"
                    >
                      <FiYoutube size={22} />
                    </div>

                    <div className="text-left">
                      <p className="font-medium">{nameLink}</p>

                      <p style={{ color: subtitleTextColor }}>
                        Tutoriais e projetos
                      </p>
                    </div>
                  </div>

                  <FiLink className="text-gray-400" />
                </div>
              </a>
            </article>
          </div>
        )}
      </form>
    </div>
  );
}
