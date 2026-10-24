import { Header } from "../../components/Header";
import { useState, useEffect, type SubmitEvent} from "react";
import { Input } from "../../components/Input";
import {
  FiLink,
  FiYoutube,
  FiSend,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";

// Importando Firestore para manipular o banco de dados
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

interface linkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
  subtitleColor: string;
  bgColor: string;
}

export function Admin() {
  const [nameLink, setNameLink] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [textColorInput, settextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setbackgroundColorInput] = useState("#121212");
  const [subtitleTextColor, setSubtitleTextColor] = useState("#f2f2f2");
  const [backgroundColorIcon, setbackgroundColorIcon] = useState("transparent");
  const [iconSelected, seticonSelected] = useState("")
  

  const [links, setLinks] = useState<linkProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const lista: linkProps[] = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
          subtitleColor: doc.data().subtitleColor,
          bgColor: doc.data().bgColor,
        });
      });

      setLinks(lista);
    });

    return () => {
      unsub();
    };
  }, []);

  async function handleRegister(e: SubmitEvent) {
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
        created: new Date(),
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
    <div className="flex min-h-screen flex-col items-center px-4 pb-4 lg:h-screen lg:overflow-hidden">
      <Header />

      <form
        onSubmit={handleRegister}
        className="mt-4 grid w-full max-w-5xl flex-1 grid-cols-1 gap-4 lg:min-h-0 lg:grid-cols-2"
      >
        {/* ===== COLUNA ESQUERDA: formulário ===== */}
        <div className="flex flex-col gap-2 lg:min-h-0">
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
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-b-blue-500 focus:ring-4 focus:ring-violet-500/10"
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
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-b-blue-500 focus:ring-4 focus:ring-violet-500/10"
          />

          {/* Grid 2x2 com os seletores de cor, mais compactos */}
          <section className="my-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-2xl border border-gray-800 bg-gray-900 p-3 shadow-lg transition-all duration-200 hover:border-violet-500/40">
              <label className="text-xs font-semibold text-gray-200">
                Cor do título do link
              </label>

              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={textColorInput}
                  onChange={(e) => settextColorInput(e.target.value)}
                  className="h-10 w-12 cursor-pointer overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-1 transition-transform duration-200 hover:scale-105"
                />

                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Cor do texto</span>
                  <span className="font-mono text-sm font-medium uppercase text-gray-200">
                    {textColorInput}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-2xl border border-gray-800 bg-gray-900 p-3 shadow-lg transition-all duration-200 hover:border-violet-500/40">
              <label className="text-xs font-semibold text-gray-200">
                Cor de fundo do link
              </label>

              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={backgroundColorInput}
                  onChange={(e) => setbackgroundColorInput(e.target.value)}
                  className="h-10 w-12 cursor-pointer overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-1 transition-transform duration-200 hover:scale-105"
                />

                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Cor de fundo</span>
                  <span className="font-mono text-sm font-medium uppercase text-gray-200">
                    {backgroundColorInput}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-2xl border border-gray-800 bg-gray-900 p-3 shadow-lg transition-all duration-200 hover:border-violet-500/40">
              <label className="text-xs font-semibold text-gray-200">
                Cor do subtítulo
              </label>

              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={subtitleTextColor}
                  onChange={(e) => setSubtitleTextColor(e.target.value)}
                  className="h-10 w-12 cursor-pointer overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-1 transition-transform duration-200 hover:scale-105"
                />

                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">
                    Cor do subtítulo
                  </span>
                  <span className="font-mono text-sm font-medium uppercase text-gray-200">
                    {subtitleTextColor}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-2xl border border-gray-800 bg-gray-900 p-3 shadow-lg transition-all duration-200 hover:border-violet-500/40">
              <label className="text-xs font-semibold text-gray-200">
                Cor de fundo do ícone
              </label>

              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={backgroundColorIcon}
                  onChange={(e) => setbackgroundColorIcon(e.target.value)}
                  className="h-10 w-12 cursor-pointer overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-1 transition-transform duration-200 hover:scale-105"
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
          </section>

          {/* escolher ícone */}
          <section className="flex items-center justify-center py-1">
            <div className="flex items-center gap-4">
              {/* YouTube */}
              <button
                type="button"
                aria-label="YouTube"
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                onClick={() => seticonSelected("youtube")}
              >
                <FiYoutube size={22} />
              </button>

              {/* GitHub */}
              <button
                type="button"
                aria-label="GitHub"
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-lg hover:shadow-gray-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                onClick={() => seticonSelected("github")}
              >
                <FiGithub size={22} />
              </button>

              {/* LinkedIn */}
              <button
                type="button"
                aria-label="LinkedIn"
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                onClick={() => seticonSelected("linkedin")}
              >
                <FiLinkedin size={22} />
              </button>
            </div>
          </section>

          {/* Botão de enviar */}
          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl hover:shadow-violet-950/40 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-gray-950 active:translate-y-0"
          >
            <FiSend
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
            Enviar link
          </button>
        </div>

        {/* ===== COLUNA DIREITA: preview + lista ===== */}
        <div className="flex flex-col gap-4 lg:min-h-0">
          {/* Pré-visualização */}
          {nameLink !== "" && (
            <article className="rounded-2xl border border-gray-800 bg-gray-900 p-4 shadow-lg">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Pré-visualização
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">
                    Veja como seu link será exibido.
                  </p>
                </div>

                <span className="rounded-lg bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                  Preview
                </span>
              </div>

              <a
                href={urlLink || "#"}
                onClick={(e) => e.preventDefault()}
                className="group block rounded-xl border border-white/10 px-5 py-3 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  color: textColorInput,
                  backgroundColor: backgroundColorInput,
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      style={{ backgroundColor: backgroundColorIcon }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    >
                      {iconSelected === "youtube" && <FiYoutube size={22} /> || iconSelected === "linkedin" && <FiLinkedin size={22} /> || iconSelected === "github" && <FiGithub size={22} /> }
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold">{nameLink}</p>

                      <p
                        className="mt-1 truncate text-sm"
                        style={{ color: subtitleTextColor }}
                      >
                        {urlLink || "Sua URL aparecerá aqui"}
                      </p>
                    </div>
                  </div>

                  <FiLink
                    size={20}
                    className="shrink-0 opacity-60 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </a>
            </article>
          )}

          {/* Links cadastrados: ocupa o espaço que sobra (flex-1) e rola por dentro */}
          <section className="flex flex-col rounded-2xl border border-gray-800 bg-gray-900 p-4 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">
                  Links cadastrados
                </h3>
                <p className="mt-1 text-xs text-gray-400">
                  Visualize os links salvos no Firebase.
                </p>
              </div>

              <span className="rounded-lg bg-violet-500/10 px-3 py-1.5 text-sm font-semibold text-violet-300">
                {links.length}
              </span>
            </div>

            {links.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-700 px-4 py-8 text-center">
                <FiLink size={26} className="mx-auto text-gray-500" />
                <p className="mt-3 text-sm font-medium text-gray-300">
                  Nenhum link cadastrado
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Os links cadastrados aparecerão aqui.
                </p>
              </div>
            ) : (
              <div className="flex max-h-72 flex-col gap-3 overflow-y-auto pr-1 lg:max-h-[45vh]">
                {links.map((link) => (
                  <article
                    key={link.id}
                    className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-800 bg-gray-950 p-3 transition-all duration-200 hover:border-violet-500/40"
                  >
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: link.bg || "#292929" }}
                    >
                      <FiYoutube
                        size={21}
                        style={{ color: link.color || "#f1f1f1" }}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-100">
                        {link.name}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {link.url}
                      </p>
                    </div>

                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Abrir ${link.name}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-violet-500/10 hover:text-violet-300"
                    >
                      <FiLink size={18} />
                    </a>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </form>
    </div>
  );
}
