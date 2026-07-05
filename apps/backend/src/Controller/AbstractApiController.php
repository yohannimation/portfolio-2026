<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

abstract class AbstractApiController extends AbstractController
{
    private SerializerInterface $serializer;

    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    /**
     * Standardized JSON response helper.
     *
     * @param mixed $data The data to serialize
     * @param int $status HTTP status code
     * @param array $groups Serialization groups to apply
     * @param array $context Additional serializer context
     */
    protected function apiResponse(mixed $data, int $status = Response::HTTP_OK, array $groups = [], array $context = []): JsonResponse
    {
        // Merge default context like circular reference handling
        $context = array_merge([
            'circular_reference_handler' => function ($object) {
                return method_exists($object, 'getId') ? $object->getId() : get_class($object);
            },
        ], $context);

        if (!empty($groups)) {
            $context['groups'] = $groups;
        }

        $json = $this->serializer->serialize($data, 'json', $context);

        return new JsonResponse($json, $status, [], true);
    }

    /**
     * Helper for standardized error responses.
     */
    protected function apiError(string $message, int $status = Response::HTTP_BAD_REQUEST, array $extra = []): JsonResponse
    {
        return $this->apiResponse([
            'error' => $message,
            'details' => $extra,
        ], $status);
    }
}
