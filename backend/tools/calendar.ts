import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import path from 'node:path';
import process from 'node:process';
import {authenticate} from '@google-cloud/local-auth';
import {google} from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

const auth = await authenticate({
  scopes: SCOPES,
  keyfilePath: CREDENTIALS_PATH,
});

const calendar = google.calendar({version: 'v3', auth});

/**
 * Lists the next 10 events on the user's primary calendar.
 */
async function listEvents() {
  const result = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
    q: "dinner",
  });
  const events = result.data.items;
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return;
  }
  console.log('Upcoming 10 events:');

  // Print the start time and summary of each event.
  for (const event of events) {
    const start = event.start?.dateTime ?? event.start?.date;
    console.log(`${start} - ${event.summary}`);
  }
}

// await listEvents();

const createCalendarEvent = async ({ title, description, start, end }: { title: string, description?: string, start: string, end: string }) => {
  try {
    const event = {
      summary: title,
      description: description,
      start: {
        dateTime: start,
      },
      end: {
        dateTime: end,
      },
    };

    const result = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    console.log('Event created:', result.data);
  } catch (error) {
    console.error('Error creating event:', error);
  }
};


const calendarServer = new McpServer({
  name: "google-calendar",
  version: "1.0.0",
});


calendarServer.registerTool(
  "create-calendar-event",
  {
    title: "Create Calendar Event",
    description: "Creates a new calendar event",
    inputSchema: z.object({
      title: z.string().describe("The title of the calendar event"),
      description: z.string().optional().describe("The description of the calendar event"),
      start: z.string().describe("The start time of the calendar event"),
      end: z.string().describe("The end time of the calendar event"),
    }),
  },
  async ({ title, description, start, end }) => {
    try {
        await createCalendarEvent({ title, description, start, end });
        return {
          content: [{ 
            type: 'text', 
            text: JSON.stringify({ title, description, start, end }),
            mimeType: 'application/json' 
          }],
        };
      } catch (error) {
        await Bun.write('error.txt', "Error in create-calendar-event tool: " + error);
      }
       return {
          content: [{ 
            type: 'text', 
            text: JSON.stringify([]),
            mimeType: 'application/json' 
          }],
        };
  });

calendarServer.registerTool(
  "list-calendar-events",
  {
  },
  async () => {
    try {
        const events = await listEvents();
        return {
          content: [{ 
            type: 'text', 
            text: JSON.stringify(events),
            mimeType: 'application/json' 
          }],
        };
      } catch (error) {
        await Bun.write('error.txt', "Error in list-calendar-events tool: " + error);
      }
       return {
          content: [{ 
            type: 'text', 
            text: JSON.stringify([]),
            mimeType: 'application/json' 
          }],
        };
  });

const transport = new StdioServerTransport();
console.log("Starting MCP server...");
await calendarServer.connect(transport);


