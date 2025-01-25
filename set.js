const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0ZEYTgwQkFWbG5ScmdVUnVtTWJ0ZFJyWStDYk5OeGtsYUdJdWRkUHRuWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT3MvVW5iOGlpQkZ4VTJlRENMNlU3OXVGeWR0bHRxSHdOTFV0cGZ2d2FVST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1TFRYSG5MaUpqaHl6UElrc0xDcGRGcjM1MzlPSXF4TE9ibVJDSGpnaW5FPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaREp1ell4YnhQYkpIMVYxYmdWYm8vTWdacU9FVU91Y1lxdjBSQklVd1FJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhOejMvOWM2MU1XZmJqdDkvcnZidWhUQVpKN3JTN21KTHYrRzVEWVl6ME09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ild5YXhibFNZZ3E1Y1ZYZmM3dWJBN1U5dC92ajdWRkFNSUZzYXQrcEF5Qkk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEJOdndQc2YyZHNKeVI3bFp0WEpsYjJscDFxS1R4TDRXL1IrUU1MWG4wVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid2gxQkdtYzJObFZ5c3Y5UzA3dWRKKzFqRGMvbERuNnVlcGZ4ZkV2a1RCZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlcycVd3Rk1oQzFhdUhjS25oSlRyd2dYZ3NVU0E0cGhta0dkTGk5TFJqaVhMTzh2K0djR2hLeFV2UVhWb1Bnd3doS1lNYzFFdDA4eHJhNThWTVdpamhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAwLCJhZHZTZWNyZXRLZXkiOiJleUVmKy9qYys4SmpOTk1CQWpyN0VlRm43WkVBd2ltQVdLN2ZVMFRrUG9VPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJhLVI5TTg3UlQwNm5nbDViTU83bzRnIiwicGhvbmVJZCI6ImQyOTJmYTBiLTc2ZTQtNDU1OS1hZTczLTUwMjBkMTZlYzllNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwS3g4ZC8wS3BoSlovM3pOckVmSjlybnBwdzA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieFFVUkJwNGhyWmtyVzZXSnhKZUVXSVAxV3l3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlFWUDhYNVZOIiwibWUiOnsiaWQiOiI5MTY5MDk5NTA1ODI6MTdAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tLV3I2QURFSWZQMHJ3R0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkJUMjRPVWlGTDEveG5BbysxOXRYYU42SkJKWFBNZkNvR3JMVU9aNlNYajQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6IllDMC83YmROME53NWZrUHRmNk9NaEdtVGZ0MzJCSitWaksyU3g3ZEJKMXVJZWE3WUswOVh4L1hSaERnNFFVcW5iSzdoTFVxYmFQdWpxQk5OUEc0eURRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJYTzMxc3dwajl4YStwanBocW1STGRDSlVwN2VaSENkd1RlNzN1TUU4WS81aTJCUkpBOHRLbWNMb01vOGF4V1NKeExYelZYazlJanVWSEhYak44MTNoUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxNjkwOTk1MDU4MjoxN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRVTl1RGxJaFM5Zjhad0tQdGZiVjJqZWlRU1Z6ekh3cUJxeTFEbWVrbDQrIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM3Nzk1NDc3fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "◄⏤͟͞➸⃝❥͜͡𝑆𝛩𝑈𝑅𝛥𝐽𝛪𝑇➸⃝⚡",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "◄⏤͟͞➸⃝❥͜͡𝑆𝛩𝑈𝑅𝛥𝐽𝛪𝑇➸⃝⚡",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'SS_◄⏤͟͞➸⃝❥͜͡𝑆𝛩𝑈𝑅𝛥𝐽𝛪𝑇➸⃝⚡',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
