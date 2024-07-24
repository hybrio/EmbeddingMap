import express from 'express'
import { storeEmbedding, generateEmbedding } from './ollama.js'
import { generateScatterGraphData, generateRadarGraphData } from './plot.js'

const app = express();
const router = express.Router()

app.use(express.json())
app.use(express.static('public'))

let words = new Map();
let labels = new Map();

router.get('/words', (req, res) => {
    res.send([...words.keys()])
})

router.get('/labels', (req, res) => {
    res.send([...labels.keys()])
})

router.get('/embeddings', (req, res) => {
    res.send({
        words: [...words.entries()],
        labels: [...labels.entries()]
        })
})

router.post("/add-words", async (req, res) => {
    const newWords = req.body.words
    for await (const word of newWords) {
        await storeEmbedding(words, word)
    }
    res.send([...words.keys()])
})

router.post("/add-word", async (req, res) => {
    const word = req.body.input
    storeEmbedding(words, word).then(() => {
        res.send([...words.keys()])
    })
})

router.post("/del-word", (req, res) => {
    const word = req.body.input
    if (words.has(word)) {
        words.delete(word)
    }
    res.send([...words.keys()])
})

router.post("/add-label", async (req, res) => {
    const label = req.body.input
    storeEmbedding(labels, label).then(() => {
        res.send([...labels.keys()])
    })
})

router.post("/del-label", (req, res) => {
    const label = req.body.input
    if (labels.has(label)) {
        labels.delete(label)
    }
    res.send([...labels.keys()])
})

router.post('/embed-text', async (req, res) => {
    const { word } = req.body;
    let embedding = await generateEmbedding(word)
    res.json({
            word: word,
            embedding: embedding
        });
})

router.get('/generate-scatter-plot', async (req, res) => {
    if (words.size == 0) {
        res.send({error: "no embeddings found"})
    } else {
        let data = await generateScatterGraphData(words)
        res.json(data)
    }
})

router.get('/generate-radar-plot', async (req, res) => {
    if (words.size == 0) {
        res.send({error: "no embeddings found"})
    } else {
        let data = await generateRadarGraphData(labels,words)
        res.json(data)
    }
})

app.use('/api', router);

const port = 3000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})