import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;
  beforeEach(async () => {
    // Create a fake copy of the users service
    fakeUserService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });
  it('create a new user with a salted and hashed password', async () => {
    const user = await service.signUp('asdf@gmail.com', 'asdf');
    expect(user.password).not.toEqual('asdf');
    const [salted, hashed] = user.password.split('.');
    expect(salted).toBeDefined();
    expect(hashed).toBeDefined();
  });

  it('throws an error if user signs up with email that is already in use', async (done) => {
    fakeUserService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    try {
      await service.signUp('asddf@gmail.com', 'asdf');
    } catch (err) {
      done();
    }
  });
});
