import { createClient } from 'redis';

const quotesArray = `["> You can always count on me to not read the entire text and blurt some brain fart at y'all <:praise_sun:670297733038604322> \n *Nazzikene 2022*","> A cat girl milf is called a cougar \n *Alexis 2022*","> If life doesn't give you lemons, rob a lemonade stand! \n *Alexis 2022*","> Hamsters are overrated \n *Alexis 2020*","> Pineapple belongs on pizza \n *Alexis 2020*","> 9/11 was a great job \n *Alexis 2020*","> Stephen King likes pedophilia \n *Alexis 2020*","> Be the master of your own destiny \n *Alexis 2020*","> Stephen King, the pedo, was on drugs for some of his books \n *Alexis 2020*","> He *(Stephen King)* was definitely on drugs for some of his books, that's a fact \n *Alexis 2020*","> Stephen King was snorting lines of cocaine from the ass of an underage boy \n *Alexis 2020*","> It's better when the hot juice pops in your mouth \n *Alexis 2020*","> I hated geometry in school \n *Alexis 2020*","> You know what sucks? The Berlin wall falling down 30 years ago. \n *Alexis 2020*"]`;

const client = createClient();

export const getValue = async (key: string) => await client.get(key);

const start = async () => {
    await client.connect();

    await client.set('quotes', quotesArray.replace(/\n/g, '$br'));
    const value = await client.get('quotes');

    if (!value) return;

    const arr = JSON.parse(value);

    const quote = arr[Math.floor(Math.random() * (arr.length - 1 + 1) + 1) - 1];

    console.log(quote.replace('$br', '\n'));
};

start();
