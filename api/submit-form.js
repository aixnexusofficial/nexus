const { Client } = require('@notionhq/client');

// Vercel serverless function (Node) — POST JSON to create a Notion page.
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { name, company, phone, email, workflow = [], details } = req.body || {};
  // Log payload presence for debugging (do not log sensitive values)
  console.log('submit-form payload:', {
    hasName: !!name,
    hasCompany: !!company,
    hasPhone: !!phone,
    hasEmail: !!email,
    workflowCount: Array.isArray(workflow) ? workflow.length : 0,
    hasDetails: !!details
  });

  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Missing required fields: name and email' });
  }

  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
  if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
    console.error('Notion integration not configured; NOTION_TOKEN present=', !!NOTION_TOKEN, 'NOTION_DATABASE_ID present=', !!NOTION_DATABASE_ID);
    return res.status(500).json({ success: false, error: 'Notion integration not configured on server (missing env vars)' });
  }

  const notion = new Client({ auth: NOTION_TOKEN });

  try {
    await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Name: { title: [{ text: { content: String(name) } }] },
        Company: { rich_text: [{ text: { content: String(company || '') } }] },
        Phone: { rich_text: [{ text: { content: String(phone || '') } }] },
        Email: { email: String(email) },
        Workflow: { multi_select: Array.isArray(workflow) ? workflow.map(w => ({ name: String(w) })) : [{ name: String(workflow) }] },
        Details: { rich_text: [{ text: { content: String(details || '') } }] }
      }
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Notion API error:', err);
    const errorBody = (err && err.body) || err.message || String(err);
    // Return the Notion error details to the caller for debugging
    return res.status(500).json({ success: false, error: errorBody });
  }
};
const { Client } = require('@notionhq/client');

// Vercel serverless function to accept contact form submissions and write to Notion.
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { name, company, phone, email, workflow = [], details } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Missing required fields: name and email' });
  }

  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
    return res.status(500).json({ success: false, error: 'Notion integration not configured (set NOTION_TOKEN and NOTION_DATABASE_ID)' });
  }

  const notion = new Client({ auth: NOTION_TOKEN });

  try {
    await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Name: { title: [{ text: { content: String(name) } }] },
        Company: { rich_text: [{ text: { content: String(company || '') } }] },
        Phone: { rich_text: [{ text: { content: String(phone || '') } }] },
        Email: { email: String(email) },
        Workflow: { multi_select: Array.isArray(workflow) ? workflow.map(w => ({ name: String(w) })) : [{ name: String(workflow) }] },
        Details: { rich_text: [{ text: { content: String(details || '') } }] }
      }
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Notion API error:', err);
    const errorBody = (err && err.body) || err.message || String(err);
    return res.status(500).json({ success: false, error: errorBody });
  }
};
const { Client } = require('@notionhq/client');

// Vercel Node serverless function — receives POST JSON and creates a Notion page.
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { name, company, phone, email, workflow = [], details } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Missing required fields: name and email' });
  }

  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
    return res.status(500).json({ success: false, error: 'Notion integration not configured (set NOTION_TOKEN and NOTION_DATABASE_ID)' });
  }

  const notion = new Client({ auth: NOTION_TOKEN });

  try {
    await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Name: { title: [{ text: { content: String(name) } }] },
        Company: { rich_text: [{ text: { content: String(company || '') } }] },
        Phone: { rich_text: [{ text: { content: String(phone || '') } }] },
        Email: { email: String(email) },
        Workflow: { multi_select: Array.isArray(workflow) ? workflow.map(w => ({ name: String(w) })) : [{ name: String(workflow) }] },
        Details: { rich_text: [{ text: { content: String(details || '') } }] }
      }
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Notion API error:', err);
    const errorBody = (err && err.body) || err.message || String(err);
    return res.status(500).json({ success: false, error: errorBody });
  }
};
