import '@testing-library/jest-dom';
import 'whatwg-fetch';

import { server } from './src/mocks/server'
import { afterEach } from 'node:test';


beforeAll(async () => {
    await server.listen();
    console.log('Mock server is listening...')
});


afterAll(async () => {
    await server.close();
});