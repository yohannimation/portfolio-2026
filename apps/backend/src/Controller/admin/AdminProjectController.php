<?php

namespace App\Controller\admin;

use App\Entity\Project;
use App\Form\ProjectType;
use App\Repository\ProjectRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/admin2402/project', name: 'app.admin.project')]
final class AdminProjectController extends AbstractController
{
    public function __construct(
        private readonly EntityManagerInterface $entityManagerInterface
    ) {}

    #[Route('', name: '.index')]
    public function index(ProjectRepository $projectRepository): Response
    {
        return $this->render('admin/project/index.html.twig', [
            'projects' => $projectRepository->findAll(),
        ]);
    }

    #[Route('/create', name: '.create', methods: ['GET', 'POST'])]
    public function create(Request $request): Response
    {
        $project = new Project;
        
        $form = $this->createForm(ProjectType::class, $project);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->entityManagerInterface->persist($project);
            $this->entityManagerInterface->flush();

            $this->addFlash('success', 'Project created');

            return $this->redirectToRoute('app.admin.project.index');
        }

        return $this->render('admin/project/create.html.twig', [
            'form' => $form
        ]);
    }

    #[Route('/edit/{id}', name: '.update', methods: ['GET', 'POST'])]
    public function update(?Project $project, Request $request): Response
    {
        if (!$project) {
            $this->addFlash('error', 'Project not fount');
        }

        $form = $this->createForm(ProjectType::class, $project);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->entityManagerInterface->persist($project);
            $this->entityManagerInterface->flush();

            $this->addFlash('success', 'Project updated');

            return $this->redirectToRoute('app.admin.project.index');
        }

        return $this->render('admin/project/update.html.twig', [
            'form' => $form,
        ]);
    }

    #[Route('/delete/{id}', name: '.delete', methods: ['POST'])]
    public function delete(?Project $project, Request $request): RedirectResponse
    {
        if (!$project) {
            $this->addFlash('error', 'Project not found');

            return $this->redirectToRoute('app.admin.project.index');
        }

        if ($this->isCsrfTokenValid('delete' . $project->getId(), $request->request->get('token'))) {
            $this->entityManagerInterface->remove($project);
            $this->entityManagerInterface->flush();

            $this->addFlash('success', 'Project deleted');
        } else {
            $this->addFlash('error', 'Invalid token');
        }

        return $this->redirectToRoute('app.admin.project.index');
    }
}
