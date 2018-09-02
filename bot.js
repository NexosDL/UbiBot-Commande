const Discord = require('discord.js');
const prefix = "/";
const client = new Discord.Client();
const bot = new Discord.Client();
const ms = require("ms");

client.on('ready', () => {
    console.log('I am ready!')
    client.user.setPresence({ game: { name: 'En dévéloppement...', type: 0 } });
});

bot.on("guildMemberRemove", member => {
    const baur = member.guild.channels.get("482288985134071809")
    if (!baur) return;
    const embed = new Discord.RichEmbed()
    .setColor('#f44242')
    .setAuthor(member.user.tag)
    .setThumbnail(member.user.avatarURL)
    .setDescription("Merci d'être venu, au revoir")
    .addField(`Nombre de membres après qu'il a quitté`, member.guild.memberCount)
    .setTimestamp()
    baur.send(embed)
})

client.on("message", async message => {
    
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(prefix)) return;
    
let args = message.content.split(" ").slice(1);
    
if(message.content.startsWith(prefix + "staff")) {
    const embed = new Discord.RichEmbed()
    .setAuthor("Liste des membres du staff", "https://media.discordapp.net/attachments/402932220458696742/482132251530887188/CameraStudoi.png?width=473&height=474")
    .setColor("#f47142")
    .addField("Administrateurs", "    - So_Skill\n    - Laarm")
    .addField("Managers", "    - eиıмøx")
    .addField("Développeurs bot", "    - Cecemel_PvP\n    - F/A Nexøs")
    message.channel.send(embed)
}
    
if(message.content.startsWith(prefix + "join")) {
    if(message.channel.id !== "482291107275866112") return message.reply("Tu n'es pas dans le bon salon");
    const role2 = message.guild.roles.get("482531843921674262");
    const role = message.guild.roles.get("482291949852819497");
    message.member.addRole(role).catch(console.error);
    message.member.removeRole(message.author.guild.roles.find('name', 'Nouveau')).catch(console.error);
    message.delete()
    message.author.send("Bienvenue sur le serveur UbiMedia, tu as bien été enregistré, bonne continuation");
}
    
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
   
if(message.content.startsWith(prefix + "mute")) {
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Je ne peux pas trouver l'utilisateur");
  let muterole = message.guild.roles.find(`name`, "muté");
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muté",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutetime = args[1];
  if(!mutetime) return message.reply("Tu n\'as pas spécifié un temps");
  if(!message.guild.channels.find("name", "🔩logs")) return message.reply("Le salon #logs n'éxiste pas");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> a été mute pour ${ms(ms(mutetime))}`);
  
  const emb = new Discord.RichEmbed()
  .setTitle("Mute")
  .addField("Utilisateur mute", tomute.tag)
  .addField("Mute par", message.author.tag)
  .addField("Mute dans", message.channel.name)
  .addField("Temps", ms(ms(mutetime)))
  .addField("Raison", args[2] + args[3] + args[4] + args[5])
  
  message.guild.channels.find("name", "logs").send(emb)

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> a été unmute!`);
  }, ms(mutetime));


}
  
if(message.content.startsWith(prefix + "report")) {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Je ne peux pas trouver l\'utilisateur");
    let rreason = args.join(" ").slice(22);
    if(!rreason) return message.reply("Donne un argument");

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Utilisateur report", `Pseudo: ${rUser}\nID: ${rUser.id}`)
    .addField("Report par", `Pseudo: ${message.author}\nID: ${message.author.id}`)
    .addField("Salon", message.channel)
    .addField("Temps", message.createdAt)
    .addField("Reason", rreason);

    if(rUser.id === message.author.id) return message.reply("Tu ne peux pas te report!");
    let reportschannel = message.guild.channels.find(`name`, "🔩logs");
    if(!reportschannel) return message.channel.send("Je ne peux pas trouver le salon #🔩logs");
    message.reply(`Tu as bien report ${rUser}`)


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

}
    
if(message.content.startsWith(prefix + "regl4586585")) {
    const embed = new Discord.RichEmbed()
    .setImage("https://cdn.discordapp.com/attachments/480871365994348544/481914307043524648/Reglement.png")
    .setImage("https://media.discordapp.net/attachments/480871365994348544/481914418037522432/Reglement.png?width=440&height=474");
    message.channel.send(embed)
    message.delete();
}
    
if(message.content.startsWith(prefix + "help")) {
    const embed = new Discord.RichEmbed()
    .setTitle("Commande d'aide")
    .setTitle("Prefix: `/`")
    .setDescription("   `help`, `ban`, `kick`, `mute`, `report`");
    message.delete()
    message.channel.send(embed);
}
if(message.content.startsWith(prefix + "ttuuoo")) {
  const embed = new Discord.RichEmbed()
  .setImage("https://cdn.discordapp.com/attachments/481940647469907969/481946087813414912/Rejoindre_le_serveur_.png")
  .setDescription("Pour rejoindre le reste de la communauté, il suffit exécuter cette commande-ci: **_/join_**\nCette commande vous attribuera le rôle Spectateur\n\nCette commande à été ajouté le **_23/08/2018_** et mise à jour le **_23/08/2018_**\nLes mises à jour seront annoncer ici même.\n\n- Veuillez lire le message dans #😃bienvenue");

    
  message.delete()
  message.channel.send(embed)
}    
    if(message.content.toLowerCase().includes("laarm")) {
    message.react("448107939824140299");
}
    
});

client.login(process.env.TOKEN);
