<?php

namespace App\Controller\frontend;

use App\Repository\CategoryRepository;
use App\Controller\AbstractApiController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractApiController
{
    #[Route('/api', name: 'app.front.index')]
    public function index(CategoryRepository $categoryRepository): Response
    {
        return $this->apiResponse(
            "API OK",
            Response::HTTP_OK,
            ['api:read']
        );
    }
}
