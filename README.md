# EmbeddingMap
A tool for graphically comparing text embedding data for different words

In the example image below the blue shapre represents the word "king".
The closer it is to the labels on the edge of the graph (like "boy") the more related the words are
<img width="512" alt="image" src="https://github.com/user-attachments/assets/f209ebed-6d2a-44c0-8e46-f70a2c96bd8f">


## Setup

1. first you will need to download ollama

- [Mac Download](https://ollama.com/download/Ollama-darwin.zip)
- [Windows Download](https://ollama.com/download/OllamaSetup.exe)

2. then you will need to pull the `nomic-embed-text` library

```
ollama pull nomic-embed-text
```

3. finally run the webserver
```
npm install
```

```
npm run start
```
