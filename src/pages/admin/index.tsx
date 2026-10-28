import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useEffect, useState, type SubmitEvent } from "react";
import {
  FiGithub,
  FiLink,
  FiLinkedin,
  FiSend,
  FiTrash,
  FiYoutube,
} from "react-icons/fi";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
  subtitleColor: string;
  bgColor: string;
  icon: string;
}

const iconOptions = [
  { value: "youtube", label: "YouTube", Icon: FiYoutube },
  { value: "github", label: "GitHub", Icon: FiGithub },
  { value: "linkedin", label: "LinkedIn", Icon: FiLinkedin },
];

export function Admin() {
  const [nameLink, setNameLink] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");
  const [subtitleTextColor, setSubtitleTextColor] = useState("#b8b8b8");
  const [backgroundColorIcon, setBackgroundColorIcon] = useState("#292929");
  const [iconSelected, setIconSelected] = useState("");
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(
      queryRef,
      (snapshot) => {
        const list: LinkProps[] = snapshot.docs.map((linkDoc) => {
          const data = linkDoc.data();

          return {
            id: linkDoc.id,
            name: data.name ?? "",
            url: data.url ?? "",
            bg: data.bg ?? "#292929",
            color: data.color ?? "#f1f1f1",
            subtitleColor: data.subtitleColor ?? "#b8b8b8",
            bgColor: data.bgColor ?? "#121212",
            icon: data.icon ?? "",
          };
        });

        setLinks(list);
      },
      (error) => {
        console.error("Não foi possível carregar os links:", error);
        setErrorMessage("Não foi possível carregar os links salvos.");
      },
    );

    return () => unsubscribe();
  }, []);

  async function handleRegister(e: SubmitEvent) {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");

    if (!nameLink.trim() || !urlLink.trim() || !iconSelected) {
      setErrorMessage("Preencha o nome, a URL e selecione um ícone.");
      return;
    }

    try {
      setSaving(true);

      await addDoc(collection(db, "links"), {
        name: nameLink.trim(),
        url: urlLink.trim(),
        bg: backgroundColorIcon,
        color: textColorInput,
        subtitleColor: subtitleTextColor,
        bgColor: backgroundColorInput,
        created: new Date(),
        icon: iconSelected,
      });

      setNameLink("");
      setUrlLink("");
      setIconSelected("");
      setMessage("Link cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar o link:", error);
      setErrorMessage(
        "Não foi possível cadastrar o link. Verifique sua conexão e as permissões do Firebase.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Deseja realmente excluir este link?");
    if (!confirmed) return;

    setMessage("");
    setErrorMessage("");

    try {
      await deleteDoc(doc(db, "links", id));
      setMessage("Link excluído com sucesso.");
    } catch (error) {
      console.error("Erro ao excluir o link:", error);
      setErrorMessage("Não foi possível excluir o link.");
    }
  }

  function renderIcon(iconName: string, size = 21) {
    switch (iconName) {
      case "youtube":
        return <FiYoutube size={size} />;
      case "github":
        return <FiGithub size={size} />;
      case "linkedin":
        return <FiLinkedin size={size} />;
      default:
        return <FiLink size={size} />;
    }
  }

  const labelClass = "mb-1.5 block text-sm font-medium text-gray-300";
  const colorPanelClass = "rounded-lg border border-gray-800 bg-gray-900 p-3";
  const colorInputClass =
    "h-9 w-11 cursor-pointer rounded-md border border-gray-700 bg-gray-800 p-1";

  return (
    <div className="min-h-screen bg-gray-950 px-4 pb-8 text-gray-100">
      <Header />

      <main className="mx-auto w-full max-w-6xl py-6">
        <div className="mb-6">
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Gerenciar links
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Cadastre links e ajuste como eles serão exibidos.
          </p>
        </div>

        {(message || errorMessage) && (
          <div
            role="status"
            className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
              errorMessage
                ? "border-red-900 bg-red-950/40 text-red-300"
                : "border-green-900 bg-green-950/30 text-green-300"
            }`}
          >
            {errorMessage || message}
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <form
            onSubmit={handleRegister}
            className="rounded-xl border border-gray-800 bg-gray-900 p-5"
          >
            <h2 className="mb-5 text-base font-semibold text-white">
              Novo link
            </h2>

            <div className="mb-4">
              <label htmlFor="linkName" className={labelClass}>
                Nome do link
              </label>
              <Input
                id="linkName"
                placeholder="Ex.: Meu portfólio"
                value={nameLink}
                onChange={(e) => setNameLink(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 placeholder:text-gray-500"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="linkUrl" className={labelClass}>
                URL
              </label>
              <Input
                id="linkUrl"
                type="url"
                placeholder="https://exemplo.com"
                value={urlLink}
                onChange={(e) => setUrlLink(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 placeholder:text-gray-500"
              />
            </div>

            <div className="mb-5">
              <p className={labelClass}>Ícone</p>
              <div className="flex gap-2">
                {iconOptions.map(({ value, label, Icon }) => {
                  const selected = iconSelected === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      aria-label={label}
                      aria-pressed={selected}
                      title={label}
                      onClick={() => setIconSelected(value)}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${
                        selected
                          ? "border-violet-400 bg-violet-500/15 text-violet-300"
                          : "border-gray-700 bg-gray-950 text-gray-300 hover:border-gray-500 hover:text-white"
                      }`}
                    >
                      <Icon size={20} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-5">
              <p className={labelClass}>Aparência</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className={colorPanelClass}>
                  <label
                    htmlFor="titleColor"
                    className="mb-2 block text-xs text-gray-400"
                  >
                    Cor do título
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="titleColor"
                      type="color"
                      value={textColorInput}
                      onChange={(e) => setTextColorInput(e.target.value)}
                      className={colorInputClass}
                    />
                    <span className="font-mono text-xs text-gray-300">
                      {textColorInput.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className={colorPanelClass}>
                  <label
                    htmlFor="linkBackground"
                    className="mb-2 block text-xs text-gray-400"
                  >
                    Fundo do link
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="linkBackground"
                      type="color"
                      value={backgroundColorInput}
                      onChange={(e) => setBackgroundColorInput(e.target.value)}
                      className={colorInputClass}
                    />
                    <span className="font-mono text-xs text-gray-300">
                      {backgroundColorInput.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className={colorPanelClass}>
                  <label
                    htmlFor="subtitleColor"
                    className="mb-2 block text-xs text-gray-400"
                  >
                    Cor da URL
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="subtitleColor"
                      type="color"
                      value={subtitleTextColor}
                      onChange={(e) => setSubtitleTextColor(e.target.value)}
                      className={colorInputClass}
                    />
                    <span className="font-mono text-xs text-gray-300">
                      {subtitleTextColor.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className={colorPanelClass}>
                  <label
                    htmlFor="iconBackground"
                    className="mb-2 block text-xs text-gray-400"
                  >
                    Fundo do ícone
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="iconBackground"
                      type="color"
                      value={backgroundColorIcon}
                      onChange={(e) => setBackgroundColorIcon(e.target.value)}
                      className={colorInputClass}
                    />
                    <span className="font-mono text-xs text-gray-300">
                      {backgroundColorIcon.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSend size={16} />
              {saving ? "Salvando..." : "Cadastrar link"}
            </button>
          </form>

          <div className="flex flex-col gap-5">
            <section className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <div className="mb-4">
                <h2 className="text-base font-semibold text-white">
                  Pré-visualização
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  A aparência do link será atualizada conforme você editar.
                </p>
              </div>

              {nameLink.trim() || urlLink.trim() || iconSelected ? (
                <div
                  className="flex items-center gap-3 rounded-lg border border-gray-700 px-4 py-3"
                  style={{ backgroundColor: backgroundColorInput }}
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: backgroundColorIcon,
                      color: textColorInput,
                    }}
                  >
                    {renderIcon(iconSelected)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-sm font-medium"
                      style={{ color: textColorInput }}
                    >
                      {nameLink || "Nome do link"}
                    </p>
                    <p
                      className="mt-1 truncate text-xs"
                      style={{ color: subtitleTextColor }}
                    >
                      {urlLink || "https://exemplo.com"}
                    </p>
                  </div>
                  <FiLink className="shrink-0 text-gray-400" size={18} />
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-gray-700 px-4 py-8 text-center text-sm text-gray-500">
                  Preencha os campos para visualizar o link.
                </div>
              )}
            </section>

            <section className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-white">
                    Links cadastrados
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Links armazenados no Firebase.
                  </p>
                </div>
                <span className="rounded-md bg-gray-800 px-2.5 py-1 text-sm text-gray-300">
                  {links.length}
                </span>
              </div>

              {links.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-700 px-4 py-8 text-center text-sm text-gray-500">
                  Nenhum link cadastrado ainda.
                </div>
              ) : (
                <div className="flex max-h-[420px] flex-col gap-2 overflow-y-auto pr-1">
                  {links.map((link) => (
                    <article
                      key={link.id}
                      style={{backgroundColor: link.bg}}
                      className="flex min-w-0 items-center gap-3 rounded-lg "
                    >
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: link.bg || "#292929",
                          color: link.color || "#f1f1f1",
                        }}
                      >
                        {renderIcon(link.icon, 20)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className="truncate text-sm font-medium"
                          style={{ color: link.color || "#f1f1f1" }}
                        >
                          {link.name}
                        </p>
                        <p
                          className="truncate text-xs"
                          style={{ color: link.subtitleColor || "#b8b8b8" }}
                        >
                          {link.url}
                        </p>
                      </div>

                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Abrir ${link.name} em uma nova aba`}
                        title="Abrir link"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-800 hover:text-white"
                      >
                        <FiLink size={17} />
                      </a>

                      <button
                        type="button"
                        aria-label={`Excluir ${link.name}`}
                        title="Excluir link"
                        onClick={() => handleDelete(link.id)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-400 transition hover:bg-red-950 hover:text-red-300"
                      >
                        <FiTrash size={16} />
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
