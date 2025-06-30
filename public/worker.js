
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
    const data = e.data;
    const nodes = JSON.parse(data.data || "[]");

    if (task === 'load') {
        // Handle the 'load' task to initialize the model
        try {
            console.log("Loading model...");
            await PipelineSingleton.getInstance((x) => {
                self.postMessage({ status: 'loading', progress: x });
            });
            self.postMessage({ status: 'loaded', model: PipelineSingleton.model });
        } catch (error) {
            console.error("Error loading model:", error);
            self.postMessage({
                status: 'error',
                error: error instanceof Error ? error.message : String(error),
            });
        }
        return;
    }

    if (task === 'process') {
        // Handle the 'process' task to process input text
        try {
            const extractor = await PipelineSingleton.getInstance((x) => {
                self.postMessage({ status: 'processing', progress: x });
            });

            const text = input || "";
            console.log("Processing text length:", text.length, "characters");

            const embeddings = await Promise.all(
                nodes.map(async (node, index) => {
                    if (node.data && node.data.notes) {
                        self.postMessage({
                            status: "processing",
                            progress: `Processing node ${index + 1} of ${nodes.length}`,
                        });
                        const embedding = await extractor(`${node.data.label} ${node.data.notes}`, { pooling: 'mean', normalize: true });
                        return { id: node.id, embedding: Array.from(embedding.data) };
                    } else {
                        console.warn(`Node ${node.id} has no data.notes property.`);
                        return null;
                    }
                })
            );
            
            const embeddingDict = embeddings.reduce((acc, item) => {
                if (item) {
                    acc[item.id] = item.embedding;
                }
                return acc;
            }, {});

            self.postMessage({
                status: "result",
                output: {
                    embedding: embeddingDict,
                }
            });

        } catch (error) {
            console.error("Error in processing:", error);
            self.postMessage({
                status: "error",
                error: error instanceof Error ? error.message : String(error),
            });
        }
    }
};  