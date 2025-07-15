const { Client, GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config();
const http = require('http');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
  ],
  partials: [Partials.Channel]
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Your existing welcome message code here
client.on('guildMemberAdd', async (member) => {
  if (member.guild.id !== '1387102987238768783') return;

  const channel = member.guild.channels.cache.get('1387102987238768788');
  if (!channel) return;

  const embed = {
    color: 0x4D7BA7,
    title: '🎓 Welcome to Wisteria Medical Institute!',
    description: `Greetings, <@${member.id}>!\n\nWe’re thrilled to welcome you to **Wisteria Medical Institute** — where knowledge meets compassion.\n\nThank you for choosing us as your academic home. Here, you'll grow, learn, and shape the future of medicine with a supportive and passionate community.\n\n💡 If you need help or have any questions, don’t hesitate to ask!\n\n📽️ [Watch our welcome video](https://www.dropbox.com/scl/fi/m7e8xa674tc6fp8jbdhv0/Video-Jul-13-2025-00-28-27.mp4?rlkey=gshrknyj3pes86l9wfzdcui4x&dl=0)`,
    image: {
      url: 'https://www.dropbox.com/scl/fi/m7e8xa674tc6fp8jbdhv0/Video-Jul-13-2025-00-28-27.mp4?rlkey=gshrknyj3pes86l9wfzdcui4x&raw=1'
    },
    footer: {
      text: 'Wisteria Medical Institute • Est. 2025'
    }
  };

  await channel.send({ embeds: [embed] });
});

// Create a simple HTTP server to keep the app alive on platforms like Render
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Wisteria Medical Institute Bot is running\n');
}).listen(PORT, () => {
  console.log(`🌐 Server listening on port ${PORT}`);
});

client.login(process.env.TOKEN);
