import ollama from 'ollama'

export function embed(words, word, set = false) {
  if (!words.has(word)) {
    try {
        const response = await ollama.embeddings({
            "model": "nomic-embed-text",
            "prompt": word,
        })
        if(set){
          return words.set(word, response.embedding)
        } else {
          return words
        }
        
    } catch (error) {
        res.status(500).send({ error: error });
        return null
    }
  }
}