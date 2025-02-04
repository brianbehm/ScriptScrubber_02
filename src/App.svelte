<script>
  import { ErrorBoundary } from "svelte";
  import ScreenplayView from "./components/ScreenplayView.svelte";
  let hasError = false;
</script>

<ErrorBoundary on:error={(e) => { hasError = true; console.error(e.detail) }}>
  {#if hasError}
    <div class="error">Critical error occurred - check console</div>
  {:else}
    <ScreenplayView />
  {/if}
</ErrorBoundary>

<style>
  .error { color: red; padding: 2rem; }
</style>
