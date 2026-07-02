import { Controller } from '@hotwired/stimulus';

/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller {
    static targets = ['email']
    // ...

    emailClicked() {
        navigator.clipboard.writeText("renauldyohann@gmail.com");

        this.emailTarget.classList.toggle("active");

        setTimeout(() => {
            this.emailTarget.classList.toggle("active");
        }, 1500)
    }
}
