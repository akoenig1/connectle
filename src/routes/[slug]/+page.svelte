<script>
  import Puzzle from "$lib/components/Puzzle.svelte";
  
  let slug = "";
  let loading = true;
  let gameData = {};

  const fetchData = async () => {
    // const data = await getDataFromSlug(slug);
    const data = {
      result: {
        title: "Test Game",
        categories: [
          {
            title: "Category 1",
            members: ["Item 1", "Item 2", "Item 3", "Item 4"],
          },
          {
            title: "Category 2",
            members: ["Item 1", "Item 2", "Item 3", "Item 4"],
          },
          {
            title: "Category 3",
            members: ["Item 1", "Item 2", "Item 3", "Item 4"],
          },
          {
            title: "Category 4",
            members: ["Item 1", "Item 2", "Item 3", "Item 4"],
          },
        ],
        timeCreated: new Date(),
      },
    };
    if (data.result) {
      gameData = data.result;
    }
    loading = false;
  }
  fetchData();
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