const express = require('express');
const { Client } = require('@notionhq/client');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Read Notion configuration from environment variables.
// Do NOT hard-code tokens in source. For local testing, set NOTION_TOKEN and NOTION_DATABASE_ID in your environment.
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID || 'YOUR_NOTION_DATABASE_ID';

if (!NOTION_TOKEN) {
  console.warn('Warning: NOTION_TOKEN is not set; Notion API calls will fail until configured.');
}

const notion = new Client({ auth: NOTION_TOKEN });

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