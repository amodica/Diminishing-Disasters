from models import app, db, Country, Disaster, Organization
from schemas import (
    DisasterSchema,
    DisasterInstanceSchema,
    CountrySchema,
    CountryInstanceSchema,
    OrganizationSchema,
    OrganizationInstanceSchema,
    country_schema,
    disaster_schema,
    organization_schema,
)
import flask_sqlalchemy
from sqlalchemy import or_
from query_finder import *


def search_organizations(query, q):
    if q == None:
        return query

    queries = q.split(" ")
    print(queries)

    items = []
    for item in queries:
        items.append(Organization.name.ilike("%{}%".format(item)))
        try:
            items.append(Organization.score.in_([int(item)]))
        except ValueError:
            pass
        try:
            items.append(Organization.rating.in_([int(item)]))
        except ValueError:
            pass
        items.append(Organization.category.ilike("%{}%".format(item)))
        items.append(Organization.cause.ilike("%{}%".format(item)))

    query = query.filter(or_(*tuple(items)))
    return query


def filter_organizations(query, queries):
    cause = get_query("cause", queries)
    rating = get_query("rating", queries)

    if cause != None:
        query = query.filter(Organization.cause.in_(cause))

    if rating != None:
        query = query.filter(Organization.rating.in_(rating))

    return query


def sort_organizations(sort, query):
    # sort = sort.split("-")

    category = None
    if sort == "name":
        category = Organization.name
    elif sort == "income":
        category = Organization.income
    elif sort == "score":
        category = Organization.score
    else:
        category = Organization.id

    return query.order_by(category)
