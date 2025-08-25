# litllm

14.285714 (repeating of course) percent fewer letters than litellm.

```js
word2vec("litellm") - word2vec("🐍") + word2vec("🤯") === word2vec("litllm") // probably
```

## Setup

```bash
npm i litllm
```

### OpenAI:

lit.js:

```js
const { completion } = require("litllm");
process.env["OPENAI_API_KEY"] = "sk-wouldntyouliketoknow";
completion("gpt-4", [{ role: "user", content: "What's lit?" }]).then((res) => {
  console.log(res.message.content);
});
```

### Anthropic:

lit.js:

```js
const { completion } = require("litllm");
process.env["ANTHROPIC_API_KEY"] = "sk-ant-wouldntyouliketoknow";
completion("claude-2", [{ role: "user", content: "What's lit?" }]).then((res) => {
  console.log(res.message.content);
});
```

### Llama Models (via OpenAI-compatible API):

lit.js:

```js
const { completion } = require("litllm");
process.env["LLAMA_API_BASE"] = "http://localhost:8000/v1"; // Your Llama API endpoint
completion("llama-3.1-70b", [{ role: "user", content: "What's lit?" }]).then((res) => {
  console.log(res.message.content);
});
```

## Run

```bash
node lit.js
```

## The lit family

- [litellm](https://github.com/BerriAI/litellm)
- [LangChain.js](https://github.com/langchain-ai/langchainjs)
- [StreamLit](https://github.com/streamlit/streamlit)
- [lighttpd](https://github.com/lighttpd)
- Submit PR to add your 🔥 package
