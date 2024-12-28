import {mockSWAPI, MockServer} from '../utils/mockSWAPI';
import {startWarsClient} from './starwars'
import { AddressInfo } from 'node:net';


describe('Star Wars API Client', () => {
    let mockServer:MockServer | null = null;
   
    beforeEach(async () => {
        mockServer = await mockSWAPI.listen(0)
        const address = mockServer?.address() as AddressInfo;
        startWarsClient.axios.defaults.baseURL = `http://localhost:${address.port}/api`;

    })
    afterEach(() => {
        if (mockServer) {
            mockServer.close();
        }
    });


    it('should fetch a list of Star Wars characters', async () => {
        expect(await startWarsClient.getPeople({
            queries: {
                page: 1
            }
        })).toBeDefined();
    });

    it('should throw an exception when fetching a list of Star Wars characters with page: NaN', async () => {
        await expect(startWarsClient.getPeople({
            queries: {
                page: NaN
            }
        })).rejects.toThrow();
    });
});