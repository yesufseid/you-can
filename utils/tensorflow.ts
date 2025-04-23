// src/utils/tensorflow.ts
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

let model: cocoSsd.ObjectDetection | null = null;

export async function loadModel() {
  if (!model) {
    await tf.setBackend('webgl');
    await tf.ready();
    model = await cocoSsd.load();
    console.log("Model loaded!");
  }
}

export async function detectObjects(image: HTMLImageElement, type: string): Promise<number> {
  if (!model) await loadModel();

  const predictions = await model!.detect(image);

  // Filter by class label based on type
  const classLabels: Record<string, string[]> = {
    bottle: ['bottle'],
    bag: ['handbag', 'backpack'],
    cup: ['cup'],
    container: ['bowl', 'box'],
  };

  const matchLabels = classLabels[type] ?? [];

  const matchedObjects = predictions.filter((pred) =>
    matchLabels.includes(pred.class.toLowerCase())
  );

  return matchedObjects.length;
}
