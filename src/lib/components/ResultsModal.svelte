<script>
  import { PUBLIC_BASE_URL } from "$env/static/public";
  
  export let state;
  export let title;
  export let history;
  export let slug;
  export let displayModal;

  let buttonClickable = true;
  const levelNames = ["yellow", "green", "blue", "purple"];
  const emojis = ["🟨", "🟩", "🟦", "🟪"];

  const handleClose = () => {
    displayModal = false;
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") displayModal = false;
  };

  const share = () => {
    let text = "Connectle: " + title + "\n";
    for (const row of history) {
      for (const item of row) {
        text += emojis[item.level];
      }
      text += "\n";
    }
    text += PUBLIC_BASE_URL + slug;
    if (navigator.share && navigator.canShare({text})) {
      navigator.share({text});
    } else {
      navigator.clipboard.writeText(text);
      buttonClickable = false;
      setTimeout(() => buttonClickable = true, 1000);
    }
  }
</script>

{#if displayModal}
  <div id="modal">
    <div id="modal-content">
      <div 
        class="close-x" 
        role="button" 
        tabindex="0" 
        on:click={handleClose} 
        on:keydown={handleKeyDown}
      ></div>
      {#if state === "won"}
        <h2>Great!</h2>
      {:else}
        <h2>Next Time!</h2>
      {/if}
      <h3>Connectle: {title}</h3>
      <div id="emoji-recap">
        {#each history as round, index} 
          <div key={index} class="emoji-row">
            {#each round as item, index} 
              <div key={index} class={"emoji " + levelNames[item.level]}></div>
            {/each}
          </div>
        {/each}
      </div>
      <button on:click={share}>{buttonClickable ? "Share Your Results" : "Copied to Clipboard"}</button>
    </div>
  </div>
{/if}

<style lang="scss">
  $yellow: #f9df6d;
  $green: #a0c35a;
  $blue: #b0c4ef;
  $purple: #ba81c5;

  h2,
  h3 {
    font-family: 'Franklin Bold', sans-serif;
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

  #modal {
    position: absolute;
    z-index: 8;
    justify-content: center;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
  }

  #modal-content {
    width: 100%;
    max-width: 520px;
    padding: 32px;
    animation: slideIn 200ms;
    box-shadow: 0 3px 12px -1px rgba(0, 0, 0, 0.3);
    position: relative;
    border-radius: 10px;
    background-color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      font-family: 'Karnak Condensed', serif;
      font-size: 36px;
      margin: 8px 0 0 0;
      letter-spacing: 1px;
      font-weight: 100;
    }

    h3 {
      font-family: 'Franklin Light', sans-serif;
      font-weight: 100;
    }

    button {
      background: black;
      color: white;
    }
  }

  .close-x {
    color: black;
    position: absolute;
    top: 12px;
    right: 12px;
    width: 24px;
    height: 24px;
    background: center/24px 24px no-repeat;
    background-image: url(../../assets/icon-close.svg);
    cursor: pointer;
  }

  #emoji-recap {
    margin: 10px 0;

    .emoji-row {
      display: flex;
    }
  }

  .emoji {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    background-color: black;
    margin: 2px 0px;

    &.yellow {
      background-color: $yellow;
    }

    &.green {
      background-color: $green;
    }

    &.blue {
      background-color: $blue;
    }

    &.purple {
      background-color: $purple;
    }
  }

  @keyframes slideIn {
    0% {
      transform: translateY(30px);
      opacity: 0;
    }

    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }
</style>
