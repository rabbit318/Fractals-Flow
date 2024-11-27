import express from 'express'
import { Request, Response } from 'express'
import path from 'path'
import logger from '../utils/logger'
import fs from 'fs'

const router = express.Router()

// Get the source directory path
const srcDir = path.resolve(__dirname, '../../src/expertview-test')

// Serve static files
router.use('/static', express.static(srcDir))

// Serve CSS file
router.get('/expertview-test/expert-view.css', (req: Request, res: Response) => {
    const cssPath = path.join(srcDir, 'expert-view.css')
    res.sendFile(cssPath)
})

// API endpoints for sources and voting
router.get('/api/v1/chatflows/:chatflowid/sources', async (req: Request, res: Response) => {
    try {
        // TODO: Implement source fetching
        res.json([])
    } catch (error) {
        logger.error('[server]: Error fetching sources:', error)
        res.status(500).json({ error: 'Failed to fetch sources' })
    }
})

// Serve the React app for all expert view routes
router.get(['/expertview', '/expertview/*'], (req: Request, res: Response) => {
    try {
        const expertViewPath = path.join(srcDir, 'expert-view.html')
        if (!fs.existsSync(expertViewPath)) {
            logger.error(`[server]: Expert view file not found at: ${expertViewPath}`)
            return res.status(404).send('Expert view file not found')
        }
        res.sendFile(expertViewPath)
    } catch (error) {
        logger.error('[server]: Error serving expert view:', error)
        res.status(500).send('Error loading expert view')
    }
})

export default router