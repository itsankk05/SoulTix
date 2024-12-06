const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const CLIENT_ID = '552366a516f2483caccc7e19b23cb67a';
const CLIENT_SECRET = '719fa2e3defd43ff8fb8fa20408826e5';
const REDIRECT_URI = 'http://localhost:3000/callback';

app.post('/api/spotify-token', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = response.data;
    res.json({ accessToken: access_token });
  } catch (error) {
    console.error('Error exchanging token:', error);
    res.status(500).send('Error fetching access token');
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
