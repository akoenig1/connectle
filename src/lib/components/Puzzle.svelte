<script>
	import CompletedRow from "./CompletedRow.svelte";
  import UnsolvedRowItems from "./UnsolvedRowItems.svelte";
  import { shuffle } from "$lib/utils/shuffle";
	import { onMount } from "svelte";

  export let gameData;
  export let slug;

  let items = [];
  let unsolvedRows = [];
  let completedRows = [];
  let history = [];
  let numberSelected = 0;
  let mistakes = 4;
  let gameState = "playing";

  let hint = "";
  let displayPopup = false;
  let answerIndex = 0;

  const getItems = (categories) => {
    let itemArray = [];
    let index = 0;

    categories.forEach((category) => {
      category.items.forEach((item) => {
        let itemObject = {
          level: category.level,
          title: item,
          selected: false,
          id: index,
        };
        itemArray.push(itemObject);
        index++;
      });
    });

    shuffle(itemArray);
    return itemArray;
  }

  const itemSelected = (id) => {
    const updatedItems = [...items];
    const selectedItem = updatedItems.find((item) => item.id === id);

    if(!selectedItem || (numberSelected >= 4 && !selectedItem.selected)) return;

    if(selectedItem.selected) {
      numberSelected--;
    } else {
      numberSelected++;
    }

    selectedItem.selected = !selectedItem.selected;
    items = updatedItems;
  }

  const handleShuffle = () => {
    items = shuffle([...items]);
  }

  const deselectAll = () => {
    const updatedItems = [...items];
    updatedItems.forEach((item) => {
      item.selected = false;
    });
    items = updatedItems;
    numberSelected = 0;
  }

  const removeMistake = () => {
    items = [...items].map(item => {
      item.mistake = false;
      return item;
    });

    if (mistakes <= 1) {
      gameState = "lost";
      revealAnswer(answerIndex);
    }

    mistakes--;
    hint = "";
  }

  const checkAnswer = () => {
    let selected = [];
    let levelsSelected = [0,0,0,0];
    let allCorrect = true;
    let level = -1;
    const updatedItems = [...items];

    updatedItems.forEach((item) => {
      if (item.selected) {
        if (level < 0) {
          level = item.level;
        } else if (item.level !== level) {
          allCorrect = false;
        }
        levelsSelected[item.level]++;
        selected.push(item);
      }
    });

    if (allCorrect) {
      completedRows = [...completedRows, gameData.categories[level]];

      updatedItems.sort((a, b) => {
        if (a.selected) return -1;
        else if (b.selected) return 1;
        else return 0;
      });

      for (let i = 0; i < 4; i++) {
        updatedItems.shift();
      }

      items = updatedItems;
      numberSelected = 0;
    } else {
      let oneAway = false;

      levelsSelected.forEach(level => {
        if (level === 3) {
          oneAway = true;
        }
      });
      
      updatedItems.forEach(item => { if (item.selected) item.mistake = true });
      items = updatedItems;

      if (oneAway) hint = "One away!";

      setTimeout(() => removeMistake(), 1000);
    }

    history = [...history, selected];
  }

  const calculateUnsolvedRows = () => {
    let rows = [];
    for (let i = 0; i < items.length; i += 4) {
      rows.push({ items: items.slice(i, i + 4) });
    }
    unsolvedRows = rows;
  }

  const renderBubbles = () => {
    const bubbles = [];
    for (let i = 0; i < mistakes; i++) {
      bubbles.push("bubble");
    }
    return bubbles;
  };

  const winGame = () => {
    if (gameState === "playing") gameState = "won";
    setTimeout(() => displayPopup = true, 1000);
  }

  const revealAnswer = (index) => {
    answerIndex++;
    if (completedRows.findIndex(row => row.level === index) < 0) {
      const updatedItems = [...items];

      updatedItems.sort((a, b) => {
        if (a.level === index) return -1;
        else if (b.level === index) return 1;
        else return 0;
      });

      for (let i = 0; i < 4; i++) {
        updatedItems.shift();
      }

      completedRows = [...completedRows, gameData.categories[index]];
      items = updatedItems;
    } else {
      revealAnswer(index + 1);
    }
  }

  const updateGameStatus = () => {
    if (completedRows.length >= 4) {
      winGame();
    } else if (gameState === "lost") {
      setTimeout(() => revealAnswer(answerIndex), 1000);
    }
  }

  onMount(() => {
    items = getItems(gameData.categories);
  });
  $: items, calculateUnsolvedRows();
  $: completedRows, updateGameStatus();
</script>

<div id="hint" class={hint.length > 0 ? "show" : ""}><p>{hint}</p></div>
<!-- <PopUp state={gameState} title={gameData.title} history={history} slug={slug} displayPopup={displayPopup} /> -->
<div class="header">
    <div class="title">
        <h1>Connectle</h1>
        <h2>{gameData.title}</h2>
    </div>
    <div class="nav-button"><a href="/">Create new game</a></div>
</div>
<p>Create four groups of four!</p>
<div class="connectle-wrapper">
  {#each completedRows as completedRow}
    <CompletedRow data={completedRow} />
  {/each}
  {#each unsolvedRows as unsolvedRow}
    <UnsolvedRowItems items={unsolvedRow.items} itemSelected={itemSelected} />
  {/each} 
</div>
{#if gameState === "playing"}
  <div class="mistakes-container">
    <p>Mistakes remaining:</p>
    <div class="bubbles-container">
      {#each renderBubbles() as bubble}
        <div class="bubble"></div>
      {/each}
    </div>
  </div>
{/if}

<div class="buttons-wrapper">
  {#if gameState === "playing"}    
    <button on:click={handleShuffle}>Shuffle</button>
    <button id="deselect-all-button" on:click={deselectAll}>Deselect All</button>
    <button id="submit-button" disabled={numberSelected === 4 ? false : true} on:click={checkAnswer}>Submit</button>
  {:else}
    <button on:click={() => displayPopup = true}>View Results</button>
  {/if}
</div>
