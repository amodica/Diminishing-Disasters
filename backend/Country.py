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


def search_countries(query, q):
    if q == None:
        return query

    queries = q.split(" ")
    print(queries)

    items = []
    for item in queries:
        items.append(Country.name.ilike("%{}%".format(item)))
        items.append(Country.languages.ilike("%{}%".format(item)))
        items.append(Country.currencies.ilike("%{}%".format(item)))
        items.append(Country.region.ilike("%{}%".format(item)))
        items.append(Country.subregion.ilike("%{}%".format(item)))

    query = query.filter(or_(*tuple(items)))
    return query


def filter_countries(query, queries):
    language = get_query("language", queries)
    currency = get_query("currency", queries)
    region = get_query("region", queries)
    subregion = get_query("subregion", queries)

    if language != None:
        query = query.filter(Country.languages.ilike("%{}%".format(language[0])))

    if currency != None:
        query = query.filter(Country.currencies.ilike("%{}%".format(currency[0])))

    if region != None:
        query = query.filter(Country.region.in_(region))

    if subregion != None:
        query = query.filter(Country.subregion.in_(subregion))

    return query


def sort_countries(sort, query):
    # sort = sort.split("-")

    category = None
    if sort == "name":
        category = Country.name
    elif sort == "population":
        category = Country.population
    else:
        category = Country.id

    return query.order_by(category)
