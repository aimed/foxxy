import { observable } from 'mobx';

export class RandomStore {
    @observable
    public rerollCount: number;

    @observable
    public rerollUpdated: Date;

    public setRerollCount(rerollCount: number): void {
        this.rerollCount = rerollCount;
        window.localStorage.setItem('rerollCount', this.rerollCount.toString());
        this.updateRerollCountUpdated();
    }
    
    constructor() {
        this.rerollCount = parseInt(window.localStorage.getItem('rerollCount') || '0', 10);
        const rerollCountUpdatedString = window.localStorage.getItem('rerollCountUpdated');
        if (rerollCountUpdatedString) {
            const updated = new Date(rerollCountUpdatedString);
            if (updated.getDate() !== new Date().getDate()) {
                this.setRerollCount(0);
            }
        }
    }
    
    private updateRerollCountUpdated() {
        this.rerollUpdated = new Date();
        window.localStorage.setItem('rerollCountUpdated', this.rerollUpdated.toString());        
    }
}

export const randomStore = new RandomStore();
