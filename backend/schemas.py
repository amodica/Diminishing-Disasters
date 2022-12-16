from flask_marshmallow import Marshmallow
from marshmallow import fields
from models import Disaster, Country, Organization
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field

ma = Marshmallow()


class CountrySchema(ma.Schema):
    class Meta:
        ordered = True

    id = fields.Integer(required=True)
    name = fields.String(required=True)
    code = fields.String(required=True)
    capital = fields.String(required=True)
    languages = fields.String(required=True)
    area = fields.Integer(required=True)
    population = fields.Integer(required=True)
    currencies = fields.String(required=True)
    region = fields.String(required=True)
    subregion = fields.String(required=True)
    timezones = fields.String(required=True)
    flags = fields.String(required=True)
    maps = fields.String(required=True)

    organizations = fields.List(
        fields.Nested(
            lambda: OrganizationSchema(
                only=(
                    "id",
                    "name",
                    "cause",
                    "score",
                )
            )
        )
    )
    disasters = fields.List(
        fields.Nested(
            lambda: DisasterSchema(
                only=(
                    "id",
                    "name",
                    "disaster_type",
                )
            )
        )
    )


class CountryInstanceSchema(ma.Schema):
    class Meta:
        ordered = True

    id = fields.Integer(required=True)
    name = fields.String(required=True)
    languages = fields.String(required=True)
    population = fields.Integer(required=True)
    currencies = fields.String(required=True)
    region = fields.String(required=True)
    subregion = fields.String(required=True)
    flags = fields.String(required=True)


class DisasterSchema(ma.Schema):
    class Meta:
        ordered = True

    id = fields.Integer(required=True)
    name = fields.String(required=True)
    status = fields.String(required=True)
    year = fields.Integer(required=True)
    month = fields.String(required=True)
    relief_id = fields.Integer(required=True)
    glide = fields.String(required=True)
    description = fields.String(required=True)
    disaster_type = fields.String(required=True)
    primary = fields.String(required=True)
    infographic = fields.String(required=True)
    icon = fields.String(required=True)

    countries_affected = fields.List(
        fields.Nested(
            CountrySchema(
                only=(
                    "id",
                    "name",
                )
            )
        )
    )
    organizations_assisting = fields.List(
        fields.Nested(
            lambda: OrganizationSchema(
                only=(
                    "id",
                    "name",
                    "cause",
                    "score",
                )
            )
        )
    )


class DisasterInstanceSchema(ma.Schema):
    class Meta:
        ordered = True

    id = fields.Integer(required=True)
    name = fields.String(required=True)
    status = fields.String(required=True)
    year = fields.Integer(required=True)
    month = fields.String(required=True)
    glide = fields.String(required=True)
    disaster_type = fields.String(required=True)
    primary = fields.String(required=True)
    icon = fields.String(required=True)


class OrganizationSchema(ma.Schema):
    class Meta:
        ordered = True

    id = fields.String(required=True)
    name = fields.String(required=True)
    logo = fields.String(required=True)
    ein = fields.Integer(required=True)
    score = fields.Float(required=True)
    rating = fields.Float(required=True)
    category = fields.String(required=True)
    cause = fields.String(required=True)
    income = fields.Float(required=True)
    tagline = fields.String(required=True)
    url = fields.String(required=True)
    address = fields.String(required=True)
    video = fields.String(required=True)

    countries_operating_in = fields.List(
        fields.Nested(
            CountrySchema(
                only=(
                    "id",
                    "name",
                )
            )
        )
    )
    disasters_assisted_in = fields.List(
        fields.Nested(
            DisasterSchema(
                only=(
                    "id",
                    "name",
                    "disaster_type",
                )
            )
        )
    )


class OrganizationInstanceSchema(ma.Schema):
    class Meta:
        ordered = True

    id = fields.String(required=True)
    name = fields.String(required=True)
    logo = fields.String(required=True)
    score = fields.Float(required=True)
    rating = fields.Float(required=True)
    category = fields.String(required=True)
    cause = fields.String(required=True)
    income = fields.Float(required=True)


country_schema = CountrySchema()
disaster_schema = DisasterSchema()
organization_schema = OrganizationSchema()
country_instance_schema = CountryInstanceSchema()
disaster_instance_schema = DisasterInstanceSchema()
organization_instance_schema = OrganizationInstanceSchema()
