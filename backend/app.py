from models import (
    app,
    db,
    Country,
    Disaster,
    Organization,
)
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
    country_instance_schema,
    disaster_instance_schema,
    organization_instance_schema,
)
import flask_sqlalchemy
import math
from flask import jsonify, request
from Country import *
from Disaster import *
from Organization import *

RowsPerPage = 10


@app.route("/")
def hello_world():
    return '<img src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg" alt="cowboy" />'


@app.route("/countries")
def get_countries():
    page = request.args.get("page", default=1, type=int)

    queries = request.args.to_dict(flat=False)
    query = db.session.query(Country)

    # Searching
    q = request.args.get("q", default=None)
    query = search_countries(query, q)

    # Filtering
    query = filter_countries(query, queries)

    # Sorting
    sort = request.args.get("sort", default=None)
    query = sort_countries(sort, query)
    count = query.count()

    if count < (page * RowsPerPage):
        page = math.ceil(count / RowsPerPage)
    countries = query.paginate(page=page, per_page=RowsPerPage)

    result = country_instance_schema.dump(countries.items, many=True)

    return jsonify({"total": count, "countries": result})


@app.route("/countries/<int:id>")
def get_country(id):
    query = db.session.query(Country).filter_by(id=id)
    result = country_schema.dump(query, many=True)[0]
    return jsonify(result)


@app.route("/disasters")
def get_disasters():
    page = request.args.get("page", default=1, type=int)

    queries = request.args.to_dict(flat=False)
    query = db.session.query(Disaster)

    # Searching
    q = request.args.get("q", default=None)
    query = search_disasters(query, q)

    # Filtering
    query = filter_disasters(query, queries)

    # Sorting
    sort = request.args.get("sort", default=None)
    query = sort_disasters(sort, query)
    count = query.count()

    if count < (page * RowsPerPage):
        page = math.ceil(count / RowsPerPage)
    disasters = query.paginate(page=page, per_page=RowsPerPage)

    result = disaster_instance_schema.dump(disasters.items, many=True)

    return jsonify({"total": count, "disasters": result})


@app.route("/disasters/<int:id>")
def get_disaster(id):
    query = db.session.query(Disaster).filter_by(id=id)
    result = disaster_schema.dump(query, many=True)[0]
    return jsonify(result)


@app.route("/organizations")
def get_organizations():
    page = request.args.get("page", default=1, type=int)

    queries = request.args.to_dict(flat=False)
    query = db.session.query(Organization)

    # Searching
    q = request.args.get("q", default=None)
    query = search_organizations(query, q)

    # Filtering
    query = filter_organizations(query, queries)

    # Sorting
    sort = request.args.get("sort", default=None)
    query = sort_organizations(sort, query)

    count = query.count()

    if count < (page * RowsPerPage):
        page = math.ceil(count / RowsPerPage)
    organizations = query.paginate(page=page, per_page=RowsPerPage)

    result = organization_instance_schema.dump(organizations.items, many=True)

    return jsonify({"total": count, "organizations": result})


@app.route("/organizations/<int:id>")
def get_organization(id):
    query = db.session.query(Organization).filter_by(id=id)
    result = organization_schema.dump(query, many=True)[0]
    return jsonify(result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
