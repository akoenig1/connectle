<script>
  import PregameModal from "../../lib/components/PregameModal.svelte";
  import Puzzle from "$lib/components/Puzzle.svelte";
	import { onMount } from "svelte";
  
  export let data;

  let slug = data.slug;
  let loading = true;
  let gameData = null;
  let gameStarted = false;

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
      <div class="header">
        <div class="title">
          <h1>Connectle</h1>
          <h2>{gameData.title}</h2>
        </div>
        <div class="nav-button"><a href="/">Create new game</a></div>
      </div>
      {#if !gameStarted}
        <PregameModal 
          bind:gameStarted
          title={gameData.title}
          author={gameData.author}
        />
      {:else}
        <Puzzle 
          gameData={gameData} 
          slug={slug} 
        />
      {/if}
    {:else}
      <div class='page-wrapper'>
        <div class="error-page">
          <h1>Sorry, that game could not be found.</h1>
          <div class="nav-button"><a href="/">Create a game</a></div>
        </div>
      </div>
    {/if}
  {/if}
  <div class={"attribution " + (gameStarted ? "" : "pregame")}>
    <p class='small-p'>No affiliation to the New York Times or any of its subsidiaries.</p>
    <p class='regular-p'>Created by Alex Koenig</p>
  </div>
</div>

<style lang="scss">
  h1 {
    font-family: 'Karnak Condensed', serif;
    font-weight: 100;
    letter-spacing: 1px;
    font-size: 42px;
  }

  h2 {
    font-family: 'Franklin Bold', sans-serif;
  }
  
  .app {
    text-align: center;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .header {
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1280px;

    h1 {
      margin-right: 16px;
    }

    h2 {
      font-family: 'Franklin Light', sans-serif;
      display: inline-block;
      font-size: 28px;
      font-weight: 300;
    }

    .title {
      display: flex;
      align-items: center;
    }
  }

  .nav-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    font-family: "Franklin";
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .047em;
    text-transform: uppercase;
    height: 36px;
    border: 1px solid #f4f4f4;
    border-radius: 3px;
    color: #fff;
    border-color: #000;
    background-color: #000;
    margin-left: 8px;
    padding: 1px 33px 4px;
    cursor: pointer;
  }

  .attribution {
    font-size: 12px;
    margin: auto;
    width: 100%;

    .small-p {
      font-size: 10px;
    }

    .regular-p {
      font-size: 12px;
    }

    &.pregame {
      background-color: rgb(179, 167, 254);
    }
  }

  @media screen and (max-width: 600px) {
    .header {
      width: 100%;
      flex-direction: column;
    }

    .title {
      margin: 20px 0;
      flex-direction: column;

      h1 {
        margin: 0;
        line-height: 42px;
      }

      h2 {
        line-height: 28px;
      }
    }
  }
</style>
