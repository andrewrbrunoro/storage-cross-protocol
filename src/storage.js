import Iframe from './iframe';

export default class Storage {

    constructor() {
        this.ready = false;
        this.loading = false;
        this.iframeChannel = null;

        this.setup();
    }

    startLoading () {
        this.loading = true;
    }

    endLoading () {
        this.loading = false;
    }

    setup () {

        if (!this.loading) {

            this.startLoading();

            const {origin} = window.location;
            const iframe = new Iframe(`${origin}/oston.html`);

            window.addEventListener('message', (evt) => {
                if (evt.data && evt.data.type === 'updateStorage') {
                    try {
                        const body = JSON.parse(evt.data.body);
                        if (body) {
                            Object.keys(body).map((key) => localStorage.setItem(key, body[key]));
                        }
                    } catch (e){}
                }
            });

            return iframe.render();
        }
    }

    /**
     * Envia a mensagem para o iframe que está no documento
     */
    sendMessage (key, value, type) {
        if (this.ready) {
            if (type === 'insert')
                this.iframeChannel.postMessage({body: { key, value }, type}, window.location.origin);
            else if (type === 'delete')
                this.iframeChannel.postMessage({body: { key }, type}, window.location.origin);
        } else {
            throw `O Storage ainda não está pronto.`;
        }
    }

    /**
     * Salva o registro no localStorage
     *
     * @param key
     * @param value
     */
    insert (key, value) {
        this.sendMessage(key, value, 'insert');
    }

    /**
     * Remove o item
     *
     * @param key
     */
    remove (key) {
        this.sendMessage(key, null, 'delete');
    }
}
