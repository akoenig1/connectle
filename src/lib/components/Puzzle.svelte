<script>
	import CompletedRow from "./CompletedRow.svelte";
  import UnsolvedRowItems from "./UnsolvedRowItems.svelte";
  import ResultsModal from "./ResultsModal.svelte";
  import { shuffle } from "$lib/utils/shuffle";
	import { onMount } from "svelte";

  export let gameData;
  export let slug;

  let items = [];
  let unsolvedRows = [];
  let completedRows = [];
  let history = [];
  let bubbles = ["bubble", "bubble", "bubble", "bubble"];
  let numberSelected = 0;
  let mistakes = 4;
  let gameState = "playing";
  let hint = "";
  let displayModal = false;
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

  const handleDeselectAll = () => {
    const updatedItems = [...items];
    updatedItems.forEach((item) => {
      item.selected = false;
    });
    items = updatedItems;
    numberSelected = 0;
  }

  const handleViewResults = () => {
    displayModal = true;
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
      
      removeBubble();
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

  const removeBubble = () => {
    bubbles = bubbles.slice(0, -1);
  };

  const winGame = () => {
    if (gameState === "playing") gameState = "won";
    setTimeout(() => displayModal = true, 1000);
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
<ResultsModal state={gameState} title={gameData.title} history={history} slug={slug} bind:displayModal />
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
      {#each bubbles as bubble}
        <div class="bubble"></div>
      {/each}
    </div>
  </div>
{/if}

<div class="buttons-wrapper">
  {#if gameState === "playing"}    
    <button on:click={handleShuffle}>Shuffle</button>
    <button id="deselect-all-button" on:click={handleDeselectAll}>Deselect All</button>
    <button id="submit-button" disabled={numberSelected === 4 ? false : true} on:click={checkAnswer}>Submit</button>
  {:else}
    <button on:click={handleViewResults}>View Results</button>
  {/if}
</div>

<style lang="scss">
  $selected-color: #5a594e;

  p {
    font-family: 'Franklin Light', sans-serif;
  }

  button {
    font-family: 'Franklin', sans-serif;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    width: fit-content;
    min-width: 5.5em;
    height: 3em;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 15px;
    max-width: 80vw;
    border-radius: 32px;
    line-height: 16px;
    cursor: pointer;
    border: black solid 1px;
    background: white;
    color: black;
  }
  
  #hint {
    visibility: hidden;
    font-family: 'Franklin';
    position: fixed;
    left: 50%;
    transform: translateX(calc(-50% - 30px));
    margin: 30px;
    background-color: black;
    color: white;
    padding: 13px;
    border: none;
    border-radius: 4px;
    opacity: 1;
    font-size: 14px;
    line-height: 16px;
    z-index: 100;
    text-align: center;

    &.show {
      visibility: visible;
      animation: fadein 0.5s, fadeout 0.5s 2s forwards;
    }

    p {
      color: white;
      margin: 0;
    }
  }

  .connectle-wrapper {
    width: 632px;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    padding: 20px 0;
  }

  .mistakes-container {
    display: flex;
    justify-content: center;
    padding: 0 0 20px;
  }

  .bubbles-container {
    display: flex;
    justify-content: flex-start;
    width: 118px;
    align-items: center;
    margin-left: 10px;
  }

  .bubble {
    background-color: $selected-color;
    width: 16px;
    height: 16px;
    border-radius: 9999px;
    margin: 0 7px;
  }

  .buttons-wrapper {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  #deselect-all-button {
    width: 120px;
  }

  #submit-button[disabled] {
    border-color: #7f7f7f;
    background-color: white;
    color: #7f7f7f;
    cursor: not-allowed;
  }

  #submit-button {
    background: black;
    color: white;
  }

  @media screen and (max-width: 600px) {
    .connectle-wrapper {
      width: 100%;
    }
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes fadeout {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }
</style>
