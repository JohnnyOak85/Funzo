import { Dictionary } from '../interfaces';
import { getList } from '../storage/cache';
import { getBool, getRandom } from '../tools/math';

export class StoryFactory {
    private character = '';
    private personals = 'them';
    private personal = 'they';
    private possessive = 'their';
    private love = '';
    private child = '';
    private decorator: Dictionary<string[]> = {};

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

    private constructBlock = async (block: string[]) =>
        block[getRandom(block.length) - 1]
            .replace(/§burn/g, this.getDecoration(this.decorator.burns))
            .replace(/§character/g, this.character)
            .replace(/§child/g, this.child)
            .replace(/§cost/g, this.getValue())
            .replace(/§country/g, this.getDecoration(this.decorator.countries))
            .replace(/§currency/g, this.getDecoration(this.decorator.currencies))
            .replace(/§love/g, this.love)
            .replace(/§personal/g, this.personal)
            .replace(/§personals/g, this.personals)
            .replace(/§possessive/g, this.possessive)
            .replace(/§years/g, `${getRandom(44, 3)}`);

    public getStory = async () => {
        let story = '';

        this.initPronouns();

        const blocks: string[][] = (await getList('blocks')).map(block => JSON.parse(block));

        this.decorator.burns = await getList('burns');
        this.decorator.countries = await getList('countries');
        this.decorator.currencies = await getList('currencies');

        for (const block of blocks) {
            story = story + this.constructBlock(block);
        }

        return story;
    };
}
