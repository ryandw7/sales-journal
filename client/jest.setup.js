import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { server } from './src/mocks/server'

beforeAll(() => {
    server.listen();
    console.log('Mock server is listening...')
});


afterAll(async () => {
    server.close();
});