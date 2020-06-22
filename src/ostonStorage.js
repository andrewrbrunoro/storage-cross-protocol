import Storage from './storage';

const store = new Storage();

export default {

    setItem (key, value) {
        store.insert(key, value);
    },

    removeItem () {

    }

}
