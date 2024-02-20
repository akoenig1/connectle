<script>
  export let data;
  export let onSelect;

  const handleClick = () => {
    onSelect();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSelect();
    }
  };
</script>

<div 
  class={
    "item" 
    + (data.selected ? " selected" : "") 
    + (data.mistake ? " invalid-shake" : "") 
    + (data.title.length < 15 ? " short-item" : data.title.length < 30 ? " medium-item" : " long-item")}
  role="button"
  tabindex="0"
  on:click={handleClick} 
  on:keydown={handleKeyDown}
>
  {data.title}
</div>

<style lang="scss">
  $item-grey: #efefe6;
  $selected-color: #5a594e;
  
  .item {
    width: 150px;
    height: 80px;
    margin: 4px;
    background-color: $item-grey;
    color: black;
    outline: none;
    text-align: center;
    font-family: "Franklin Bold", sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    border-radius: 6px;
    z-index: 0;
    transition: opacity 0.4s ease;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    cursor: pointer;
    overflow: hidden;
    word-break: break-word;

    &.selected {
      color: white;
      background: $selected-color;
    }

    &.short-item {
      font-size: 16px;
    }

    &.medium-item {
      font-size: 12px;
    }

    &.long-item {
      font-size: 10px;
    }
  }

  .invalid-shake {
    animation: shake ease-in 0.2s 1.5;
  }

  @media screen and (max-width: 600px) {
    .item {
      width: 23%;
      margin: 1%;
    }
  }

  @keyframes shake {
    0%,
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
    100% {
      transform: translatex(0);
    }
  }
</style>
