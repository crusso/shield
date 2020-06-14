import tokenomics from 'ic:canisters/tokenomics';

tokenomics.greet(window.prompt("Enter your name:")).then(greeting => {
  window.alert(greeting);
});
