export const shuffle = (itemArray) => {
  let currentIndex = itemArray.length;

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [itemArray[currentIndex], itemArray[randomIndex]] = [itemArray[randomIndex], itemArray[currentIndex]];
  }
  
  return itemArray;
}
