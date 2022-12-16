import unittest
import requests

STATUS_OK = 200
STATUS_ERROR = 404


class UnitTests(unittest.TestCase):
    def basic_test(self):
        self.assertEqual(1, 1)

    # countries
    def test_countries_status(self):
        response = requests.get("https://api.diminishingdisasters.me/countries")
        self.assertEqual(response.status_code, STATUS_OK)

    # number of countries
    def test_countries_content(self):
        response = requests.get("https://api.diminishingdisasters.me/countries")
        self.assertEqual(response.json()["total"], 250)

    # search for an instance of a country that exists
    def test_countries_instance(self):
        response = requests.get("https://api.diminishingdisasters.me/countries/1")
        self.assertEqual(response.status_code, STATUS_OK)

    # search for an instance of a country that does not exist
    def test_countries_notfound(self):
        response = requests.get("https://api.diminishingdisasters.me/countries/-1")
        self.assertEqual(response.status_code, STATUS_ERROR)
    
    def test_countries_filtering(self):
        response = requests.get("https://api.diminishingdisasters.me/countries?language=spanish")
        self.assertEqual(response.json()["total"], 24)
        self.assertEqual(response.status_code, STATUS_OK)
    
    def test_countries_sorting(self):
        response = requests.get("https://api.diminishingdisasters.me/countries?sort=name")
        self.assertEqual(response.status_code, STATUS_OK)
    
    def test_countries_sorting_and_filtering(self):
        response = requests.get("https://api.diminishingdisasters.me/countries?sort=name&language=spanish")
        self.assertEqual(response.status_code, STATUS_OK)

    # disasters
    def test_disasters_status(self):
        response = requests.get("https://api.diminishingdisasters.me/disasters")
        self.assertEqual(response.status_code, STATUS_OK)

    def test_disasters_content(self):
        response = requests.get("https://api.diminishingdisasters.me/disasters")
        self.assertEqual(response.json()["total"], 3269)

    # search for an instance of a disaster that exists
    def test_disasters_instance(self):
        response = requests.get("https://api.diminishingdisasters.me/disasters/1")
        self.assertEqual(response.status_code, STATUS_OK)
    
    def test_disasters_filtering(self):
        response = requests.get("https://api.diminishingdisasters.me/disasters?month=October")
        self.assertEqual(response.json()["total"], 284)
        self.assertEqual(response.status_code, STATUS_OK)
    
    def test_disasters_sorting(self):
        response = requests.get("https://api.diminishingdisasters.me/disasters?sort=year")
        self.assertEqual(response.status_code, STATUS_OK)
    
    def test_disasters_sorting_and_filtering(self):
        response = requests.get("https://api.diminishingdisasters.me/disasters?sort=year&month=October")
        self.assertEqual(response.status_code, STATUS_OK)

    # search for an instance of a disaster that does not exist
    def test_disasters_notfound(self):
        response = requests.get("https://api.diminishingdisasters.me/disasters/-1")
        self.assertEqual(response.status_code, STATUS_ERROR)

    # organizations
    def test_organizations_status(self):
        response = requests.get("https://api.diminishingdisasters.me/organizations")
        self.assertEqual(response.status_code, STATUS_OK)

    def test_organizations_content(self):
        response = requests.get("https://api.diminishingdisasters.me/organizations")
        self.assertEqual(response.json()["total"], 194)

    # search for an instance of an organization that exists
    def test_organizations_instance(self):
        response = requests.get("https://api.diminishingdisasters.me/organizations/1")
        self.assertEqual(response.status_code, STATUS_OK)
    
    def test_organizations_filtering(self):
        response = requests.get("https://api.diminishingdisasters.me/organizations?rating=3")
        self.assertEqual(response.json()["total"], 7)
        self.assertEqual(response.status_code, STATUS_OK)
    
    def test_organizations_sorting(self):
        response = requests.get("https://api.diminishingdisasters.me/organizations?sort=income")
        self.assertEqual(response.status_code, STATUS_OK)
    
    def test_organizations_sorting_and_filtering(self):
        response = requests.get("https://api.diminishingdisasters.me/organizations?sort=income&rating=3")
        self.assertEqual(response.status_code, STATUS_OK)


    # search for an instance of an organization that does not exist
    def test_organizations_notfound(self):
        response = requests.get("https://api.diminishingdisasters.me/organizations/-1")
        self.assertEqual(response.status_code, STATUS_ERROR)
    
    


if __name__ == "__main__":
    unittest.main()
