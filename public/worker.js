
class PipelineSingleton {
    static task = 'feature-extraction';
    static model = 'Xenova/all-MiniLM-L6-v2';
    static instance = null;
    static transformers = null;

    static async getTransformers() {
        if (!this.transformers) {
            // Dynamic import - this avoids bundling, otherwise you get fun json errors
            this.transformers = await import("https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2");

            this.transformers.env.allowRemoteModels = true;
            this.transformers.env.allowLocalModels = false;
            this.transformers.env.useBrowserCache = false;
        }
        return this.transformers;
    }

    static async getInstance(progress_callback) {
        if (!this.instance) {
            const { pipeline } = await this.getTransformers();

            this.instance = await pipeline(this.task, this.model, {
                progress_callback,
                pooling: 'mean',
                normalize: true
            });
        }
        return this.instance;
    }
}


// Enable CDN mode
self.onmessage = async function (e) {
    const { task, model, input } = e.data;

    console.log("Task:", task);
    console.log("Model:", model);
    console.log("Input:", input);

    try {
        const extractor  = await PipelineSingleton.getInstance((x) => {
            self.postMessage(x);
        });

        const text = e.data.input || "";
        console.log("Processing text length:", text.length, "characters");

        // Get sentence embedding - this handles any length text!
        const output = await extractor(text, { pooling: 'mean', normalize: true });

        console.log("Output shape:", output.dims);
        console.log("Embedding dimensions:", output.data.length);
        console.log("First 10 values:", output.data.slice(0, 10));

        // Convert to regular array for easier use
        const embedding = Array.from(output.data);

        self.postMessage({
            status: "complete",
            output: {
                embedding: embedding,
                dimensions: embedding.length,
                inputLength: text.length,
                model: "all-MiniLM-L6-v2"
            }
        });

    } catch (error) {
        console.error("Error in classification:", error);
        self.postMessage({
            status: "error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};