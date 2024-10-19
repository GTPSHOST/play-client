// --- this is a client to post your gtps online count to play.gtpshost.com api
// --- if you want to add your gtps on that site and want to get the api key you should use our bot.

const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const rlinput = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const getOnlineCount = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return parseInt(data.trim(), 10); 
  } catch (err) {
    console.error("error. make sure ur path is correct <3");
    return null;
  }
};
const postOnlineCount = async (keypass, online) => {
  try {
    const response = await axios.post('https://play.gtpshost.com/api/update', {
      keypass: keypass,
      online: online
    }, {
      headers: {
        'Content-Type': 'application/json'
        'To': 'play-api'
      }
    });
    console.log(`Updated :3 | Online : ${online}`);
  } catch (error) {
    console.error("api error detected while trying to post the online count -- : ", error);
  }
};

const startPosting = async () => {
  const keypass = await rlinput("Enter API Key: ");
  const onlineFilePath = await rlinput("path to online counter (e.g., C:/path/to/online.txt): ");

  rl.close();

  const postOnline = () => {
    const online = getOnlineCount(onlineFilePath);
    if (online !== null) {
      postOnlineCount(keypass, online);
    } else {
      console.error("invalid online count.");
    }
  };


  postOnline();
  setInterval(postOnline, 6 * 60 * 1000); // fyi: the ratelimit is 6 minutes. so i add delay
};

startPosting();

      
