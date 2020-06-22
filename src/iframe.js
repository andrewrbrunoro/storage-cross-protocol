export default class Iframe {

    constructor (link) {
        if (!link)
            throw `Para usar a class Iframe é necessário passar um link`;

        this.link = link;
    }

    append (element) {
        if (!element instanceof HTMLIFrameElement)
            throw `${element} não é um iframe`;

        document.body.appendChild(element);
    }

    mountIframe (resolvePromise) {
        this.iframe = document.createElement('iframe');
        this.iframe.style.display = 'none';
        this.iframe.src = this.link;
        this.iframe.onload = () => {
            resolvePromise(this);
        }
        this.append(this.iframe);
    }

    contentWindow () {
        if (this.iframe instanceof HTMLIFrameElement)
            return this.iframe.contentWindow;

        return null;
    }

    render () {
        return new Promise((resolve) => {
            this.mountIframe(resolve);
        });
    }
}
