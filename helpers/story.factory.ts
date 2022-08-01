import { BURNS, COUNTRIES, CURRENCIES } from '../configurations/story/decorators';
import { BLOCKS } from '../configurations/story/blocks';
import { getBool, getRandom } from './utils';

export class StoryFactory {
    private character = '';
    private personals = 'them';
    private personal = 'they';
    private possessive = 'their';
    private love = '';
    private child = '';

    constructor(name: string) {
        this.character = name;
    }

    private getValue = () =>
        (getRandom(9) * parseInt('1'.padEnd(getRandom(6), '0'), 10)).toString();
    private getDecoration = (decorator: string[]) => decorator[getRandom(decorator.length - 1)];
    private getNoun = (male: string, female: string) => (getBool() ? male : female);

    private initPronouns = () => {
        this.child = this.getNoun('son', 'daughter');
        this.love = this.getNoun('guy', 'girl');
    };

    private constructBlock = (block: string[]) =>
        block[getRandom(block.length) - 1]
            .replace(/§character/g, this.character)
            .replace(/§personals/g, this.personals)
            .replace(/§personal/g, this.personal)
            .replace(/§possessive/g, this.possessive)
            .replace(/§child/g, this.child)
            .replace(/§love/g, this.love)
            .replace(/§country/g, this.getDecoration(COUNTRIES))
            .replace(/§currency/g, this.getDecoration(CURRENCIES))
            .replace(/§burn/g, this.getDecoration(BURNS))
            .replace(/§cost/g, this.getValue())
            .replace(/§years/g, `${getRandom(44, 3)}`);

    public getStory = () => {
        let story = '';

        this.initPronouns();

        for (const block of BLOCKS) {
            story = story + this.constructBlock(block);
        }

        return story;
    };
}
