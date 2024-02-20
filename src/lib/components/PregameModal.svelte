<script>
  export let gameStarted;
  
  const handlePlayClick = () => {
    gameStarted = true;
  }

  const handlePlayKeyDown = (event) => {
    if (event.key === "Enter") gameStarted = true;
  }
</script>

<div class="pregame-modal-container">
  <div class="container alternate">
    <div class="content sequence-animation">
      <div class="icon medium connections slide-up" style="transition-delay: 25ms;"></div>
      <h2 class="title large karnak slide-up" style="transition-delay: 50ms;">Connections</h2>
      <h3 class="description default karnak slide-up" style="transition-delay: 75ms;">Group words that share a common thread.</h3>
      <span class="meta slide-up" style="transition-delay: 100ms;"></span>
      <div class="button-group slide-up" style="transition-delay: 125ms;">
        <div class="button-wrapper default">
          <button type="button" class="button primary default" on:click={handlePlayClick} on:keydown={handlePlayKeyDown}>Play</button>
        </div>
      </div>
      <p class="info slide-up" style="transition-delay: 175ms;">
        <span class="info-date">February 20, 2024</span>
        <span class="info-text ">
          <span class="info-editor">By Alex Koenig</span>
        </span>
      </p>
    </div>
  </div>
</div>

<style lang="scss">
  .pregame-modal-container {
    background-color: rgb(179, 167, 254);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
  }
</style>