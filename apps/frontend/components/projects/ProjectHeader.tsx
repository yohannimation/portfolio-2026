// Translation
import { getTranslations, getLocale } from 'next-intl/server';

interface ProjectHeaderInterface {
  name: string,
  date: string
}

export default async function ProjectHeader({ name, date }: ProjectHeaderInterface) {
  const t = getTranslations('CategoryPage.ProjectHeader');

  const locale = await getLocale();
  const dateLocal = `${locale}-${locale.toUpperCase}`

  let tagDate, displayDate;
  
  if (date != "") {
    tagDate = new Date(date).toISOString().split("T")[0];
    displayDate = new Intl.DateTimeFormat(dateLocal, {
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  } else {
    tagDate = t("comingSoon");
    displayDate = t("comingSoon");
  }

  return (
    <header className="flex items-center gap-2">
      <h2 className="uppercase">{name}</h2>
      -
      <time dateTime={tagDate}>
        {displayDate}
      </time>
    </header>
  );
}