import { Message } from 'discord.js';
import { readdirSync } from 'fs';
import { Command } from '../interfaces';
import { Collector } from '../storage/collections';
import { reply } from './replies';

const commands = new Collector<Command>();

export const setCommands = () => {
    try {
        const commandList = readdirSync(`${__dirname}/../commands`);

        for (const command of commandList) {
            const commandFile = require(`../commands/${command}`);
            commands.addItem(commandFile.name, commandFile);
        }
    } catch (error) {
        throw error;
    }
};

export const executeCommand = (message: Message, botId = '') => {
    try {
        const args = message.content.split(/ +/g);
        args.shift();
        const command = commands.getItem(args.shift()?.toLowerCase() || '');

        if (message.mentions.members?.first()?.id !== botId) return;

        if (!command) {
            reply(message);

            return;
        }

        command.execute(message, args);
    } catch (error) {
        message.channel.send('There was an error trying to execute that command!');
    }
};

export const getCommandsDescription = () => {
    const reply = ['List of commands:'];

    for (const command of commands.getList()) {
        reply.push(` * ${command.name}`);
    }

    reply.push(`You can send \`help [command name]\` to get info on a specific command!`);

    return reply.join('\n');
};

export const getCommandDescription = (name: string) => {
    const command = commands.getItem(name);

    if (!command) return 'That command does not exist.';

    const reply = [`**Name:** ${command.name}`];
    reply.push(`**Description:** ${command.description}`);
    reply.push(`**Usage:** ${command.name} ${command.usage}`);

    return reply.join('\n');
};
