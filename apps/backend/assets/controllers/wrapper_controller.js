import { Controller } from '@hotwired/stimulus';

/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller {
    static targets = ['wrapper']
    
    toggleWrapper(event) {
        // Close all wrapper opened
        this.wrapperTargets.forEach(wrapper => {
            if (wrapper !== event.currentTarget) {
                wrapper.classList.remove("open");
            }
        });

        // Open the current wrapper
        event.currentTarget.classList.toggle("open");
    }
}
