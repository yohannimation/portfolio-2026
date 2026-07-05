<?php

namespace App\Controller\frontend;

use App\Controller\AbstractApiController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class AboutMeController extends AbstractApiController
{
    #[Route('/api/about-me', name: 'app.api.about-me')]
    public function index(): Response
    {
        return $this->apiResponse([
            'controller_name' => 'AboutMeController',
            'message' => 'About Me content'
        ]);
    }
}
