from marshmallow import Schema, fields

class userRegisterSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)
    