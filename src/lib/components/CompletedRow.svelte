<script>
  export let data;
</script>

<div class={"row-complete-wrapper " + "level-" + data.level}>
  <div class="complete-header">
      <h3>{data.title}</h3>
  </div>
  <p>{data.members.join(", ")}</p>
</div>
