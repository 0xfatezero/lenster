function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
  
function delayFn(delay) {
    return new Promise(resolve => {
        const randomDelay = Math.floor(Math.random() * 10) + 1;
        setTimeout(() => {
        resolve();
        }, (delay + randomDelay) * 1000);
    });
}
  

export {
    getRandomElement,
    delayFn
}