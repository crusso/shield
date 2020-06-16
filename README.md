# shield

Project Shield is a POC volunteering app, matching helpers/volunteers with users, requiring assistance (for shopping requests).

[Screenshot](./images/shield.png)


[Supporting materials](https://drive.google.com/drive/folders/1XYAEynOAmfndBrFJzErdAYPyOF3b_27t)

[Video](https://drive.google.com/file/d/1Y2Vmm9DxZuv0Psp2bopxq7nPrEjJInMS/view?usp=sharing)


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

