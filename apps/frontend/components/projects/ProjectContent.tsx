interface ProjectContentInterface {
  type: string,
  description: string
}

export default async function ProjectContent({ type, description }: ProjectContentInterface) {
  return (
    <div className="flex flex-col gap-1">
      <p>Projet <span>{type}</span></p>
      <p>{description}</p>
    </div>
  );
}