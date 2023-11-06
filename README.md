# Api with solid

Gympass style app.

## RF's (Functional Requirements)

- [X] It must be possible to sign up;
- [X] It must be possible to authenticate;
- [X] It must be possible to retrieve the profile of a logged-in user;
- [X] It must be possible to retrieve the number of check-ins performed by the logged-in user;
- [X] It must be possible for the user to retrieve their check-in history;
- [X] It must be possible for the user to search for nearby gyms (less 10km);
- [X] It must be possible for the user to search for gyms by name;
- [X] It must be possible for the user to check in at a gym;
- [X] It must be possible to validate a user's check-in;
- [X] It must be possible to register a gym.

## RN's (Business Rules)

- [X] The user must not be able to sign up with a duplicate email (already existing in the database);
- [X] The user cannot perform 2 check-ins on the same day;
- [X] The user cannot check in if not close (within 100m) to the gym;
- [X] The check-in can only be validated up to 20 minutes after being created;
- [ ] The check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators.

## RNF's (Non-Functional Requirements)

- [X] The user's password needs to be encrypted;
- [X] The application data needs to be persisted in a PostgreSQL database;
- [X] All data lists need to be paginated with 20 items per page;
- [ ] The user must be identified by a JSON Web Token (JWT).

## Setup

- run "docker compose up -d"
