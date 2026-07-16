interface ProjectContentInterface {
  type: string,
  description: string
}

export default function ProjectContent({ type, description }: ProjectContentInterface) {
  return (
    <div
      className="
        flex flex-col gap-1
        mx-auto
        w-full max-w-[650px]
        h-full
        md:aspect-6/5
      "
    >
      <p>Projet <span>{type}</span></p>
      <p>{description}</p>
    </div>
  );
}