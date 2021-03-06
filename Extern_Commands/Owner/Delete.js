const config = require('../Assets/config.json');
const group = require('../Assets/Groups');
const AppendError = require('../Assets/AppendError');
const name = 'delete';
group.get("Owner Commands").push(name);
module.exports = {
    name: name,
    description: 'deletes the given amount of messages',
    usage: '!delete *Amount*',
    async execute(message, args) {
        try {
            //als de message komt van de owner kan hij verder
            if (message.author.id === config.UserId) {
                if (!args[0]) {
                    await message.reply('Please enter the amount of messages to clear!');
                } else if (isNaN(args[0])) {
                    await message.reply('Please type a real number!');
                } else if (args[0] > 100) {
                    await message.reply('You can\'t remove more than 100 messages!');
                } else if (args[0] < 1) {
                    await message.reply('You have to delete at least one message!');
                } else {
                    //hij fetch de messages die niet ouder zijn dan 2 weken dan geeft hij de limit erop die is meeggeven en dan bulk delete ik die messages
                    await message.channel.messages.fetch({limit: args[0]}).then(messages => {
                        message.channel.bulkDelete(messages)
                    });
                }
            } else {
                message.channel.send("You dont have the rights to preform this action.")
            }
        } catch (error) {
            AppendError(error + " " + "Delete.js")
        }
    }
}