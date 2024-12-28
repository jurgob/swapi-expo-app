import { AddressInfo } from 'node:net';
import {mockSWAPI} from './mockSWAPI';

describe('Mock SWAPI', () => {
    it('should start a mock server', async () => {
        const mockServer = await mockSWAPI.listen(0);
        expect(mockServer).toBeDefined();
        mockServer.close();
    });   

    it('should start a mock server', async () => {
        const mockServer = await mockSWAPI.listen(0);
        expect(mockServer).toBeDefined();
        const address  = mockServer.address() as AddressInfo;
        expect(address).toHaveProperty('port');
        expect(typeof address?.port).toBe('number');
        mockServer.close();
    });
});