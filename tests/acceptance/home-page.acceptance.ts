import { Client } from '@loopback/testlab';
import { setupApplication } from './test-helper';
import { BolsiyoTechChallengeApplication } from '../..';

describe('HomePage', () => {
  let app: BolsiyoTechChallengeApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('exposes self-hosted explorer', async () => {
    await client
      .get('/explorer/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .expect(/<title>LoopBack API Explorer/);
  });
});
