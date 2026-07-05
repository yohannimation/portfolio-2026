<?php

namespace App\Controller\frontend;

use App\Controller\AbstractApiController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class LegalController extends AbstractApiController
{
    #[Route('/api/legal-notices', name: 'app.front.legal')]
    public function index(): Response
    {
        return $this->apiResponse([
            'controller_name' => 'LegalController',
            'message' => 'Legal notices content'
        ]);
    }
}
