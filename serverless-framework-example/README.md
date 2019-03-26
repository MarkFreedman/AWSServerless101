# serverless-framework-example

A Serverless Framework example for CRUD operations on DynamoDB.

Add a song:
`curl -X POST https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/music --data '{ "title": "Sara", "artist": "Fleetwood Mac" }'`

Sample response:
`{"id":"618b4190-6917-11e7-82a3-ed6b88661fcb","title":"Sara","artist":"Fleetwood Mac","createdAt":1500093479977,"updatedAt":1500093479977}`

List all songs:
`curl https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/music`

List the details of a specific song (in this case Sara from above):
`curl https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/music/618b4190-6917-11e7-82a3-ed6b88661fcb`

General structure for listing specific song details:
`curl https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/song/id`

Inspired by - https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb