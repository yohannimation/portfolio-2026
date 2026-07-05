import { Controller } from '@hotwired/stimulus';

/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller {
    static targets = ['triggerButton']

    connect() {
        this.toggleButtonVisibility = this.toggleButtonVisibility.bind(this);
        window.addEventListener('scroll', this.toggleButtonVisibility);
        this.toggleButtonVisibility();
    }

    disconnect() {
        window.removeEventListener('scroll', this.toggleButtonVisibility);
    }

    scrollToTop() {
        window.scrollTo({ top: 0 });
    }

    toggleButtonVisibility() {
        if (window.scrollY > 200) {
            this.triggerButtonTarget.classList.remove('hidden');
        } else {
            this.triggerButtonTarget.classList.add('hidden');
        }
    }
}
