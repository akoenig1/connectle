<script>
  import CategoryForm from "$lib/components/CategoryForm.svelte";

  let slug = "";
  let data = {
    categories: [
      {
        title: "",
        level: 0,
        items: ["", "", "", ""],
      },
      {
        title: "",
        level : 1,
        items: ["", "", "", ""],
      },
      {
        title: "",
        level: 2,
        items: ["", "", "", ""],
      },
      {
        title: "",
        level : 3,
        items: ["", "", "", ""],
      },
    ],
    title: "",
    timeCreated: new Date(),
  };
  let buttonState = 0;
  let submitted = false;

  const moveUp = (event, level) => {
    event.preventDefault();
    if (level <= 0) return;
    const temp = data.categories[level];
    data.categories[level] = data.categories[level - 1];
    data.categories[level - 1] = temp;
    data.categories[level].level = level;
    data.categories[level - 1].level = level - 1;
  };

  const moveDown  = (event, level) => {
    event.preventDefault();
    if (level >= 3) return;
    const temp = data.categories[level];
    data.categories[level] = data.categories[level + 1];
    data.categories[level + 1] = temp;
    data.categories[level].level = level;
    data.categories[level + 1].level = level + 1;
  }

  const handleChangeTitle = (value, level) => {
    const newCategories = [...data.categories];
    newCategories[level].title = value;
    data = { ...data, categories: newCategories };
  }

  const handleChangeItem = (value, level, index) => {
    const newCategories = [...data.categories];
    newCategories[level].items[index] = value;
    data = { ...data, categories: newCategories };
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let filled = true;
    if (data.title.length > 0) {
      data.categories.forEach(category => {
        if (category.title.length > 0) {
          category.items.forEach(item => {
            if (items.length <= 0) {
              filled = false;
            }
          });
        } else {
          filled = false;
        }
      });
    } else {
      filled = false;
    }
    if (filled) {
      const dataToSubmit = { ...data, time_created: new Date() };
      if (slug) {
        console.log(slug);
        // await updateGame(slug, dataToSubmit);
      } else if(!submitted) {
        submitted = true;
        console.log(submitted);
        // const { result, error } = await addGame(dataToSubmit);
        // setSlug(result.id);
      }
    } else {
      alert('Not all fields are filled out!');
    }
  }

  const copyToClipboard = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(URL + slug);
    buttonState = 1;
    setTimeout(() => buttonState = 0, 1000);
  };
</script>

<div class="container">
  <div class="container-header">
    <h1>Connectle</h1>
    <p>Create a custom puzzle based on the <a href="https://www.nytimes.com/games/connections" target="_blank">NYT Connections game</a>!</p>
    <p>No affiliation to the New York Times or its subsidiaries.</p>
    <div class="instructions">
      <h3>Difficulty Levels</h3>
      <ul class="help-emojis">
        <img id="help-arrow" src="https://www.nytimes.com/games-assets/v2/metadata/help_arrow.svg" alt="levels description arrow" />
        <div>
          <span class="help-emoji group-0"></span> Straightforward
        </div>
        <div>
          <span class="help-emoji group-1"></span>
        </div>
        <div>
          <span class="help-emoji group-2"></span>
        </div>
        <div>
          <span class="help-emoji group-3"></span> Tricky
        </div>
      </ul>
    </div>
  </div>
  <form>
    <label>
      <h3>Title</h3>
      <input type="text" maxLength={30} />
    </label>
    <h3>Categories</h3>
    <CategoryForm
      data={data}
      level={0}
      moveUp={moveUp}
      moveDown={moveDown}
      handleChangeTitle={handleChangeTitle}
      handleChangeItem={handleChangeItem}
    />
    <CategoryForm
      data={data}
      level={1}
      moveUp={moveUp}
      moveDown={moveDown}
      handleChangeTitle={handleChangeTitle}
      handleChangeItem={handleChangeItem}
    />
    <CategoryForm
      data={data}
      level={2}
      moveUp={moveUp}
      moveDown={moveDown}
      handleChangeTitle={handleChangeTitle}
      handleChangeItem={handleChangeItem}
    />
    <CategoryForm
      data={data}
      level={3}
      moveUp={moveUp}
      moveDown={moveDown}
      handleChangeTitle={handleChangeTitle}
      handleChangeItem={handleChangeItem}
    />
    <button on:click={handleSubmit}>{slug ? "Update" : "Submit"}</button>
  </form>
</div>

<style lang="scss">
  $yellow: #f9df6d;
  $green: #a0c35a;
  $blue: #b0c4ef;
  $purple: #ba81c5;
  
  h1 {
    font-family: 'Karnak Condensed', serif;
    font-weight: 100;
    letter-spacing: 1px;
    font-size: 42px;
  }

  h3 {
    font-family: 'Franklin Bold', sans-serif;
  }

  p {
    font-family: 'Franklin Light', sans-serif;
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

  form {
    padding: 20px;
    text-align: left;
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

  .container {
    width: 600px;
    margin: 50px auto;
    text-align: center;
  }

  .container-header {
    padding: 0 20px;

    a {
      color: $green;
      text-decoration: underline;
    }
  }

  .instructions {
    text-align: left;
    width: 150px;
    margin: 20px auto 0;
  }

  .help-emojis {
    display: flex;
    flex-direction: column;
    position: relative;

    >div {
      display: inline-flex;
      align-items: center;
      height: 20px;
    }
  }

  .help-emoji {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    border-radius: 2px;
    margin-bottom: 1.5px;

    &.group-0 {
      background: $yellow;
    }

    &.group-1 {
      background: $green;
    }

    &.group-2 {
      background: $blue;
    }

    &.group-3 {
      background: $purple;
    }
  }

  #help-arrow {
    height: 2.2rem;
    left: 2.6rem;
    bottom: 1.4rem;
    position: absolute;
  }
</style>
