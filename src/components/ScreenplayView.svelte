<script>
  import { analyzeScreenplay } from '../utils/analysis.js';
  import { exportToPDF } from '../utils/pdfExport.js';
  
  let rawText = '';
  let analysisResults = {};
  let wpm = 200;
  
  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        rawText = event.target.result;
        analyzeText();
      };
      reader.readAsText(file);
    }
  }

  function analyzeText() {
    analysisResults = analyzeScreenplay(rawText);
    analysisResults.readingTime = (analysisResults.totalWords / wpm).toFixed(1);
  }
</script>

<div class="screenplay-view">
  <div class="editor-pane">
    <input type="file" accept=".txt" on:change={handleFileUpload}>
    
    {#if rawText}
      <div class="stats">
        <h2>Analysis Results</h2>
        <p>Characters: {analysisResults.speakers?.length || 0}</p>
        <p>Total Words: {analysisResults.totalWords || 0}</p>
        <p>Reading Time: {analysisResults.readingTime || 0} minutes</p>
      </div>
    {/if}
  </div>

  <div class="controls">
    <label>
      Reading Speed (WPM):
      <input type="number" bind:value={wpm} min="50" max="400">
    </label>
    <button on:click={analyzeText}>Re-analyze</button>
    <button on:click={() => exportToPDF(analysisResults)}>Export PDF</button>
  </div>
</div>

<style>
  .screenplay-view {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 2rem;
  }

  .editor-pane {
    border-right: 1px solid #ccc;
    padding-right: 2rem;
  }

  .stats {
    margin-top: 1rem;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 4px;
  }

  .controls {
    grid-column: span 2;
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
</style>
