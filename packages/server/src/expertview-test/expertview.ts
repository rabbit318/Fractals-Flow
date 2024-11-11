import express from 'express'
import { Request, Response } from 'express'
import path from 'path'
import logger from '../utils/logger'
import fs from 'fs'

const router = express.Router()

// Get the source directory path instead of dist
const srcDir = path.resolve(__dirname, '../../src/expertview-test')

// Serve static files from src directory
router.use('/static', express.static(srcDir))

router.get('/:chatflowid', async (req: Request, res: Response) => {
    try {
        // Log request info
        console.log('Request received for chatflowid:', req.params.chatflowid)
        
        const expertViewPath = path.join(srcDir, 'expert-view.html')
        console.log('Attempting to load file from:', expertViewPath)
        
        // Check if file exists
        if (!fs.existsSync(expertViewPath)) {
            console.log('File not found at:', expertViewPath)
            logger.error(`[server]: Expert view file not found at: ${expertViewPath}`)
            return res.status(404).send('Expert view file not found')
        }

        console.log('File found, sending response')
        res.sendFile(expertViewPath)
    } catch (error) {
        console.error('Error in route handler:', error)
        logger.error('[server]: Error serving expert view:', error)
        res.status(500).send('Error loading expert view')
    }
})

export default router