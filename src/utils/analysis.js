export function analyzeScreenplay(text) {
  const lines = text.split('\n');
  let speakers = new Set();
  let totalWords = 0;
  let inDialogue = false;
  let currentScene = 1;
  const characterRelations = new Map();
  let currentSpeaker = null;

  // Enhanced reading time calculation weights
  const READING_RATES = {
    dialogue: 150,   // Fast-paced dialogue
    action: 100,     // Moderate action descriptions
    description: 75  // Dense scene descriptions
  };

  lines.forEach(line => {
    const trimmed = line.trim();
    
    // Scene detection
    if (/^(INT|EXT)/.test(trimmed)) {
      currentScene++;
      currentSpeaker = null;
      return;
    }

    // Character line detection
    if (isCharacterLine(line)) {
      const speaker = line.replace(/[^a-zA-Z ]/g, '').trim();
      speakers.add(speaker);
      inDialogue = true;
      
      // Track character interactions
      if (currentSpeaker) {
        characterRelations.set(
          [currentSpeaker, speaker].sort().join('+'),
          (characterRelations.get([currentSpeaker, speaker].sort().join('+')) || 0) + 1
        );
      }
      currentSpeaker = speaker;
    } 
    else if (inDialogue) {
      totalWords += wordCount(line) * (READING_RATES.dialogue / 60);
    }
    else if (/^\*.*\*$/.test(trimmed)) { // Action lines
      totalWords += wordCount(line) * (READING_RATES.action / 60);
    }
    else { // Descriptions
      totalWords += wordCount(line) * (READING_RATES.description / 60);
    }

    if (trimmed === '') inDialogue = false;
  });

  return {
    speakers: Array.from(speakers),
    totalWords: Math.round(totalWords),
    totalDialogueBlocks: speakers.size,
    characterRelations: Array.from(characterRelations).map(([pair, count]) => ({
      characters: pair.split('+'),
      interactions: count
    })),
    scenes: currentScene
  };
}

function isCharacterLine(line) {
  return /^[A-Z][A-Z ]+(\(.*\))?$/.test(line.trim());
}

function wordCount(text) {
  return text.split(/\s+/).filter(word => word.length > 0).length;
}
