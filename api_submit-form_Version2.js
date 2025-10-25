import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const databaseId = "YOUR_NOTION_DATABASE_ID"; // <-- Replace this

  const { name, company, phone, email, workflow, details } = req.body;

  if (!name || !company || !phone || !email || !workflow) {
    res.status(400).json({ success: false, error: "Missing required fields" });
    return;
  }

  try {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Company: { rich_text: [{ text: { content: company } }] },
        Phone: { rich_text: [{ text: { content: phone } }] },
        Email: { email: email },
        Workflow: { multi_select: Array.isArray(workflow) ? workflow.map(w => ({ name: w })) : [{ name: workflow }] },
        Details: { rich_text: [{ text: { content: details || "" } }] }
      }
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}