# Api with solid

Gympass style app.

## RF's (Functional Requirements)

- [x] It must be possible to sign up;
- [x] It must be possible to authenticate;
- [x] It must be possible to retrieve the profile of a logged-in user;
- [x] It must be possible to retrieve the number of check-ins performed by the logged-in user;
- [x] It must be possible for the user to retrieve their check-in history;
- [x] It must be possible for the user to search for nearby gyms (less 10km);
- [x] It must be possible for the user to search for gyms by name;
- [x] It must be possible for the user to check in at a gym;
- [x] It must be possible to validate a user's check-in;
- [x] It must be possible to register a gym.

## RN's (Business Rules)

- [x] The user must not be able to sign up with a duplicate email (already existing in the database);
- [x] The user cannot perform 2 check-ins on the same day;
- [x] The user cannot check in if not close (within 100m) to the gym;
- [x] The check-in can only be validated up to 20 minutes after being created;
- [X] The check-in can only be validated by administrators;
- [X] The gym can only be registered by administrators.

## RNF's (Non-Functional Requirements)

- [x] The user's password needs to be encrypted;
- [x] The application data needs to be persisted in a PostgreSQL database;
- [x] All data lists need to be paginated with 20 items per page;
- [X] The user must be identified by a JSON Web Token (JWT).

## Setup

- run npm install --global yarn
- run "docker compose -p api-solid up -d"
