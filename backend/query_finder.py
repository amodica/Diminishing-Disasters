# from Texas Votes, https://gitlab.com/forbesye/fitsbits/-/blob/master/back-end/query_helpers.py
def get_query(name, queries):
    try:
        return queries[name]
    except KeyError:
        return None
