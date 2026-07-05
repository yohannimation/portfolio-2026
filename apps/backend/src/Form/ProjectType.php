<?php

namespace App\Form;

use App\Entity\Category;
use App\Entity\Project;
use App\Entity\Tag;
use App\Entity\Type;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Vich\UploaderBundle\Form\Type\VichImageType;

class ProjectType extends AbstractType
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => 'Project name'
            ])
            ->add('description', TextareaType::class, [
                'label' => 'Description',
                'attr' => [
                    'rows' => 5
                ]
            ])
            ->add('source', TextType::class, [
                'label' => 'Project source'
            ])
            ->add('sourceType', TextType::class, [
                'label' => 'Source type',
                'help' => 'link | image | video',
            ])
            ->add('category', EntityType::class, [
                'class' => Category::class,
                'label' => 'Category',
                'expanded' => false,
                'multiple' => false,
                'choice_label' => 'name',
                'by_reference' => true
            ])
            ->add('type', EntityType::class, [
                'class' => Type::class,
                'label' => 'Type',
                'expanded' => false,
                'multiple' => false,
                'choice_label' => 'name',
                'by_reference' => true
            ])
            ->add('tags', EntityType::class, [
                'class' => Tag::class,
                'choice_label' => 'name',
                'multiple' => true,
                'expanded' => false,
                'label' => 'Tags',
                'by_reference' => false,
                'required' => false,
                'attr' => ['class' => 'tom-select', 'data-controller' => 'tom-select'],
            ])
            ->add('miniatureFile', VichImageType::class, [
                'label' => 'Miniature',
                'allow_delete' => true,
                'delete_label' => 'Supprimer l\'image',
                'required' => false
            ])
            ->add('date', DateType::class, [
                'widget' => 'single_text'
            ])
            ->add('active', CheckboxType::class, [
                'label' => 'Active',
                'required' => false
            ])
            ->addEventListener(
                FormEvents::PRE_SUBMIT,
                function (FormEvent $event) {
                    $data = $event->getData();
                    if (!$data) return;

                    $tagsRaw = $data['tags'] ?? null;

                    // Cas crucial : si tags est absent, on force un tableau vide pour vider la collection
                    if ($tagsRaw === null) {
                        $data['tags'] = [];
                        $event->setData($data);
                        return;
                    }

                    // Normalisation en tableau (gestion des chaînes séparées par des virgules)
                    if (is_string($tagsRaw)) {
                        $tags = array_filter(explode(',', $tagsRaw));
                    } elseif (is_array($tagsRaw)) {
                        $tags = $tagsRaw;
                    } else {
                        $tags = [];
                    }

                    $updatedTags = [];
                    foreach ($tags as $tagValue) {
                        $tagValue = trim((string)$tagValue);
                        if ($tagValue === '') continue;

                        // 1. On vérifie si c'est un ID existant
                        if (is_numeric($tagValue)) {
                            $tag = $this->entityManager->getRepository(Tag::class)->find($tagValue);
                            if ($tag) {
                                $updatedTags[] = $tag->getId();
                                continue;
                            }
                        }

                        // 2. Sinon on cherche ou on crée par le nom
                        $tag = $this->entityManager->getRepository(Tag::class)->findOneBy(['name' => $tagValue]);
                        if (!$tag) {
                            $tag = new Tag();
                            $tag->setName($tagValue);
                            $this->entityManager->persist($tag);
                            $this->entityManager->flush();
                        }
                        $updatedTags[] = $tag->getId();
                    }

                    $data['tags'] = $updatedTags;
                    $event->setData($data);
                }
            );
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Project::class,
        ]);
    }
}
