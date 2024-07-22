import express from 'express'
import TSNE from 'tsne-js'
import ollama from 'ollama'

const app = express();
const router = express.Router()

app.use(express.json())

let words = new Map();
let graphData = []

let model = new TSNE({
    dim: 2,
    perplexity: 30.0,
    earlyExaggeration: 4.0,
    learningRate: 100.0,
    nIter: 1000,
    metric: 'euclidean'
})

router.get('/words', (req, res) => {
    res.send([...words.keys()])
})

router.get('/embeddings', (req, res) => {
    res.send([...words.entries()])
})

router.post("/add-words", async (req, res) => {
    const newWords = req.body.words
    for await (const word of newWords) {
        if (!words.has(word)) {
            try {
                const response = await ollama.embeddings({
                    "model": "nomic-embed-text",
                    "prompt": word,
                })
                words.set(word, response.embedding)
            } catch (error) {
                res.status(500).send({ error: error });
            }
        }
    }
    res.send([...words.keys()])
})

router.post("/del-word", (req, res) => {
    const word = req.body.word
    if (words.has(word)) {
        words.delete(word)
    }
    res.send([...words.keys()])
})

router.post('/embed-text', async (req, res) => {
    const { word } = req.body;

    try {
        const response = await ollama.embeddings({
            "model": "nomic-embed-text",
            "prompt": word,
        });

        res.json({
            word: word,
            embedding: response.embedding
        });
    } catch (error) {
        res.status(500).send({ error: error });
    }
})

router.post('/generate-plot', async (req, res) => {
    if (words.size == 0) {
        res.send("no embeddings found")
    }

    try {
        // inputData is a nested array which can be converted into an ndarray
        // alternatively, it can be an array of coordinates (second argument should be specified as 'sparse')
        model.init({
            data: [...words.values()],
            type: 'dense'
        })

        // `error`,  `iter`: final error and iteration number
        // note: computation-heavy action happens here
        let [error, iter] = model.run()

        // `output` is unpacked ndarray (regular nested javascript array)
        let output = model.getOutput()

        graphData = [...words.keys()].map((key, index) => ({
            [key]: output[index] }));

        res.json(graphData);
    } catch (error) {
        res.status(500).send("error");
    }
})

app.use('/api', router);

const port = 3000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})