importScripts('https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.min.js');
importScripts('https://cdn.jsdelivr.net/npm/@xenova/transformers/dist/transformers.min.js');

const modelUrl = 'https://huggingface.co/Xenova/all-MiniLM-L6-v2/resolve/main/onnx/model.onnx';
let session = null;
onmessage = async (e) => {
  if (e.data.type == 'load') {
    try {
      // URL of the ONNX model

      // Configure the path for WebAssembly backend files
      ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/';
      // Load the tokenizer
      tokenizer = await transformers.AutoTokenizer.fromPretrained('Xenova/all-MiniLM-L6-v2');

      // Fetch and load the ONNX model
      session = await ort.InferenceSession.create(modelUrl);
      // Notify the main thread that the model is loaded
      postMessage({ type: 'loaded' });
    } catch (error) {
      // Handle errors and notify the main thread
      postMessage({ type: 'error', data: error.message });
    }
  } else if (e.data.type == 'embed') {
    try {
      const inputText = e.data.text;

      // Tokenize the input text
      const inputs = tokenizer.encode(inputText, { returnTensors: 'ort' });

      // Run the model
      const output = await session.run(inputs);

      // Extract the embedding from the output
      const embedding = output['last_hidden_state'].data;

      // Send the result back to the main thread
      postMessage({ type: 'result', data: embedding });
    } catch (error) {
      postMessage({ type: 'error', data: error.message });
    }
  }
};