<?php

namespace App\Controller\frontend;

use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController
{
    #[Route('/', name: 'app.front.index')]
    public function index(CategoryRepository $categoryRepository): Response
    {
        return $this->render('frontend/home/index.html.twig', [
            'categories' => $categoryRepository->findAll(),
        ]);
    }
}
