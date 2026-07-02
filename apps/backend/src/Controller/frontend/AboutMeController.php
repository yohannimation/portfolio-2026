<?php

namespace App\Controller\frontend;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class AboutMeController extends AbstractController
{
    #[Route('/about-me', name: 'app.front.about-me')]
    public function index(): Response
    {
        return $this->render('frontend/about_me/index.html.twig', [
            'controller_name' => 'AboutMeController',
        ]);
    }
}
