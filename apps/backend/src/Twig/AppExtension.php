<?php

namespace App\Twig;

use Symfony\UX\Icons\IconRendererInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class AppExtension extends AbstractExtension
{
    public function __construct(
        private IconRendererInterface $iconRenderer,
    ) {}

    public function getFilters(): array
    {
        return [
            new TwigFilter('render_icons', [$this, 'renderIcons'], ['is_safe' => ['html']]),
        ];
    }

    public function renderIcons(string $text): string
    {
        return preg_replace_callback('/\[icon:([^\]]+)\]/', function ($matches) {
            $iconName = $matches[1];
            try {
                return $this->iconRenderer->renderIcon($iconName, ['class' => 'icon-xs']);
            } catch (\Exception $e) {
                return $matches[0];
            }
        }, $text);
    }
}
