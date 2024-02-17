<script>
  export let data;
  export let level;
  export let moveUp;
  export let moveDown;
  export let handleChangeTitle;
  export let handleChangeItem;
</script>

<div class="category-form-wrapper">
  <div class="order-buttons">
    <button on:click={(event) => moveUp(event, level)} disabled={level === 0 ? true : false}>▲</button>
    <button on:click={(event) => moveDown(event, level)} disabled={level === 3 ? true : false}>▼</button>
  </div>
  <label>
    <h4>Title</h4>
    <input type="text" maxLength={50} value={data.categories[level].title} on:change={(e) => handleChangeTitle(e.target.value, level)} />
  </label>
  <div class="category-items-wrapper">
    <label>
      <h4>Item 1</h4>
      <input type="text" maxLength={15} value={data.categories[level].members[0]} on:change={(e) => handleChangeItem(e.target.value, level, 0)} />
    </label>
    <label>
      <h4>Item 2</h4>
      <input type="text" maxLength={15} value={data.categories[level].members[1]} on:change={(e) => handleChangeItem(e.target.value, level, 1)} />
    </label>
    <label>
      <h4>Item 3</h4>
      <input type="text" maxLength={15} value={data.categories[level].members[2]} on:change={(e) => handleChangeItem(e.target.value, level, 2)} />
    </label>
    <label>
      <h4>Item 4</h4>
      <input type="text" maxLength={15} value={data.categories[level].members[3]} on:change={(e) => handleChangeItem(e.target.value, level, 3)} />
    </label>
  </div>
</div>