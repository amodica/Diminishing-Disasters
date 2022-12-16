import unittest
from selenium import webdriver

base_url = "https://dev.d31i7ifarbmwii.amplifyapp.com/"

class InputFormsCheck(unittest.TestCase):
 

    #Opening browser.
    def setUp(self):
        self.driver = webdriver.Chrome('./chromedriver.exe')

    def test_go_to_homePage(self):
        self.driver.get(base_url)
        assert self.driver.title == "MusicCity"
  

# This line sets the variable “__name__” to have a value “__main__”.
# If this file is being imported from another module then “__name__” will be set to the other module's name.
if __name__ == "__main__":
    unittest.main()