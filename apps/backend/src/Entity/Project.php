<?php

namespace App\Entity;

use App\Repository\ProjectRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\String\Slugger\AsciiSlugger;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: ProjectRepository::class)]
#[Vich\Uploadable]
class Project
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;
    
    #[ORM\Column(length: 1024)]
    private ?string $source = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $sourceType = null;

    #[Vich\UploadableField(mapping: 'project_miniature', fileNameProperty: 'miniatureName', size: 'miniatureSize')]
    private ?File $miniatureFile = null;

    #[ORM\Column(length: 255)]
    private ?string $miniatureName = null;

    #[ORM\Column]
    private ?int $miniatureSize = null;
    
    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column]
    private ?bool $active = null;

    #[ORM\ManyToOne(inversedBy: 'projects')]
    private ?Category $category = null;

    #[ORM\ManyToOne(inversedBy: 'projects')]
    private ?Type $type = null;

    #[ORM\ManyToMany(targetEntity: Tag::class, inversedBy: 'projects')]
    private Collection $tags;
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getSource(): ?string
    {
        return $this->source;
    }

    public function setSource(string $source): static
    {
        $this->source = $source;

        return $this;
    }

    public function getSourceType(): ?string
    {
        return $this->sourceType;
    }

    public function setSourceType(?string $sourceType): static
    {
        $this->sourceType = $sourceType;

        return $this;
    }

    public function getMiniatureFile(): ?File
    {
        return $this->miniatureFile;
    }

    public function setMiniatureFile(?File $miniatureFile = null): void
    {
        $this->miniatureFile = $miniatureFile;
    }

    public function getMiniatureName(): ?string
    {
        return $this->miniatureName;
    }

    public function setMiniatureName(?string $miniatureName): void
    {
        $this->miniatureName = $miniatureName;
    }

    public function getMiniatureSize(): ?int
    {
        return $this->miniatureSize;
    }

    public function setMiniatureSize(?int $miniatureSize): void
    {
        $this->miniatureSize = $miniatureSize;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): static
    {
        $this->active = $active;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getType(): ?Type
    {
        return $this->type;
    }

    public function getSlug(): string
    {
        return (new AsciiSlugger())->slug($this->name ?? '')->toString();
    }

    public function setType(?Type $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function __construct()
    {
        $this->tags = new ArrayCollection();
    }

    /**
     * @return Collection<int, Tag>
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): static
    {
        if (!$this->tags->contains($tag)) {
            $this->tags->add($tag);
        }

        return $this;
    }

    public function removeTag(Tag $tag): static
    {
        $this->tags->removeElement($tag);

        return $this;
    }
}
