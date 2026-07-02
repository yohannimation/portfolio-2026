<?php

namespace App\Controller\frontend;

use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

#[Route('/category', name: 'app.front.category')]
final class CategoryController extends AbstractController
{
    #[Route('', name: '.index', methods: ['GET'])]
    public function index(): RedirectResponse
    {
        return $this->redirectToRoute('app.front.index');
    }

    #[Route('/{id}', name: '.show.without-slug', methods: ['GET'], requirements: ['id' => '\d+'])]
    #[Route('/{id}-{slug}', name: '.show', methods: ['GET'], requirements: ['id' => '\d+', 'slug' => '[a-z0-9-]*'])]
    public function show(
        int $id,
        ?string $slug = '',
        CategoryRepository $categoryRepository,
        UrlGeneratorInterface $urlGenerator
    ): Response
    {
        $category = $categoryRepository->findAllProjects($id);
        if (!$category)
            throw $this->createNotFoundException('Category not found.');

        $categorySlug = $category->getSlug();
        if ($categorySlug !== $slug) {
            $correctUrl = $urlGenerator->generate('app.front.category.show', ['id' => $id, 'slug' => $categorySlug]);
            return new RedirectResponse($correctUrl, 301);
        }

        return $this->render('frontend/category/index.html.twig', [
            'category' => $category,
            'projects' => $category->getProjects()
        ]);
    }
}
