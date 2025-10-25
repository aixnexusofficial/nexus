const express = require('express');
const { Client } = require('@notionhq/client');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const notion = new Client({ auth: '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' });
const databaseId = 'YOUR_NOTION_DATABASE_ID';

app.post('/submit-form', async (req, res) => {
  const { name, company, phone, email, workflow, details } = req.body;
  try {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Company: { rich_text: [{ text: { content: company } }] },
        Phone: { rich_text: [{ text: { content: phone } }] },
        Email: { email: email },
        Workflow: { multi_select: workflow.map(w => ({ name: w })) },
        Details: { rich_text: [{ text: { content: details } }] }
      }
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.body);
    res.status(500).json({ success: false, error: error.body });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});