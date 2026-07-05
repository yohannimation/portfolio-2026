<?php

namespace App\Controller\admin;

use App\Entity\Type;
use App\Form\TypeType;
use App\Repository\TypeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/admin2402/type', name: 'app.admin.type')]
final class AdminTypeController extends AbstractController
{
    public function __construct(
        private readonly EntityManagerInterface $entityManagerInterface
    ) {}

    #[Route('', name: '.index')]
    public function index(TypeRepository $typeRepository): Response
    {
        return $this->render('admin/type/index.html.twig', [
            'types' => $typeRepository->findAll(),
        ]);
    }

    #[Route('/create', name: '.create', methods: ['GET', 'POST'])]
    public function create(Request $request): Response
    {
        $type = new Type;
        
        $form = $this->createForm(TypeType::class, $type);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->entityManagerInterface->persist($type);
            $this->entityManagerInterface->flush();

            $this->addFlash('success', 'Type created');

            return $this->redirectToRoute('app.admin.type.index');
        }

        return $this->render('admin/type/create.html.twig', [
            'form' => $form
        ]);
    }

    #[Route('/edit/{id}', name: '.update', methods: ['GET', 'POST'])]
    public function update(?Type $type, Request $request): Response
    {
        if (!$type) {
            $this->addFlash('error', 'Type not fount');
        }

        $form = $this->createForm(TypeType::class, $type);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->entityManagerInterface->persist($type);
            $this->entityManagerInterface->flush();

            $this->addFlash('success', 'Type updated');

            return $this->redirectToRoute('app.admin.type.index');
        }

        return $this->render('admin/type/update.html.twig', [
            'form' => $form,
        ]);
    }

    #[Route('/delete/{id}', name: '.delete', methods: ['POST'])]
    public function delete(?Type $type, Request $request): RedirectResponse
    {
        if (!$type) {
            $this->addFlash('error', 'Type not found');

            return $this->redirectToRoute('app.admin.type.index');
        }

        if ($this->isCsrfTokenValid('delete' . $type->getId(), $request->request->get('token'))) {
            $this->entityManagerInterface->remove($type);
            $this->entityManagerInterface->flush();

            $this->addFlash('success', 'Type deleted');
        } else {
            $this->addFlash('error', 'Invalid token');
        }

        return $this->redirectToRoute('app.admin.type.index');
    }
}
