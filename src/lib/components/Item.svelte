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
