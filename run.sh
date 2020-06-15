echo on
dfx stop
rm -r -f .dfx
dfx start --background
dfx canister install --all &> tmp.txt
echo "candid UIs"
sed -e 's|ic:|http://localhost:8000/candid?canisterId=ic:|g' tmp.txt
echo "frontend UIs"
sed -e 's|ic:|http://localhost:8000/?canisterId=ic:|g' tmp.txt

dfx canister call user-0 start '(0)'
dfx canister call user-1 start '(1)'

