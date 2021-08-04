This is just me calculating how much space n users would take in the database, you can ignore it. The sizes are based on the [official PostgreSQL documentation](https://www.postgresql.org/docs/9.5/datatype-numeric.html).
Size is measured in bytes:

id: 4
email: 254 maximum (given that char === 1 byte and the maximum length of an email address is 254)
username: 35
password: 64
tokenVersion: 4
serverId: 2
avatarId: 2
bio: ???
age: 2
confirmed: 1
memberSince: 8
emailPrivate: 1
provider: 8
unameLastUpdate: 8

```
let n = 9900
(258 + 35 + 64 + 4 + 2 + 2 + 600 + 2 + 1 + 8 + 1 + 8 + 8) * n = 9830700 bytes = 0.0098307 GB where n is the number of users;
```

Well then 1GB(heroku postgres free tier) is enough.
