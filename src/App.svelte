<script>
  import { theme, toggleTheme } from './stores/theme.js';
  import ScreenplayView from './components/ScreenplayView.svelte';
</script>

<svelte:head>
  <link rel="stylesheet" href="/assets/styles/global.css">
</svelte:head>

<main data-theme={$theme}>
  <nav>
    <h1>ScriptScrubber</h1>
    <button on:click={toggleTheme}>🌓 Toggle Theme</button>
  </nav>
  <ScreenplayView />
</main>

<style>
  :global(body) {
    margin: 0;
    min-height: 100vh;
    font-family: system-ui;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    border-bottom: 1px solid #ccc;
  }

  button {
    padding: 0.5rem 1rem;
    background: var(--bg-color-dark);
    color: var(--text-color-dark);
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  [data-theme='dark'] button {
    background: var(--bg-color-light);
    color: var(--text-color-light);
  }
</style>
