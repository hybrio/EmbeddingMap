import TSNE from 'tsne-js'
import similarity from 'compute-cosine-similarity'

export async function generateScatterGraphData(words){
    let model = new TSNE({
      dim: 2,
      perplexity: 30.0,
      earlyExaggeration: 4.0,
      learningRate: 1000.0,
      nIter: 300,
      metric: 'euclidean'
    })
    // inputData is a nested array which can be converted into an ndarray
    // alternatively, it can be an array of coordinates (second argument should be specified as 'sparse')
    model.init({
        data: [...words.values()],
        type: 'dense'
    })

    // `error`,  `iter`: final error and iteration number
    // note: computation-heavy action happens here
    let [error, iter] = await model.run()

    for (let i = 0; i < 100; i++) {
        model.rerun()
    }

    // `output` is unpacked ndarray (regular nested javascript array)
    let output = model.getOutput()

    let graphData = {datasets: 
        [...words.keys()].map((key, index) => ({
            label: key,
            data: [{
                x: output[index][0],
                y: output[index][1]
                 }]
            })) 
    };

    return graphData
}

export async function generateRadarGraphData(labels,words){

    let graphData = {
        labels: [...labels.keys()],
        datasets: []
    }
    let location = 0

    words.forEach((wordEmbedding, wordName) => {
        location = graphData.datasets.push({
            label: wordName,
            data: []
        }) - 1;
        labels.forEach((labelEmbedding, labelName)=> (
            graphData.datasets[location].data.push(similarity(wordEmbedding, labelEmbedding))
        ));
    })

    return graphData
}