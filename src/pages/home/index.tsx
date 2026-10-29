import {
  FiLink,
  FiMail,
  FiYoutube,
  FiGithub,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";
import { Social } from "../../components/Social";

import { db } from "../../services/firebaseConnection";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import type { LinksProps } from "react-router-dom";
import { Header } from "../../components/Header";


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

interface socialLinkProps {
  facebook: string;
  instagram: string;
  whatsapp: string;
}

export function Home() {

  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<socialLinkProps>();


  useEffect(() => {

    async function loadLinks() {
      const linksRef = collection(db, "links")
      const queryRef = query(linksRef, orderBy("created", "asc"))

      try {
        const snapshot = await getDocs(queryRef);
        const lista = []

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
            subtitleColor: doc.data().subtitleColor,
            bgColor: doc.data().bgColor,
            icon: doc.data().icon,
          })
        })

        setLinks(lista)

        console.log(lista)
      } catch (error) {
        console.log(`Não foi possível buscar os links cadastrados! ${error}`)
      }
    }


    loadLinks();
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8">
      <Header/>

      <main className="w-11/12 max-w-xl mt-8">
        <section className="space-y-4">

        {
          links.map((link) => (
              <a
              target="blank"
              href={link.url}
              style={{backgroundColor: link.bg}}
              className="block bg-gradient-to-r text-gray-900 rounded-xl py-4 px-5 shadow-md transform hover:-translate-y-0.5 transition-all duration-200 select-none flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div  style={{backgroundColor: link.bgColor}} className="p-3 rounded-md text-pink-600">
                  <FiYoutube size={22} />
                </div>
                <div className="text-left">
                  <p  style={{color: link.color}} className="font-medium">{link.name}</p>
                  <p style={{color: link.subtitleColor}} className="text-sm">{link.url}</p>
                </div>
              </div>
              <FiLink className="text-gray-400" />
            </a>
          ))
        }  

        </section>
      </main>

      <footer className="flex justify-center gap-3 my-4">
        <Social url="https://www.linkedin.com/in/pabloalex/">
          <FiLinkedin size={35} color="#fff" />
        </Social>
        <Social url="https://github.com/PabloAlexF">
          <FiGithub size={35} color="#fff" />
        </Social>
      </footer>
    </div>
  );
}
