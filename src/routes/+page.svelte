<script>
  import CategoryForm from "$lib/components/CategoryForm.svelte";

  let slug = "";
  let data = {
    categories: [
      {
        title: "",
        level: 0,
        members: ["", "", "", ""],
      },
      {
        title: "",
        level : 1,
        members: ["", "", "", ""],
      },
      {
        title: "",
        level: 2,
        members: ["", "", "", ""],
      },
      {
        title: "",
        level : 3,
        members: ["", "", "", ""],
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
    const newCategories = [...data.categories];
    const temp = data.categories[level];
    newCategories[level].level = level - 1;
    newCategories[level - 1].level = level;
    newCategories[level] = data.categories[level - 1];
    newCategories[level - 1] = temp;
    data = { ...data, categories: newCategories };
  };

  const moveDown  = (event, level) => {
    event.preventDefault();
    if (level >= 3) return;
    const newCategories = [...data.categories];
    const temp = data.categories[level];
    newCategories[level].level = level + 1;
    newCategories[level + 1].level = level;
    newCategories[level] = data.categories[level + 1];
    newCategories[level + 1] = temp;
    data = { ...data, categories: newCategories };
  }

  const handleChangeTitle = (value, level) => {
    const newCategories = [...data.categories];
    newCategories[level].title = value;
    data = { ...data, categories: newCategories };
  }

  const handleChangeItem = (value, level, index) => {
    const newCategories = [...data.categories];
    newCategories[level].members[index] = value;
    data = { ...data, categories: newCategories };
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let filled = true;
    if (data.title.length > 0) {
      data.categories.forEach(category => {
        if (category.title.length > 0) {
          category.members.forEach(member => {
            if (member.length <= 0) {
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
  }
</script>

<div class="contanier">
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
