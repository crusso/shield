# Replica Crash

This branch reproduces a crash of the replica, installing ca. 20 canister but only running a handfull of canisters.

```bash
dfx build

./run.sh

```bash
yields

```
crusso@crusso-Virtual-Machine:~/shield$ ./run.sh
on
Jun 16 10:05:29.247 INFO replica is interrupted, shutting down
⠁ Starting up the client...
Jun 16 10:05:29.302 INFO Dfinity Replica Started
Jun 16 10:05:29.305 INFO Generated node ID: 100
client address: "http://localhost:39347"
binding to: V4(127.0.0.1:8000)
client(s): http://localhost:39347/
Jun 16 10:05:29.307 INFO Using path '/home/crusso/shield/.dfx/state/replicated_state' to manage local⠙ Client bound at 39347
Jun 16 10:05:29.459 INFO Created new persistent consensus pool at: "/home/crusso/shield/.dfx/state/co  Internet Computer client started...
Jun 16 10:05:29.965 INFO Created checkpoint @1 in 466.607µs, StateManager: 1
Jun 16 10:06:04.751 INFO Created checkpoint @62 in 11.236794ms, StateManager: 1
candid UIs
Installing code for canister balance, with canister_id http://localhost:8000/candid?canisterId=ic:273902A4500C55CB4A
Installing code for canister helper, with canister_id http://localhost:8000/candid?canisterId=ic:741A25BA566D480AFA
Installing code for canister helper-1, with canister_id http://localhost:8000/candid?canisterId=ic:F2A23EC4FA64A6912B
Installing code for canister helper-2, with canister_id http://localhost:8000/candid?canisterId=ic:A2DC341951A676D839
Installing code for canister helper-3, with canister_id http://localhost:8000/candid?canisterId=ic:FFD3E0C0F98D6E3BE2
Installing code for canister helper-4, with canister_id http://localhost:8000/candid?canisterId=ic:7242ED4E05DCA726BC
Installing code for canister helper-5, with canister_id http://localhost:8000/candid?canisterId=ic:1552FA5B6E629529DD
Installing code for canister helper-6, with canister_id http://localhost:8000/candid?canisterId=ic:E7070FA2FC8E77E954
Installing code for canister helper-7, with canister_id http://localhost:8000/candid?canisterId=ic:0E2A5C13FBB6190A55
Installing code for canister helper-8, with canister_id http://localhost:8000/candid?canisterId=ic:00F0E6064FFF2495DB
Installing code for canister helper-9, with canister_id http://localhost:8000/candid?canisterId=ic:7BBEA1624A6B3842D6
Installing code for canister shield, with canister_id http://localhost:8000/candid?canisterId=ic:56D5C131F0DB675F74
Installing code for canister tokenomics, with canister_id http://localhost:8000/candid?canisterId=ic:D9228284B55A986842
Installing code for canister user, with canister_id http://localhost:8000/candid?canisterId=ic:17D0A07AFB6974A73A
Installing code for canister user-1, with canister_id http://localhost:8000/candid?canisterId=ic:BDD958C3E16C614F11
Installing code for canister user-2, with canister_id http://localhost:8000/candid?canisterId=ic:88B963E504BB8205D3
Installing code for canister user-3, with canister_id http://localhost:8000/candid?canisterId=ic:1AEC6060EC734941E9
Installing code for canister user-4, with canister_id http://localhost:8000/candid?canisterId=ic:C4FB57E2BAD063B02E
Installing code for canister user-5, with canister_id http://localhost:8000/candid?canisterId=ic:C57CA8ECF427F8C546
Installing code for canister user-6, with canister_id http://localhost:8000/candid?canisterId=ic:85036F01B3D72E9538
Installing code for canister user-7, with canister_id http://localhost:8000/candid?canisterId=ic:4D1ADCCC754F001765
Installing code for canister user-8, with canister_id http://localhost:8000/candid?canisterId=ic:B9669300EE6A04ABA2
Installing code for canister user-9, with canister_id http://localhost:8000/candid?canisterId=ic:E5303B134B349A6628
frontend UIs
Installing code for canister balance, with canister_id http://localhost:8000/?canisterId=ic:273902A4500C55CB4A
Installing code for canister helper, with canister_id http://localhost:8000/?canisterId=ic:741A25BA566D480AFA
Installing code for canister helper-1, with canister_id http://localhost:8000/?canisterId=ic:F2A23EC4FA64A6912B
Installing code for canister helper-2, with canister_id http://localhost:8000/?canisterId=ic:A2DC341951A676D839
Installing code for canister helper-3, with canister_id http://localhost:8000/?canisterId=ic:FFD3E0C0F98D6E3BE2
Installing code for canister helper-4, with canister_id http://localhost:8000/?canisterId=ic:7242ED4E05DCA726BC
Installing code for canister helper-5, with canister_id http://localhost:8000/?canisterId=ic:1552FA5B6E629529DD
Installing code for canister helper-6, with canister_id http://localhost:8000/?canisterId=ic:E7070FA2FC8E77E954
Installing code for canister helper-7, with canister_id http://localhost:8000/?canisterId=ic:0E2A5C13FBB6190A55
Installing code for canister helper-8, with canister_id http://localhost:8000/?canisterId=ic:00F0E6064FFF2495DB
Installing code for canister helper-9, with canister_id http://localhost:8000/?canisterId=ic:7BBEA1624A6B3842D6
Installing code for canister shield, with canister_id http://localhost:8000/?canisterId=ic:56D5C131F0DB675F74
Installing code for canister tokenomics, with canister_id http://localhost:8000/?canisterId=ic:D9228284B55A986842
Installing code for canister user, with canister_id http://localhost:8000/?canisterId=ic:17D0A07AFB6974A73A
Installing code for canister user-1, with canister_id http://localhost:8000/?canisterId=ic:BDD958C3E16C614F11
Installing code for canister user-2, with canister_id http://localhost:8000/?canisterId=ic:88B963E504BB8205D3
Installing code for canister user-3, with canister_id http://localhost:8000/?canisterId=ic:1AEC6060EC734941E9
Installing code for canister user-4, with canister_id http://localhost:8000/?canisterId=ic:C4FB57E2BAD063B02E
Installing code for canister user-5, with canister_id http://localhost:8000/?canisterId=ic:C57CA8ECF427F8C546
Installing code for canister user-6, with canister_id http://localhost:8000/?canisterId=ic:85036F01B3D72E9538
Installing code for canister user-7, with canister_id http://localhost:8000/?canisterId=ic:4D1ADCCC754F001765
Installing code for canister user-8, with canister_id http://localhost:8000/?canisterId=ic:B9669300EE6A04ABA2
Installing code for canister user-9, with canister_id http://localhost:8000/?canisterId=ic:E5303B134B349A6628
Request ID: 0xdb811e0e2e656c38dc52b5faea27e2042a096c7317655cbe1adc2bc1045470b3
Request ID: 0x177710476526c115f77791a0b56e114ef1100da5950006b5d0ead24852a65a91
Request ID: 0x2cd75a66f19c31a163dbb2ac22278031e554ff2ee3f957643ad1f2eb6db1ba74
Request ID: 0xcf6f34001c12146cd6e35b2ed259a3cef2386f801bcc361159e5e8363c589559
crusso@crusso-Virtual-Machine:~/shield$ debug.print: User 0: started user
debug.print: Helper0: started helper
debug.print: User 1: started user
debug.print: Helper1: started helper
debug.print: User 0: registered user
debug.print: Helper0: registered helper
debug.print: User 1: registered user
debug.print: Helper1: registered helper
debug.print: User 0: posted request 0
thread 'executor/ThreadId(9)/thread' panicked at '> instance 0x7eff17fd6000 had fatal error: fault FATAL TrapCode::UNKNOWN code at address 0x56367af264be (symbol replica:_ZN23lucet_runtime_internals5vmctx19instance_from_vmctx17hc6a1115e36fcb781E) (not inside module code) triggered by Segmentation fault:  accessed memory at 0x7f0117fd7fb8 (inside heap guard)', /sources/lucet-runtime-internals-0.6.1/src/instance.rs:1196:5
  Replica exited with signal: 6
⠁ Terminating...
An error occured:
RuntimeError(
    Custom {
        kind: Other,
        error: "Failed to stop server: ()",
    },
)
```


