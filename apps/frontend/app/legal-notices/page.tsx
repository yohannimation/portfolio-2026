import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Yohannimation.",
  alternates: {
    canonical: `https://yohannimation.fr/legal-notices`
  },
  openGraph: {
    title: "Mentions légales",
    description: "Mentions légales du site Yohannimation.",
    siteName: "Yohannimation portfolio",
    locale: "fr",
    url: `https://yohannimation.fr/legal-notices`,
    countryName: "France"
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LegalNotice() {
  return (
    <div className="p-5 pt-10 sm:p-20 sm:pt-25 flex flex-col gap-5">
      <h1 className="uppercase">Mentions légales</h1>

      <div>
        <h2 className="uppercase">Éditeur du site</h2>
        <p>Le présent site, accessible à l'adresse <code>https://yohannimation.fr</code>, est édité par : </p>
        <ul className="ms-5 list-disc">
          <li>NOM / Prénom : RENAULD Yohann</li>
          <li>Statut : Particulier</li>
          <li>Email : renauldyohann@gmail.com</li>
        </ul>
      </div>

      <div>
        <h2 className="uppercase">Directeur de la publication</h2>
        <p>Le directeur de la publication est : </p>
        <ul className="ms-5 list-disc">
          <li>NOM / Prénom : RENAULD Yohann</li>
        </ul>
      </div>

      <div>
        <h2 className="uppercase">Hébergement</h2>
        <p>Le site est hébergé par : </p>
        <ul className="ms-5 list-disc">
          <li>Hébergeur : RENAULD Yohann</li>
          <li>Localisation : Grenoble</li>
          <li>Email : renauldyohann@gmail.com</li>
        </ul>
      </div>

      <div>
        <h2 className="uppercase">Propriété intellectuelle</h2>
        <p>
          L'ensemble du contenu présent sur ce site (textes, images, logo, etc.) est protégé par le droit de la propriété intellectuelle.<br/>
          Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation préalable est interdite.
        </p>
      </div>

      <div>
        <h2 className="uppercase">Cookies</h2>
        <p>
          Le site peut utiliser des cookies pour améliorer l'expérience utilisateur (à but non commercial).<br/>
          Vous pouvez bloquer les cookies en configurant votre navigateur. 
        </p>
      </div>

      <div>
        <h2 className="uppercase">Liens hypertextes</h2>
        <p>
          Ce site peut contenir des liens vers des sites tiers. Yohann RENAULD (Yohannimation) n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
        </p>
      </div>

      <div>
        <h2 className="uppercase">Droit applicable</h2>
        <p>
          Le présent site est soumis au droit français. En cas de litige, le tribunal de Grenoble sera seul compétent.
        </p>
      </div>
    </div>
  );
}
