import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { RequestInfo } from 'angular-in-memory-web-api/interfaces';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService implements InMemoryDbService {
  tempUsers: User[];

  constructor() {}

  createDb() {
    const users: User[] = [
      {
        id: 0,
        name: 'Admin',
        surName: ' ',
        city: ' ',
        country: ' ',
        email: 'admin',
        password: 'admin',
        token: 'Admin'
      },
      {
        id: 1,
        name: 'Andrew',
        surName: 'Kowalsky',
        city: 'New York',
        country: 'USA',
        email: 'andrew.kovalsky@yahoo.com',
        password: 'LQEKASB7GAM',
        token: 'User'
      },
      {
        id: 2,
        name: 'Lucia',
        surName: 'Cortez',
        city: 'Mexico City',
        country: 'Mexico',
        email: 'anabanana23@yahoo.com',
        password: 'R9GE6QI55OH',
        token: 'User'
      },
      {
        id: 3,
        name: 'James',
        surName: 'Ford',
        city: 'Melbourne',
        country: 'Australia',
        email: 'aa@aa.au',
        password: 'aaa',
        token: 'User'
      }
    ];
    this.tempUsers = users;
    return{users};
  }

  findUser(email, password, reqInfo) {
    return reqInfo && reqInfo.utils.getDb().users.find(x => x.email === email && x.password === password);
  }

     // HTTP POST interceptor
     post(reqInfo: RequestInfo) {
      // if client pinged api/authentication
      //  then call authenticate (defined below)
      if (reqInfo.collectionName === 'authentication') {
          return this.authenticate(reqInfo);
      }
      //  otherwise default response of In-memory DB
      return undefined;
  }

  // mocking authentication happens here
  // HTTP POST interceptor handler
  private authenticate(reqInfo: RequestInfo) {

      // return an Observable response
      return reqInfo.utils.createResponse$(() => {

          const { headers, url, req } = reqInfo;

          // if request username and password are correct
          //  return response with a JSONWebToken
          const { email, password } = req['body']
          const user = this.findUser(email, password, reqInfo);

          if (user) {
            return {
                status: 200,
                headers, // reqInfo (line 30)
                url, // reqInfo (line 30)
                body: {
                  token: user.token,
                  id: user.id
                }
              };
            }
          //  otherwise return response with status code 401 (unauthorized)
          return {
            status: 401,
            headers,
            url,
            body: { }
          };
      });
  }
}
