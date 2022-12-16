import os
import json
from models import db, Country, Disaster, Organization, link_organizations_disasters
from tqdm import tqdm
from flask import jsonify

# code from Martijn Pieters from Stack Overflow to easily get unique pairs
# https://stackoverflow.com/questions/27374273/how-make-unique-a-list-of-nested-dictionaries-in-python
def set_from_dict(d):
    return frozenset(
        (k, set_from_dict(v) if isinstance(v, dict) else v) for k, v in d.items()
    )


def link_organizations_disasters1():
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
    link_organizations_disasters1()
