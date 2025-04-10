# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout


## profileRequest
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password


## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignore/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/connection
- GET /user/request
- GET /user/feed - Gets you the profiles of other users on platform


status: ignore, interested, accepeted, rejected