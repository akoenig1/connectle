<script>
  export let data;
</script>

<div class={"row-complete-wrapper " + "level-" + data.level}>
  <div class="complete-header">
      <h3>{data.title}</h3>
  </div>
  <p>{data.items.join(", ")}</p>
</div>

<style lang="scss">
  $yellow: #f9df6d;
  $green: #a0c35a;
  $blue: #b0c4ef;
  $purple: #ba81c5;

  .row-complete-wrapper {
    border-radius: 6px;
    display: flex;
    align-content: center;
    justify-content: center;
    height: 80px;
    width: 624px;
    flex-wrap: wrap;
    margin: 4px;

    &.level-0 {
      background: $yellow;
    }

    &.level-1 {
      background: $green;
    }

    &.level-2 {
      background: $blue;
    }

    &.level-3 {
      background: $purple;
    }

    .complete-header {
      width: 100%;
    }

    h3 {
      font-family: "Franklin Bold", sans-serif;
      font-weight: 600;
      text-transform: uppercase;
      margin: 0;
      font-size: 20px;
      line-height: 20px;
    }

    p {
      margin: 0;
      font-family: "Franklin", sans-serif;
      text-transform: uppercase;
      font-size: 20px;
      line-height: 20px;
    }
  }
</style>
