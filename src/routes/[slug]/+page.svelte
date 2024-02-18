<script>
  import Puzzle from "$lib/components/Puzzle.svelte";
	import { onMount } from "svelte";
  
  export let data;

  let slug = data.slug;
  let loading = true;
  let gameData = {};

  onMount(() => {
    if (data.result) {
      gameData = data.result;
    }
    loading = false;
  });
</script>

<div class="app">
  {#if loading}
    <div class="page-wrapper">
      <p>Loading...</p>
    </div>
  {:else}
    {#if gameData}
      <Puzzle 
        gameData={gameData} 
        slug={slug} 
      />
    {:else}
      <div class='page-wrapper'>
        <div class="error-page">
          <h1>Sorry, that game could not be found.</h1>
          <div class="nav-button"><a href="/">Create a game</a></div>
        </div>
      </div>
    {/if}
  {/if}
</div>