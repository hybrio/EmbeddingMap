import ollama from 'ollama'

// generates embedding for word then stores it in provided word map
export async function storeEmbedding(wordMap, word) {
  if (!wordMap.has(word)) {
    let embedding = await generateEmbedding(word)
    wordMap.set(word, embedding)
  }
}

export async function generateEmbedding(word){
  try {
    const response = await ollama.embeddings({
        "model": "nomic-embed-text",
        "prompt": word,
    })
    return response.embedding
  } catch (error) {
    return error
  }
}