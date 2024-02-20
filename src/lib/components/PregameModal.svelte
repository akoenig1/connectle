<script>
  import { onMount } from "svelte";
  
  export let gameStarted;
  export let title;
  export let author;
  
  const handlePlayClick = () => {
    gameStarted = true;
  }

  const handlePlayKeyDown = (event) => {
    if (event.key === "Enter") gameStarted = true;
  }

  const updateModalHeight = () => {
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;
    const modal = document.querySelector('.pregame-modal-container');
    if (modal) modal.style.height = `calc(100vh - ${headerHeight}px)`;
  }

  onMount(() => {
    updateModalHeight();
  })
</script>

<div class="pregame-modal-container">
  <div class="container">
    <div class="content sequence-animation">
      <div class="icon slide-up" style="animation-delay: 25ms;"></div>
      <h2 class="title slide-up" style="animation-delay: 50ms;">Connectle</h2>
      <h3 class="description slide-up" style="animation-delay: 75ms;">Group words that share a common thread.</h3>
      <span class="meta slide-up" style="animation-delay: 100ms;"></span>
      <div class="button-wrapper slide-up" style="animation-delay: 125ms;">
        <button type="button" class="button" on:click={handlePlayClick} on:keydown={handlePlayKeyDown}>Play</button>
      </div>
      <p class="info slide-up" style="animation-delay: 175ms;">
        <span class="info-date">{title}</span>
        <span class="info-editor">By {author ?? "Anonymous"}</span>
      </p>
    </div>
  </div>
</div>

<style lang="scss">
  .pregame-modal-container {
    background-color: rgb(179, 167, 254);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;
  }

  .container {
    margin: auto 0;
    padding: 30px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    flex-wrap: nowrap;
    position: relative;
    height: 100%;
  }

  .content {
    max-width: 100%;
    margin: auto 0;
  }

  .icon {
    display: block;
    width: 100%;
    text-align: center;
    background-image: url('../../assets/connectle.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    height: 64px;
    margin-bottom: 17px;
  }

  .title {
    font-family: 'Karnak Condensed', serif;
    font-size: min(2.25em, 110px);
    line-height: 1.056;
    margin-bottom: 8px;
  }

  .description {
    font-family: 'Franklin Light', sans-serif;
    font-size: 20px;
    margin: 8px auto 0 auto;
    width: 200px;
  }

  .meta {
    display: block;
    margin-bottom: 20px;
  }

  .button-wrapper {
    margin-bottom: 22px;
  }

  .button {
    display: block;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    border: none;
    height: 3em;
    border-radius: 1.5em;
    align-content: center;
    font: 1em "Franklin";
    letter-spacing: .05em;
    background: #000;
    color: #fff;
    padding: 1px 16px;
    min-width: 9.375em;
    min-width: min(9.375em,300px);
  }

  .info-date {
    display: block;
    line-height: 1.25;
    font-family: 'Franklin Bold', sans-serif;
    letter-spacing: .005em;
    margin-top: 15px;
    font-size: 18px;
    color: #000;
  }

  .info-editor {
    display: block;
    font-family: 'Franklin Light', sans-serif;
    font-size: 0.875em;
    line-height: 1.25;
    letter-spacing: .01em;
  }

  .slide-up {
    opacity: 0;
    transform: translateY(20px);
    animation: slideUp 600ms cubic-bezier(0.1, 0.2, 0.3, 1) forwards;
  }

  @keyframes slideUp {
    0% {
      transform: translateY(20px);
      opacity: 0;
    }

    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }
</style>