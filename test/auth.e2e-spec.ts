import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication_System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signUp request',async () => {
    const email = 'asdf@aasdassdf.com'
    const res = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({ email, password: 'asdf' })
          .expect(201);
      const { id, email: email_1 } = res.body;
      expect(id).toBeDefined();
      expect(email_1).toEqual(email_1);
  });
});
