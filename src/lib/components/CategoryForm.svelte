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
      <input type="text" maxLength={50} value={data.categories[level].items[0]} on:change={(e) => handleChangeItem(e.target.value, level, 0)} />
    </label>
    <label>
      <h4>Item 2</h4>
      <input type="text" maxLength={50} value={data.categories[level].items[1]} on:change={(e) => handleChangeItem(e.target.value, level, 1)} />
    </label>
    <label>
      <h4>Item 3</h4>
      <input type="text" maxLength={50} value={data.categories[level].items[2]} on:change={(e) => handleChangeItem(e.target.value, level, 2)} />
    </label>
    <label>
      <h4>Item 4</h4>
      <input type="text" maxLength={50} value={data.categories[level].items[3]} on:change={(e) => handleChangeItem(e.target.value, level, 3)} />
    </label>
  </div>
</div>

<style lang="scss">
  $yellow: #f9df6d;
  $green: #a0c35a;
  $blue: #b0c4ef;
  $purple: #ba81c5;
  $disabled: #7f7f7f;
    
  h4 {
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

  label {
    padding: 5px 0;
    display: block;
  }

  input {
    width: 100%;
    margin: 5px 0;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid black;
  }

  .category-form-wrapper {
    border-radius: 3px;
    padding: 10px;
    margin: 5px 0;
    position: relative;

    label {
      padding: 5px;
    }

    >label {
      width: 90%;
    }

    &:nth-of-type(1) {
      background: $yellow;
    }

    &:nth-of-type(2) {
      background: $green;
    }

    &:nth-of-type(3) {
      background: $blue;
    }

    &:nth-of-type(4) {
      background: $purple;
    }
  }

  .order-buttons {
    position: absolute;
    top: 20px;
    right: 15px;

    button {
      background: black;
      color: white;
      margin: 2px;
      min-width: 0;
      height: auto;
      padding: 3px 7px;
      font-size: 12px;
      border-radius: 3px;

      &:disabled {
        background: $disabled;
        border-color: $disabled;
        cursor:not-allowed;
      }
    }
  }

  .category-items-wrapper {
    display: flex;
    flex-wrap: wrap;

    label {
      width: 50%;
    }
  }
</style>
