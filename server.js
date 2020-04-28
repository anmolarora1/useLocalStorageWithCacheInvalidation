const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/stream', (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };
  res.writeHead(200, headers);

  console.log('Client added!');

  let count = 0;
  const intervalId = setInterval(() => {
    if (count > 10) {
      clearInterval(intervalId);
    } else {
      res.write('data: { "invalidateCache": true }\n\n');
      console.log('Invalidation Request sent!', count);
      count += 1;
    }
  }, 5000);

  req.on('close', () => {
    console.log('Client removed!');

    clearInterval(intervalId);
  });
});
const port = process.env.PORT || 3001;

app.listen(port, () => { console.log(`Listening on port ${port}`); });
