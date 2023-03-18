const fs = require('fs');
const { AudioContext, AudioBuffer } = require('web-audio-api');
const audioContext = new AudioContext();

// Генерация файлов рандомного звука дождя

function generateRainSound(duration, intensity) {
  const bufferSize = audioContext.sampleRate * duration;
  const buffer = audioContext.createBuffer(
    2,
    bufferSize,
    audioContext.sampleRate
  );
  const dataL = buffer.getChannelData(0);
  const dataR = buffer.getChannelData(1);

  const baseFrequency = 200 + Math.random() * 200;
  const frequencyVariation = 50 + Math.random() * 50;
  const baseAmplitude = (intensity + Math.random() * 0.2) * 0.6;
  const amplitudeVariation = intensity * 0.2 + Math.random() * 0.1;

  let t = 0;
  let amplitude = baseAmplitude + (Math.random() * 2 - 1) * amplitudeVariation;
  let frequency = baseFrequency + (Math.random() * 2 - 1) * frequencyVariation;

  const raindropVolume = intensity * 0.2 + Math.random() * 0.1;
  const pitterPatterVolume = intensity * 0.1 + Math.random() * 0.06;
  const rumbleVolume = intensity * 0.1 + Math.random() * 0.06;
  const lightningVolume = intensity * 0.2 + Math.random() * 0.1;

  let isLightning = false;
  let lightningStart = 0;
  let lightningDuration = 0;
  let lightningAmplitude = 0;

  for (let i = 0; i < bufferSize; i++) {
    // Rain sounds
    const raindrop = raindropVolume * Math.sin(2 * Math.PI * frequency * t);
    const pitterPatter =
      pitterPatterVolume *
      Math.sin(2 * Math.PI * (frequency + 500 * Math.random()) * t);
    const rumble =
      rumbleVolume *
      (Math.sin(2 * Math.PI * 50 * t) + Math.sin(2 * Math.PI * 30 * t));

    // Lightning sounds
    if (isLightning) {
      const timeSinceLightning = t - lightningStart;
      if (timeSinceLightning < lightningDuration) {
        const lightning =
          lightningAmplitude *
          Math.sin(
            2 * Math.PI * (400 + 800 * Math.random()) * timeSinceLightning
          );
        dataL[i] = (raindrop + pitterPatter + rumble + lightning) * amplitude;
        dataR[i] =
          (raindrop + pitterPatter + rumble + lightning) * amplitude * 0.8;
        continue;
      } else {
        isLightning = false;
      }
    }

    dataL[i] = (raindrop + pitterPatter + rumble) * amplitude;
    dataR[i] = (raindrop + pitterPatter + rumble) * amplitude * 0.8;

    t += 1 / audioContext.sampleRate;

    if (Math.random() < 0.05) {
      amplitude = baseAmplitude + (Math.random() * 2 - 1) * amplitudeVariation;
    }
    if (Math.random() < 0.1) {
      frequency = baseFrequency + (Math.random() * 2 - 1) * frequencyVariation;
    }

    // Generate lightning randomly
    if (!isLightning && Math.random() < 0.02) {
      isLightning = true;
      lightningStart = t;
      lightningDuration = 0.05 + Math.random() * 0.2;
      lightningAmplitude = lightningVolume * (0.5 + Math.random() * 0.5);
    }
  }

  return buffer;
}

function encodeWAV(buffer) {
  if (!(buffer instanceof AudioBuffer)) {
    throw new Error('Argument must be an instance of AudioBuffer');
  }

  const numChannels = 1;
  const sampleRate = buffer.sampleRate;
  const bytesPerSample = 2;
  const blockAlign = bytesPerSample * numChannels;
  const totalLength = buffer.length * blockAlign;

  const arrayBuffer = new ArrayBuffer(44 + totalLength);
  const dataView = new DataView(arrayBuffer);

  writeString(dataView, 0, 'RIFF');
  dataView.setUint32(4, 36 + totalLength, true);
  writeString(dataView, 8, 'WAVE');
  writeString(dataView, 12, 'fmt ');
  dataView.setUint32(16, 16, true);
  dataView.setUint16(20, 1, true);
  dataView.setUint16(22, numChannels, true);
  dataView.setUint32(24, sampleRate, true);
  dataView.setUint32(28, sampleRate * blockAlign, true);
  dataView.setUint16(32, blockAlign, true);
  dataView.setUint16(34, 16, true);
  writeString(dataView, 36, 'data');
  dataView.setUint32(40, totalLength, true);

  const bufferView = new DataView(arrayBuffer, 44);
  for (let i = 0; i < buffer.length; i++) {
    const index = i * blockAlign;
    const sample = Math.floor(buffer.getChannelData(0)[i] * 32767);
    bufferView.setInt16(index, sample, true);
  }

  return arrayBuffer;
}

function writeString(dataView, offset, string) {
  for (let i = 0; i < string.length; i++) {
    dataView.setUint8(offset + i, string.charCodeAt(i));
  }
}

async function generateRainSounds(numSounds, duration, intensity) {
  for (let i = 1; i <= numSounds; i++) {
    const buffer = generateRainSound(duration, intensity);
    const arrayBuffer = encodeWAV(buffer);

    const fileName = `rain-${i}.wav`;
    await new Promise((resolve, reject) => {
      fs.writeFile(`sounds/${fileName}`, Buffer.from(arrayBuffer), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    console.log(`Generated ${fileName}`);
  }
}

generateRainSounds(5, 5, 0.1)
  .then(() => console.log('Done'))
  .catch((err) => console.error(err));
