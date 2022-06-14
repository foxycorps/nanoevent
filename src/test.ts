import Hive from './index';

const theHive = Hive();
const log = console.log;

const setupListeners = () => {
    log("Setting up listeners");
    theHive.on('first', () => {
        log("Got a message on CHANNEL: 'first'");
    })
    theHive.on('second', () => {
        log("Got a message on CHANNEL: 'second'");
    })
    theHive.on('third', () => {
        log("Got a message on CHANNEL: 'third'");
    });

    theHive.on('*', () => {
        log("ANY!")
    })
    log("Done setting up");
};
const talk = () => {
    log("Speaking");
    const channels = ['first', 'second', 'third'];
    const selectedChannel = channels[Math.floor(Math.random() * channels.length)];
    theHive.emit(selectedChannel);
};

const main = () => {
    setupListeners();

    for (const i of Array(3)) {
        setTimeout(() => talk(), 1000)
    }

    console.log("\n\n\n");
    log(theHive)
};

main();