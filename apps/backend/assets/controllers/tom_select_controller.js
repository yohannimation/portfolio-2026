import { Controller } from '@hotwired/stimulus';
import TomSelect from 'tom-select';

export default class extends Controller {
    connect() {
        console.log('TomSelect controller connecting to:', this.element);

        if (this.element.tomselect) {
            console.log('TomSelect already initialized on this element');
            return;
        }

        try {
            const ts = new TomSelect(this.element, {
                create: true,
                onCreate: function(value) {
                    return {
                        value: value,
                        text: value
                    };
                }
            });
            console.log('TomSelect initialized successfully:', ts);
        } catch (e) {
            console.error('TomSelect initialization failed:', e);
        }
    }

    disconnect() {
        if (this.element.tomselect) {
            this.element.tomselect.destroy();
            console.log('TomSelect destroyed');
        }
    }
}
