import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export interface RegisteredMCP {
    id: string;
    type: string;
    location: string;
    name: string;
    description: string;
    local: boolean;
    active: boolean;
}

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const saveDataFileName = 'registeredMCPs.json';
let registeredMCPs: RegisteredMCP[] = [];

// Helper function to load data on startup
const loadData = async () => {
    const savedDataFile = Bun.file(saveDataFileName);
    // Corrected: We check if it DOES exist, rather than if it doesn't
    if (await savedDataFile.exists()) {
        try {
            registeredMCPs = await savedDataFile.json();
        } catch (error) {
            console.error("Error reading JSON file, starting with empty array.", error);
            registeredMCPs = [];
        }
    }
};

// Helper function to save data after mutations
const saveData = async () => {
    await Bun.write(saveDataFileName, JSON.stringify(registeredMCPs, null, 2));
};

// ==========================================
// REST API Routes
// ==========================================

// CREATE: Add a new MCP
app.post('/mcp', async (req: Request, res: Response) => {
    const newMCP: RegisteredMCP = req.body;

    newMCP.id = uuidv4();

    // Check for duplicates
    if (registeredMCPs.find(m => m.id === newMCP.id)) {
        return res.status(409).json({ error: `MCP with id ${newMCP.id} already exists.` });
    }

    registeredMCPs.push(newMCP);
    await saveData();
    
    res.status(201).json(newMCP);
});

// READ: Get all MCPs
app.get('/mcp', (req: Request, res: Response) => {
    res.json(registeredMCPs);
});

// READ: Get a single MCP by ID
app.get('/mcp/:id', (req: Request, res: Response) => {
    const mcp = registeredMCPs.find(m => m.id === req.params.id);
    if (!mcp) {
        return res.status(404).json({ error: 'MCP not found' });
    }
    res.json(mcp);
});

// UPDATE: Update an existing MCP
app.put('/mcp/:id', async (req: Request, res: Response) => {
    const index = registeredMCPs.findIndex(m => m.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'MCP not found' });
    }

    // Update the record, ensuring the ID from the URL isn't overwritten
    const updatedMCP = { ...registeredMCPs[index], ...req.body, id: req.params.id };
    registeredMCPs[index] = updatedMCP;
    
    await saveData();
    res.json(updatedMCP);
});

// DELETE: Remove an MCP
app.delete('/mcp/:id', async (req: Request, res: Response) => {
    const index = registeredMCPs.findIndex(m => m.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'MCP not found' });
    }

    registeredMCPs.splice(index, 1);
    await saveData();
    
    res.status(204).send(); // 204 No Content is standard for successful deletion
});

// ==========================================
// Initialize and Start Server
// ==========================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    await loadData();
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Loaded ${registeredMCPs.length} MCPs from disk.`);
});