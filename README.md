# Api with solid

Gympass style app.

## RF's (Functional Requirements)

- [ ] It must be possible to sign up;
- [ ] It must be possible to authenticate;
- [ ] It must be possible to retrieve the profile of a logged-in user;
- [ ] It must be possible to retrieve the number of check-ins performed by the logged-in user;
- [ ] It must be possible for the user to retrieve their check-in history;
- [ ] It must be possible for the user to search for nearby gyms;
- [ ] It must be possible for the user to search for gyms by name;
- [ ] It must be possible for the user to check in at a gym;
- [ ] It must be possible to validate a user's check-in;
- [ ] It must be possible to register a gym.

## RN's (Business Rules)

- [ ] The user must not be able to sign up with a duplicate email (already existing in the database);
- [ ] The user cannot perform 2 check-ins on the same day;
- [ ] The user cannot check in if not close (within 100m) to the gym;
- [ ] The check-in can only be validated up to 20 minutes after being created;
- [ ] The check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators.

## RNF's (Non-Functional Requirements)

- [ ] The user's password needs to be encrypted;
- [ ] The application data needs to be persisted in a PostgreSQL database;
- [ ] All data lists need to be paginated with 20 items per page;
- [ ] The user must be identified by a JSON Web Token (JWT).
