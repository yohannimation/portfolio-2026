<?php

namespace App\Controller\frontend;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class LegalController extends AbstractController
{
    #[Route('/legal-notices', name: 'app.front.legal')]
    public function index(): Response
    {
        return $this->render('frontend/legal/index.html.twig', [
            'controller_name' => 'LegalController',
        ]);
    }
}
