import shield from 'ic:canisters/shield';

shield.greet(window.prompt("Enter your name:")).then(greeting => {
  window.alert(greeting);
});
