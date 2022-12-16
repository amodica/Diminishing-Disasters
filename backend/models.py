from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
from flask_marshmallow import Marshmallow
from marshmallow import fields
import os
import sys

load_dotenv()

app = Flask(__name__)
CORS(app)
# REMEMBER TO CHANGE KEY BEFORE COMMITING!!!
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("AWS_DB_KEY")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JSON_SORT_KEYS"] = False
db = SQLAlchemy(app)

# association tables are here
# Countries <-> Disasters, many-to-many
link_countries_disasters = db.Table(
    "link_countries_disasters",
    db.Column("country_id", db.Integer, db.ForeignKey("country.id"), primary_key=True),
    db.Column(
        "disaster_id", db.Integer, db.ForeignKey("disaster.id"), primary_key=True
    ),
)

# Organizations <-> Countries, many-to-many
link_organizations_countries = db.Table(
    "link_organizations_countries",
    db.Column(
        "organization_id",
        db.Integer(),
        db.ForeignKey("organization.id"),
        primary_key=True,
    ),
    db.Column(
        "country_id", db.Integer(), db.ForeignKey("country.id"), primary_key=True
    ),
)

# Organizations <-> Disasters, many-to-many
link_organizations_disasters = db.Table(
    "link_organizations_disasters",
    db.Column(
        "organization_id",
        db.Integer(),
        db.ForeignKey("organization.id"),
        primary_key=True,
    ),
    db.Column(
        "disaster_id", db.Integer(), db.ForeignKey("disaster.id"), primary_key=True
    ),
)

# models go here
# primary key is unique identifier
# foreign key is relationship between other models
# backref declares a new property of the class
# EX: use country.disaster to get there
class Country(db.Model):
    __tablename__ = "country"
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String())
    code = db.Column(db.String())
    capital = db.Column(db.String())
    languages = db.Column(db.String())
    area = db.Column(db.Integer())
    population = db.Column(db.Integer())
    currencies = db.Column(db.String())
    region = db.Column(db.String())
    subregion = db.Column(db.String())
    timezones = db.Column(db.String())
    flags = db.Column(db.String())
    maps = db.Column(db.String())


class Disaster(db.Model):
    __tablename__ = "disaster"
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String())

    countries_affected = db.relationship(
        "Country",
        secondary=link_countries_disasters,
        backref=db.backref("disasters"),
    )

    relief_id = db.Column(db.Integer())
    status = db.Column(db.String())
    year = db.Column(db.Integer())
    month = db.Column(db.String())
    glide = db.Column(db.String())
    description = db.Column(db.String())
    disaster_type = db.Column(db.String())
    primary = db.Column(db.String())
    infographic = db.Column(db.String())
    icon = db.Column(db.String())


class Organization(db.Model):
    __tablename__ = "organization"
    id = db.Column(db.Integer(), primary_key=True)

    countries_operating_in = db.relationship(
        "Country",
        secondary=link_organizations_countries,
        backref=db.backref("organizations"),
    )

    disasters_assisted_in = db.relationship(
        "Disaster",
        secondary=link_organizations_disasters,
        backref=db.backref("organizations_assisting"),
    )

    name = db.Column(db.String())
    logo = db.Column(db.String())
    ein = db.Column(db.Integer())
    score = db.Column(db.Float())
    rating = db.Column(db.Float())
    category = db.Column(db.String())
    cause = db.Column(db.String())
    income = db.Column(db.Float())
    tagline = db.Column(db.String())
    url = db.Column(db.String())
    address = db.Column(db.String())
    video = db.Column(db.String())
