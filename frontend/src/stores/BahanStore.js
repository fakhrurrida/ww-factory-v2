import { extendObservable } from 'mobx';

class BahanStore{
    constructor(){
        extendObservable(this, {
            hasil: []
        })
    }
}

export default new BahanStore();