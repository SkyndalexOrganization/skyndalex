const { MessageEmbed } = require("discord.js");
const r = require("rethinkdb")
module.exports = {
    data: {
        name: "set",
        description: "Bot settings.",
        options: [
            { type: 7, name: "broadcast-channel", description: "Broadcast channel" },
            { type: 7, name: "suggestions-channel", description: "Suggestions channel" },
            { type: 7, name: "complaints-channel", description: "Complaints channel" },
            { type: 7, name: "images-channel", description: "Images channel" },
            { type: 7, name: "welcome-channel", description: "Welcome channel" },
            { type: 7, name: "goodbye-channel", description: "Goodbye channel" },
            { type: 7, name: "applications-channel", description: "Applications channel" },
            { type: 7, name: "vote-channel", description: "Voting channel"},
            { type: 8, name: "moderator-role", description: "Server moderator role [Required for tickets]" },
            { type: 8, name: "muted-role", description: "The role of the muted user" },
            { type: 8, name: "user-role", description: "User role [Required for verification]" },
            { type: 8, name: "auto-role", description: "If a user enters the server, they will automatically get the role set." },
    ],
},

    async execute(client, interaction) {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: "You need permissions: \`MANAGE_CHANNELS\`"});

        for (let option of interaction.options.data) {
            switch (option.name) {
                case "broadcast-channel":
                    const channel = await interaction.options.getChannel("broadcast-channel");

                    if (channel.type === "GUILD_CATEGORY") return interaction.reply({content: "\`Specify a text channel.\`"});
                    if (channel.type === "GUILD_VOICE") return interaction.reply({content: "\`Specify a text channel.\`"});

                    await r.table("settings").insert({ id: interaction.guild.id, broadcastChannel: channel.id }).run(client.con)
                    await r.table("settings").get(interaction.guild.id).update({ broadcastChannel: channel.id }).run(client.con)

                    const embed_Broadcast = new MessageEmbed()
                        .setTitle(client.strings.tools.set.embed_successfully)
                        .setDescription(`${client.strings.tools.set.embed_selected} \`${option.name}\``)
                        .addField(`New value`, `<#${channel.id}>`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    interaction.reply({ embeds: [embed_Broadcast] })
                    break;
                case "suggestions-channel":
                    const channel_suggestions = await interaction.options.getChannel("suggestions-channel");

                    if (channel_suggestions.type === "GUILD_CATEGORY") return interaction.reply({content: "\`Specify a text channel.\`"});
                    if (channel_suggestions.type === "GUILD_VOICE") return interaction.reply({content: "\`Specify a text channel.\`"});

                    await r.table("settings").insert({ id: interaction.guild.id, suggestionsChannel: channel_suggestions.id }).run(client.con)
                    await r.table("settings").get(interaction.guild.id).update({ suggestionsChannel: channel_suggestions.id }).run(client.con)

                    const embed_Suggestions = new MessageEmbed()
                        .setTitle(client.strings.tools.set.embed_successfully)
                        .setDescription(`${client.strings.tools.set.embed_selected} \`${option.name}\``)
                        .addField(`New value`, `<#${channel_suggestions.id}>`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    interaction.reply({ embeds: [embed_Suggestions] })
                    break;
                case "complaints-channel":
                    const channel_complaints = await interaction.options.getChannel("complaints-channel");

                    if (channel_complaints.type === "GUILD_CATEGORY") return interaction.reply({content: "\`Specify a text channel.\`"});
                    if (channel_complaints.type === "GUILD_VOICE") return interaction.reply({content: "\`Specify a text channel.\`"});

                    await r.table("settings").insert({ id: interaction.guild.id, complaintsChannel: channel_complaints.id }).run(client.con)
                    await r.table("settings").get(interaction.guild.id).update({ complaintsChannel: channel_complaints.id }).run(client.con)

                    const embed_Complaints = new MessageEmbed()
                        .setTitle(client.strings.tools.set.embed_successfully)
                        .setDescription(`${client.strings.tools.set.embed_selected} \`${option.name}\``)
                        .addField(`New value`, `<#${channel_complaints.id}>`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    interaction.reply({ embeds: [embed_Complaints] })
                    break;
                case "images-channel":
                    const channel_images = await interaction.options.getChannel("images-channel");

                    if (channel_images.type === "GUILD_CATEGORY") return interaction.reply({content: "\`Specify a text channel.\`"});
                    if (channel_images.type === "GUILD_VOICE") return interaction.reply({content: "\`Specify a text channel.\`"});

                    await r.table("settings").insert({ id: interaction.guild.id, imagesChannel: channel_images.id }).run(client.con)
                    await r.table("settings").get(interaction.guild.id).update({ imagesChannel: channel_images.id }).run(client.con)

                    const embed_Images = new MessageEmbed()
                        .setTitle(client.strings.tools.set.embed_successfully)
                        .setDescription(`${client.strings.tools.set.embed_selected} \`${option.name}\``)
                        .addField(`New value`, `<#${channel_images.id}>`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    interaction.reply({ embeds: [embed_Images] })
                    break;
                case "welcome-channel":
                    const welcome_channel = await interaction.options.getChannel("welcome-channel");

                    if (welcome_channel.type === "GUILD_CATEGORY") return interaction.reply({content: "\`Specify a text channel.\`"});
                    if (welcome_channel.type === "GUILD_VOICE") return interaction.reply({content: "\`Specify a text channel.\`"});

                    await r.table("settings").insert({ id: interaction.guild.id, welcomeChannel: welcome_channel.id }).run(client.con)
                    await r.table("settings").get(interaction.guild.id).update({ welcomeChannel: welcome_channel.id }).run(client.con)

                    const embed_Welcome = new MessageEmbed()
                        .setTitle(client.strings.tools.set.embed_successfully)
                        .setDescription(`${client.strings.tools.set.embed_selected} \`${option.name}\``)
                        .addField(`New value`, `<#${welcome_channel.id}>`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    interaction.reply({ embeds: [embed_Welcome] })
                    break;
                case "goodbye-channel":
                    const channel_goodbye = await interaction.options.getChannel("goodbye-channel");

                    if (channel_goodbye.type === "GUILD_CATEGORY") return interaction.reply({content: "\`Specify a text channel.\`"});
                    if (channel_goodbye.type === "GUILD_VOICE") return interaction.reply({content: "\`Specify a text channel.\`"});

                    await r.table("settings").insert({ id: interaction.guild.id, goodbyeChannel: channel_goodbye.id }).run(client.con)
                    await r.table("settings").get(interaction.guild.id).update({ goodbyeChannel: channel_goodbye.id }).run(client.con)

                    const embed_Goodbye = new MessageEmbed()
                        .setTitle(client.strings.tools.set.embed_successfully)
                        .setDescription(`${client.strings.tools.set.embed_selected} \`${option.name}\``)
                        .addField(`New value`, `<#${channel_goodbye.id}>`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    interaction.reply({ embeds: [embed_Goodbye] })
                    break;
                case "applications-channel":
                    const channel_applications = await interaction.options.getChannel("applications-channel");

                    if (channel_applications.type === "GUILD_CATEGORY") return interaction.reply({content: "\`Specify a text channel.\`"});
                    if (channel_applications.type === "GUILD_VOICE") return interaction.reply({content: "\`Specify a text channel.\`"});

                    await r.table("settings").insert({ id: interaction.guild.id, applicationsChannel: channel_applications.id }).run(client.con)
                    await r.table("settings").get(interaction.guild.id).update({ applicaitonsChannel: channel_applications.id }).run(client.con)

                    const embed_Applications = new MessageEmbed()
                        .setTitle(client.strings.tools.set.embed_successfully)
                        .setDescription(`${client.strings.tools.set.embed_selected} \`${option.name}\``)
                        .addField(`New value`, `<#${channel_applications.id}>`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    interaction.reply({ embeds: [embed_Applications] })
                    break;
                case "vote-channel":
                    const channel_voting = await interaction.options.getChannel("vote-channel");

                    if (channel_voting.type === "GUILD_CATEGORY") return interaction.reply({content: "\`Specify a text channel.\`"});
                    if (channel_voting.type === "GUILD_VOICE") return interaction.reply({content: "\`Specify a text channel.\`"});

                    await r.table("settings").insert({ id: interaction.guild.id, voteChannel: channel_voting.id }).run(client.con)
                    await r.table("settings").get(interaction.guild.id).update({ voteChannel: channel_voting.id }).run(client.con)

                    const embed_Voting = new MessageEmbed()
                        .setTitle(client.strings.tools.set.embed_successfully)
                        .setDescription(`${client.strings.tools.set.embed_selected} \`${option.name}\``)
                        .addField(`New value`, `<#${channel_voting.id}>`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    interaction.reply({ embeds: [embed_Voting] })
                    break;
                }
            }
        }
};