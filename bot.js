const Discord = require('discord.js');
const prefix = "/";
const client = new Discord.Client();
const bot = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!')
    client.user.setStatus('idle')
    client.user.setPresence({ game: { name: 'En dévéloppement...', type: 0 } });
});

client.on("message", async message => {
    
let args = message.content.split(" ").slice(1);
    
if(message.content.startsWith(prefix + "ban")) {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Je ne sais pas trouver cette personne");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Tu n\'as pas la permission");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Je ne peux pas ban cette personne");

    let banEmbed = new Discord.RichEmbed()
    .setTitle("Ban")
    .setColor("#bc0000")
    .addField("Utilisateur ban", `${bUser}\nID ${bUser.id}`)
    .addField("Banni par", `<@${message.author.id}>\nID ${message.author.id}`)
    .addField("Banni dans", message.channel)
    .addField("Temps", message.createdAt)
    .addField("Reason", bReason);

    let canal = message.guild.channels.find(`name`, "🔩logs");
    if(!canal) return;

    message.guild.member(bUser).ban(bReason);
    canal.send(banEmbed);
}
    
});

client.login(process.env.TOKEN);
