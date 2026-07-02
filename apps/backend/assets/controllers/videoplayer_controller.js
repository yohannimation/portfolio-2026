import { Controller } from '@hotwired/stimulus';

/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller {
    static targets = ['videoPlayer']
    static values = { url: String, title: String }

    videoPlayerToggle() {
        const container = this.videoPlayerTarget;

        if (container.querySelector('iframe')) {
            // Closing : destroy the iframe
            container.innerHTML = '';
            container.classList.remove('active');
        } else {
            // Opening : creating iframe
            const url = container.dataset.videoplayerUrlValue;
            const title = container.dataset.videoplayerTitleValue;
            
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', this.urlValue);
            iframe.setAttribute('title', this.titleValue);
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            iframe.allowFullscreen = true;
            iframe.loading = 'lazy';

            container.appendChild(iframe);
            iframe.src = url;
            iframe.title = title;
            container.classList.add('active');
        }
    }
}