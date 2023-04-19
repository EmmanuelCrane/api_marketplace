import app from './app';

async function init() {
    const serverApp = await app();
    serverApp.listen(3000, () => console.log('server on port 300'));
}

init();