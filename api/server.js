import { createDirectus, authentication, rest, readItems, readItem, updateItem, login, readCollection, createItem } from '@directus/sdk';


import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 3005;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('../react/out'));


const client = createDirectus('https://directus.cloudfest.dev/').with(rest()).with(authentication());
await client.login('ssoapp@cloudfest.dev', 'aabbccddaabbccddaabbccdd');


async function fetchParticipantsByStatus(status) {
  try {
    const filter = status ? { status: { _eq: status } } : {};
    return await client.request(readItems('participants', { filter }));
  } catch (err) {
    throw new Error(err.message);
  }
}


app.listen(port, () => {
  app.get('/api/users/:status?', async (req, res) => {
    const { status } = req.params;

    try {
      const result = await fetchParticipantsByStatus(status);
      res.json({ users: result });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });


  app.put('/api/users/:status?/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.params;
    const { role } = req.body;

    console.log('id ' + id)
    console.log('status ' + status)
    try {
      const result = await client.request(updateItem('participants', id, { status: status, role: role}))

      console.log('result ' + result)
      if (status === 'approved') {
        const user = await client.request(readItem('participants', id));
        console.log('user ' + user)
        const cloudronAddUserResult = await axios.post('https://my.cloudfest.dev/api/v1/users',
          {
            email: user.email,
            fallbackEmail: "",
            displayName: (user.firstname ? user.firstname : '') + (user.lastname ? ' ' + user.lastname : ''),
            role: user.role
          },
          { headers: { 'Authorization': 'Bearer 53c0c88fb22668e1c81ea328df6af94c3f9d8a595f1fa97c50c9cd62a0c421a0', 'Content-Type': 'application/json;charset=UTF-8' } }
        );
        console.log('cloudron added status ' + cloudronAddUserResult.status);
        console.log('cloudron id ' + cloudronAddUserResult.data.id);

        const email_result = await axios.post('https://my.cloudfest.dev/api/v1/users/' + cloudronAddUserResult.data.id + '/send_invite_email',
          { email: user.email },
          { headers: { 'Authorization': 'Bearer 53c0c88fb22668e1c81ea328df6af94c3f9d8a595f1fa97c50c9cd62a0c421a0', 'Content-Type': 'application/json;charset=UTF-8' } }
        );

        console.log('email sent ' + email_result);

      }

      res.send(
        {
          response: result,
          newStatus: status
        });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.put('/api/users', async (req, res) => {
    let user = req.body;
    user.status = 'pending';
    user.role = 'user';

    const filter = user.email ? { email: { _eq: user.email } } : {};
    const userExists = await client.request(readItems('participants', { filter }));

    if (userExists.length > 0) {
      res.status(501).send('Email already exists');
      return;
    }

    try {
      const result = await client.request(createItem('participants',
        user
      ));

      res.json({ users: result });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
});  