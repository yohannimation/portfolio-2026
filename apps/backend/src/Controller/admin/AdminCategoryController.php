<?php

namespace App\Controller\admin;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/admin2402/category', name: 'app.admin.category')]
final class AdminCategoryController extends AbstractController
{
    public function __construct(
        private readonly EntityManagerInterface $entityManagerInterface
    ) {}

    #[Route('', name: '.index')]
    public function index(CategoryRepository $categoryRepository): Response
    {
        return $this->render('admin/category/index.html.twig', [
            'categories' => $categoryRepository->findAll(),
        ]);
    }

    #[Route('/create', name: '.create', methods: ['GET', 'POST'])]
    public function create(Request $request): Response
    {
        $category = new Category;
        
        $form = $this->createForm(CategoryType::class, $category);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->entityManagerInterface->persist($category);
            $this->entityManagerInterface->flush();

            $this->addFlash('success', 'Category created');

            return $this->redirectToRoute('app.admin.category.index');
        }

        return $this->render('admin/category/create.html.twig', [
            'form' => $form
        ]);
    }

    #[Route('/edit/{id}', name: '.update', methods: ['GET', 'POST'])]
    public function update(?Category $category, Request $request): Response
    {
        if (!$category) {
            $this->addFlash('error', 'Category not fount');
        }

        $form = $this->createForm(CategoryType::class, $category);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->entityManagerInterface->persist($category);
            $this->entityManagerInterface->flush();

            $this->addFlash('success', 'Category updated');

            return $this->redirectToRoute('app.admin.category.index');
        }

        return $this->render('admin/category/update.html.twig', [
            'form' => $form,
        ]);
    }

    #[Route('/delete/{id}', name: '.delete', methods: ['POST'])]
    public function delete(?Category $category, Request $request): RedirectResponse
    {
        if (!$category) {
            $this->addFlash('error', 'Category not found');

            return $this->redirectToRoute('app.admin.category.index');
        }

        if ($this->isCsrfTokenValid('delete' . $category->getId(), $request->request->get('token'))) {
            $this->entityManagerInterface->remove($category);
            $this->entityManagerInterface->flush();

            $this->addFlash('success', 'Category deleted');
        } else {
            $this->addFlash('error', 'Invalid token');
        }

        return $this->redirectToRoute('app.admin.category.index');
    }
}
