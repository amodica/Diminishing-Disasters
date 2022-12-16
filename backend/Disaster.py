from models import app, db, Disaster, Disaster, Organization
from schemas import (
    DisasterSchema,
    DisasterInstanceSchema,
    DisasterSchema,
    DisasterInstanceSchema,
    OrganizationSchema,
    OrganizationInstanceSchema,
    country_schema,
    disaster_schema,
    organization_schema,
)
import flask_sqlalchemy
from sqlalchemy import or_
from query_finder import *


def search_disasters(query, q):
    if q == None:
        return query

    queries = q.split(" ")
    print(queries)

    items = []
    for item in queries:
        items.append(Disaster.name.ilike("%{}%".format(item)))
        items.append(Disaster.month.ilike("%{}%".format(item)))
        items.append(Disaster.glide.ilike("%{}%".format(item)))
        items.append(Disaster.disaster_type.ilike("%{}%".format(item)))
        items.append(Disaster.primary.ilike("%{}%".format(item)))

    query = query.filter(or_(*tuple(items)))
    return query


def filter_disasters(query, queries):
    status = get_query("status", queries)
    disaster_type = get_query("type", queries)
    month = get_query("month", queries)
    primary = get_query("primary", queries)

    if status != None:
        query = query.filter(Disaster.status.in_(status))

    if disaster_type != None:
        query = query.filter(Disaster.disaster_type.in_(disaster_type))

    if month != None:
        query = query.filter(Disaster.month.in_(month))

    if primary != None:
        query = query.filter(Disaster.primary.in_(primary))

    return query


def sort_disasters(sort, query):
    # sort = sort.split("-")

    category = None
    if sort == "name":
        category = Disaster.name
    elif sort == "year":
        category = Disaster.year
    else:
        category = Disaster.id

    return query.order_by(category)
