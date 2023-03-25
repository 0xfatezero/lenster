function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
  
function delayFn(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay + Math.floor(Math.random() * 5 ) * 900));
}
  

export {
    getRandomElement,
    delayFn
}