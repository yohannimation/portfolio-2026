interface ProjectHeaderInterface {
  name: string,
  date: string
}

export default function ProjectHeader({ name, date }: ProjectHeaderInterface) {
  let tagDate, displayDate;
  
  if (date != "") {
    tagDate = new Date(date).toISOString().split("T")[0];
    displayDate = new Intl.DateTimeFormat("fr-FR", {
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  } else {
    tagDate = "Coming soon";
    displayDate = "Coming soon";
  }

  return (
    <header className="flex items-center gap-2">
      <h2 className="uppercase">{name}</h2>
      -
      <time
        dateTime={tagDate}
      >
        {displayDate}
      </time>
    </header>
  );
}