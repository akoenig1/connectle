<script>
  import Item from "./Item.svelte";
  
  export let items;
  export let itemSelected;
</script>

<div class="row-wrapper">
  {#each items as item}
    <Item data={item} onSelect={() => itemSelected(item.id)} />
  {/each}
</div>

<style>
  .row-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
</style>
