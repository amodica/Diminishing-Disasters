import os
import json
from models import db, Country, Disaster, Organization, link_organizations_disasters
from schemas import (
    DisasterSchema,
    CountrySchema,
    OrganizationSchema,
    country_schema,
    disaster_schema,
    organization_schema,
)
from tqdm import tqdm
from flask import jsonify


def reset_db():
    db.session.remove()
    db.drop_all()
    db.create_all()
    print("Database reset")


def populate_countries():

    f = open("./data/countries.json", encoding="utf-8")
    data = json.load(f)

    for i in tqdm(range(0, len(data["countries"]))):
        country = data["countries"][i]
        entry = dict()
        entry["id"] = country["id"]
        entry["name"] = country["name"]

        # code not always present
        if "code" in country:
            entry["code"] = country["code"]
        else:
            entry["code"] = None

        # capital not always present
        if "capital" in country:
            # entry["capital"] = ', '.join(country["capital"])
            entry["capital"] = country["capital"]
        else:
            entry["capital"] = None

        # entry["languages"] = ', '.join(country["languages"])
        entry["languages"] = country["languages"]
        entry["area"] = country["area"]
        entry["population"] = country["population"]

        # if len(country["currencies"]) > 0:
        #     entry["currencies"] = country["currencies"][0]["name"]
        # else:
        #     entry["currencies"] = None

        if "currencies" in country:
            entry["currencies"] = country["currencies"]
        else:
            entry["currencies"] = None

        entry["region"] = country["region"]

        # subregion not always present
        if "subregion" in country:
            entry["subregion"] = country["subregion"]
        else:
            entry["subregion"] = None

        # entry["timezones"] = ', '.join(country["timezones"])
        entry["timezones"] = country["timezones"]
        entry["flags"] = country["flags"]
        entry["maps"] = country["maps"]

        country_db_instance = Country(**entry)
        db.session.add(country_db_instance)

    f.close()


def populate_disasters():
    f = open("./data/disasters.json", encoding="utf-8")
    data = json.load(f)

    for i in tqdm(range(0, len(data["disasters"]))):
        disaster = data["disasters"][i]
        entry = dict()
        entry["id"] = disaster["id"]
        entry["relief_id"] = disaster["relief_id"]
        entry["name"] = disaster["name"]
        entry["status"] = disaster["status"]
        entry["year"] = disaster["year"]
        entry["month"] = disaster["month"]

        # glide not always present
        if "glide" in disaster:
            entry["glide"] = disaster["glide"]
        else:
            entry["glide"] = None

        entry["description"] = disaster["description"]
        entry["disaster_type"] = disaster["disaster_type"]
        entry["primary"] = disaster["primary"]

        if "infographic" in disaster:
            # entry["infographic"] = infographics["infographics"][i]["url"]
            entry["infographic"] = disaster["infographic"]
        else:
            entry["infographic"] = None

        if "icon" in disaster:
            # entry["icon"] = icons["icons"][i]["url"]
            entry["icon"] = disaster["icon"]
        else:
            entry["icon"] = None

        disaster_db_instance = Disaster(**entry)

        # adding countries into disasters
        for count in disaster["countries_affected"]:
            count_id = count["id"]
            count_orm = db.session.query(Country).filter_by(id=count_id).first()
            if count_orm:
                disaster_db_instance.countries_affected.append(count_orm)

        db.session.add(disaster_db_instance)

    f.close()


def populate_organizations():
    f = open("./data/charities.json", encoding="utf-8")
    data = json.load(f)

    for i in tqdm(range(0, len(data["charities"]))):
        org = data["charities"][i]
        entry = dict()
        entry["id"] = org["id"]
        entry["name"] = org["name"]
        entry["logo"] = org["logo"]
        entry["ein"] = org["ein"]
        entry["score"] = org["score"]
        entry["rating"] = org["rating"]
        entry["category"] = org["category"]
        entry["cause"] = org["cause"]
        entry["income"] = org["income"]
        entry["tagline"] = org["tagline"]
        entry["url"] = org["url"]
        entry["address"] = org["address"]
        entry["video"] = org["video"]

        org_db_instance = Organization(**entry)

        # adding countries into orgs
        for count in org["countries_operating_in"]:
            count_id = count["id"]
            count_orm = db.session.query(Country).filter_by(id=count_id).first()
            if count_orm:
                org_db_instance.countries_operating_in.append(count_orm)

        db.session.add(org_db_instance)

    f.close()


# code from Martijn Pieters from Stack Overflow to easily get unique pairs
# https://stackoverflow.com/questions/27374273/how-make-unique-a-list-of-nested-dictionaries-in-python
def set_from_dict(d):
    return frozenset(
        (k, set_from_dict(v) if isinstance(v, dict) else v) for k, v in d.items()
    )


def link_organization_disaster():
    f = open("./data/charities.json", encoding="utf-8")
    g = open("./data/countries.json", encoding="utf-8")
    data = json.load(f)
    data2 = json.load(g)
    list_pairs = []

    for i in tqdm(range(0, len(data["charities"]))):
        org = data["charities"][i]
        org_id = org["id"]
        for country in org["countries_operating_in"]:
            country_id = country["id"]
            disaster_data = data2["countries"][country_id - 1]
            for disaster in disaster_data["disasters"]:
                dis_id = disaster["id"]
                cur_pair = {"organization_id": org_id, "disaster_id": dis_id}
                list_pairs.append(cur_pair)
    f.close()
    g.close()
    seen = set()
    result = []
    for d in list_pairs:
        representation = set_from_dict(d)
        if representation in seen:
            continue
        result.append(d)
        seen.add(representation)
    db.session.execute(link_organizations_disasters.insert(), result)
    db.session.commit()


if __name__ == "__main__":
    print("Populating database...")
    reset_db()
    print("Populating countries...")
    populate_countries()
    db.session.commit()
    print("Populating disasters...")
    populate_disasters()
    db.session.commit()
    print("Populating organizations...")
    populate_organizations()
    db.session.commit()
    print("Adding links from organizations to disasters...")
    link_organization_disaster()
    print("Added data!")
