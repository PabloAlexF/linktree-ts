import { useEffect, useState, type SubmitEvent } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";


export function NetWorks() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

    useEffect(() => {
    async function loadLinks() {
          const docRef = doc(db, "social", "link")
          const docSnapShot = await getDoc(docRef);

          try {
            if (docSnapShot.exists()) {
              setFacebook(docSnapShot.data()?.facebook)
              setInstagram(docSnapShot.data()?.instagram)
              setWhatsapp(docSnapShot.data()?.whatsapp)

              return;
            }
          } catch (error) {
            console.log(`Não foi possível carregar os links! ${error}`)
          }
    }


    loadLinks();
    }, [])


  function handleRegister(e: SubmitEvent) {
    e.preventDefault();

    try {
      if (
        facebook.length === 0 ||
        instagram.length === 0 ||
        whatsapp.length === 0
      ) {
        alert("Preencha todos os campos!");
        return;
      }

      setDoc(doc(db, "social", "link"), {
        facebook: facebook,
        instagram: instagram,
        whatsapp: whatsapp,
      });
      console.log(`links cadastrados com sucesso!`);
    } catch (error) {
      console.log(`Não foi possível adicionar os links! ERRO> ${error}`);
    }
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-white text-2xl font-medium mt-8 mb-4 ">
        Minhas Redes Sociais
      </h1>

      <form
        onSubmit={handleRegister}
        className="flex  flex-col max-w-xl w-full"
      >
        <label className="text-white mt-2 mb-2">Link do Facebook</label>
        <Input
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          type="url"
          placeholder="Digite a url do faceebok"
        />
        <label className="text-white mt-2 mb-2">Link do Instagram</label>
        <Input
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          type="url"
          placeholder="Digite a url do instagram"
        />
        <label className="text-white mt-2 mb-2">Link do whatsapp</label>
        <Input
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          type="url"
          placeholder="Digite a url do Whatsapp"
        />

        <button type="submit">Enviar links</button>
      </form>
    </div>
  );
}
