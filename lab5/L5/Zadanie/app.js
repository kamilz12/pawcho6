const express = require('express');
const os = require('os');

const app = express();

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  let address = 'unknown';
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        address = iface.address;
        break;
      }
    }
    if (address !== 'unknown') break;
  }
  return address;
}

const version = process.env.VERSION;
const hostname = os.hostname();
const ipAddress = getLocalIp();

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>PAwChO App</title>
      </head>
      <body>
        <h1>PAwChO App</h1>
        <p>Adres IP serwera: ${ipAddress}</p>
        <p>Nazwa hosta: ${hostname}</p>
        <p>Wersja aplikacji: ${version}</p>
      </body>
    </html>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log (version);
  console.log(`Serwer działa na porcie ${port}`);
});
