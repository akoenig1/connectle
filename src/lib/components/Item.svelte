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
  class={"item" + (data.selected ? " selected" : "") + (data.mistake ? " invalid-shake" : "")}
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
    font-size: 16px;
    background-color: $item-grey;
    color: black;
    outline: none;
    text-align: center;
    font-family: "Franklin Bold", sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    border-radius: 6px;
    z-index: 0;
    // position: absolute;
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
  }

.invalid-shake {
  animation: shake ease-in 0.2s 1.5;
}
</style>