# Generic Instructions


# shield

Welcome to your new shield project and to the internet computer development community. By default, creating a new project adds this README and some template files to your project directory. You can edit these template files to customize your project and to include your own code to speed up the development cycle.

To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working with shield, see the following documentation available online:

- [Quick Start](https://sdk.dfinity.org/docs/developers-guide/quickstart.html)
- [Developer's Guide](https://sdk.dfinity.org/docs/developers-guide)
- [Language Reference](https://sdk.dfinity.org/docs/language-guide/motoko.html)

If you want to start working on your project right away, you might want to try the following commands:

```bash
cd shield/
dfx help
dfx config --help
```

# Getting the code

```bash
git clone git@github.com:crusso/shield.git
```

Creating a new branch from current branch (initially master)

```bash
git checkout -b mybranch
```

...edit files...

add (all) modified files to be commited

```bash
git add -u
```
commit the changes locally to your branch:
```bash
git commit -m "<some description>"
```

pushing local changes to branch on GitHub (so others can see it)

```bash
git push
```

(follow the instructions the first time you do this)


GitHub will show you that you can create a pull request for your new branch (to merge it into master).


Rinse and repeat.


Change branch

eg.

```bash
git checkout master
```

Pull remote changes to master (and other branches) to local repository

```bash
git pull
```



# Building

```bash
crusso@crusso-Virtual-Machine:~/shield$ dfx build
Building canisters...
Building frontend...
Bundling assets with canisters...
```

# Running

Start the replica

```bash
crusso@crusso-Virtual-Machine:~/shield$ dfx start --background
⠁ Starting up the replica...
May 29 11:04:03.304 INFO Dfinity Replica Started
May 29 11:04:03.308 INFO Generated node ID: 100
replica address: "http://localhost:36421"
binding to: V4(127.0.0.1:8000)
replica(s): http://localhost:36421/
May 29 11:04:03.310 INFO Using path '/home/crusso/shield/.dfx/state/replicated_state' to manage local⠙ Replica bound at 36421
May 29 11:04:03.462 INFO Created new persistent consensus pool at: "/home/crusso/shield/.dfx/state/co  Internet Computer replica started...
crusso@crusso-Virtual-Machine:~/shield$ May 29 11:04:03.971 INFO Created checkpoint @1 in 378.505µs, StateManager: 1
```
# Canister installation

```bash
crusso@crusso-Virtual-Machine:~/shield$ dfx canister install shield
Installing code for canistexr shield, with canister_id ic:34D619859D066E8424
crusso@crusso-Virtual-Machine:~/shield$ firefox May 29 11:05:06.236 INFO Created checkpoint @123 in 1.616721ms, StateManager: 1
May 29 11:05:19.866 WARN Could not perform query on canister: IC0301: Canister ic:E2193467419566CA5E not found, Application: Http Handler
May 29 11:05:37.174 INFO Created checkpoint @184 in 1.410319ms, StateManager: 1
```
Note that dfx reports a canister_id - you'll need to use the actuall ID (not the ondisplayed here) in the following URLs

# Opening candid UI

E.g. (but using the actual canister ID returned on installation)

```bash
crusso@crusso-Virtual-Machine:~/shield$ firefox http://localhost:8000/candid?canisterId=ic:34D619859D066E8424
```

# Opening canister frontend UI

E.g. (but using the actual canister ID returned on installation)

```bash
crusso@crusso-Virtual-Machine:~/shield$ firefox http://localhost:8000/canisterId=ic:34D619859D066E8424
```

# Test Script

```bash
./run.sh
```

Runs a little test script that starts dfx, installs all canisters, and starts some user canisters.

