echo on
dfx stop
rm -r -f .dfx
dfx start --background
dfx canister install --all &> tmp.txt
echo "candid UIs"
sed -e 's|ic:|http://localhost:8000/candid?canisterId=ic:|g' tmp.txt
echo "frontend UIs"
sed -e 's|ic:|http://localhost:8000/?canisterId=ic:|g' tmp.txt

dfx canister call --async user start '(0)' 
dfx canister call --async user-1 start '(1)'
# dfx canister call --async user-2 start '(2)'
# dfx canister call --async user-3 start '(3)'
# dfx canister call --async user-4 start '(4)'
# dfx canister call --async user-5 start '(5)'
# dfx canister call --async user-6 start '(6)'
# dfx canister call --async user-7 start '(7)'
# dfx canister call --async user-8 start '(8)'
# dfx canister call --async user-9 start '(9)'


dfx canister call --async helper startHelper '(0)'
dfx canister call --async helper-1 startHelper '(1)'
# dfx canister call --async helper-2 startHelper '(2)'
# dfx canister call --async helper-3 startHelper '(3)'
# dfx canister call --async helper-4 startHelper '(4)'
# dfx canister call --async helper-5 startHelper '(5)'
# dfx canister call --async helper-6 startHelper '(6)'
# dfx canister call --async helper-7 startHelper '(7)'
# dfx canister call --async helper-8 startHelper '(8)'
# dfx canister call --async helper-9 startHelper '(9)'

