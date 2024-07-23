# EmbeddingMap
a tool for graphing text embedding data

## Setup 
first you will need to download ollama
### macOS

[Download](https://ollama.com/download/Ollama-darwin.zip)

### Windows preview

[Download](https://ollama.com/download/OllamaSetup.exe)

### Linux

```
curl -fsSL https://ollama.com/install.sh | sh
```

then you will need to pull the `nomic-embed-text` library

```
ollama pull nomic-embed-text
```

finally run the webserver
```
npm install
```

```
npm run start
```
