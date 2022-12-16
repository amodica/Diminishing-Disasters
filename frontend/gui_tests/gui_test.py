import pytest
from sys import platform
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver import Remote
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

import os
import time

driver = None
wait = None
base_url = "https://dev.d31i7ifarbmwii.amplifyapp.com/"

# Inspired by bevoscourseguide.me here: https://gitlab.com/bevos-crew/bevos-course-guide/-/blob/main/frontend/guitests/gui_test.py
def setup_module(module):
    global driver, wait
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--window-size=1920,1080')
    # use this driver for CI
    driver = Remote("http://selenium__standalone-chrome:4444/wd/hub", desired_capabilities=options.to_capabilities())
    driver.get(base_url)
    wait = WebDriverWait(driver, 30)

def teardown_module(module):
    driver.quit()

# Test 1
def test_check_title_page():
    driver.get(base_url)
    assert driver.title == "Diminishing Disasters"

# Test 2
def test_check_navbar_home_page():
    driver.get(base_url)
    time.sleep(1)
    homeTab = driver.find_element_by_xpath("/html/body/div/div[1]/nav/div/div/div/a[1]")
    assert homeTab

# Test 3
def test_check_navbar_about_page():
    driver.get(base_url)
    time.sleep(1)
    aboutTab = driver.find_element_by_xpath("/html/body/div/div[1]/nav/div/div/div/a[2]")
    assert aboutTab

# Test 4
def test_go_to_about_page():
    driver.get(base_url)
    time.sleep(1)
    navbar_about_page_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div[1]/nav/div/div/div/a[2]")))
    navbar_about_page_button.click()
    assert navbar_about_page_button

# Test 5
def test_go_to_countries_model():
    driver.get(base_url)
    time.sleep(1)
    navbar_countries_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div[1]/nav/div/div/div/a[3]")))
    navbar_countries_button.click()
    assert navbar_countries_button

# Test 6
def test_go_to_disasters_model():
    driver.get(base_url)
    navbar_disasters_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div[1]/nav/div/div/div/a[4]")))
    navbar_disasters_button.click()
    assert navbar_disasters_button

# Test 7
def test_go_to_orgs_model():
    driver.get(base_url)
    navbar_orgs_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div[1]/nav/div/div/div/a[5]")))
    navbar_orgs_button.click()
    assert navbar_orgs_button

# Test 8
def test_go_to_countries_model_to_countries_instance():
    driver.get(base_url)
    time.sleep(2)
    navbar_countries_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div[1]/nav/div/div/div/a[3]")))
    navbar_countries_button.click()
    instance = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div/div/div[5]/table/tbody/a[1]")))
    instance.click()
    assert instance

# Test 9
def test_go_to_disasters_model_to_disasters_instance():
    driver.get(base_url)
    time.sleep(2)
    navbar_disasters_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div[1]/nav/div/div/div/a[4]")))
    navbar_disasters_button.click()
    instance = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div/div/div[5]/table/tbody/a[1]")))
    instance.click()
    assert instance

# Test 10
def test_go_to_orgs_model_to_orgs_instance():
    driver.get(base_url)
    time.sleep(2)
    navbar_orgs_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div[1]/nav/div/div/div/a[5]")))
    navbar_orgs_button.click()
    instance = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div/div/div[5]/table/tbody/a[1]")))
    instance.click()
    assert instance

# Test 11
def test_sort_countries_by_population():
    driver.get(base_url)
    navbar_countries_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div/nav/div/div/div/a[3]")))
    navbar_countries_button.click()
    sort_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div/div/div[3]/div[1]/button")))
    sort_button.click()
    population_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div/div/div[3]/div[1]/div/a[3]")))
    population_button.click()
    assert population_button

# Test 12
def test_filter_disasters_by_flash_flood():
    driver.get(base_url)
    navbar_disasters_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div/nav/div/div/div/a[4]")))
    navbar_disasters_button.click()
    disaster_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div/div/div[3]/div[3]/button")))
    disaster_button.click()
    flashFlood_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div/div/div[3]/div[3]/div/a[3]")))
    flashFlood_button.click()
    assert flashFlood_button
    
# Test 13
def test_sort_orgs_by_income():
    driver.get(base_url)
    navbar_orgs_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div/nav/div/div/div/a[5]")))
    navbar_orgs_button.click()
    sort_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div/div/div[3]/div[1]/button")))
    sort_button.click()
    income_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div/div/div[3]/div[1]/div/a[4]")))
    income_button.click()
    assert income_button

# Test 14
def test_sort_orgs_by_score():
    driver.get(base_url)
    navbar_orgs_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div/nav/div/div/div/a[5]")))
    navbar_orgs_button.click()
    sort_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div/div/div[3]/div[1]/button")))
    sort_button.click()
    score_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div/div/div[3]/div[1]/div/a[3]")))
    score_button.click()
    assert score_button

# Test 15
def test_search_page():
    driver.get(base_url)
    time.sleep(2)
    navbar_search_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div/nav/div/div/div/a[8]")))
    navbar_search_button.click()
    search_button = wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/div/div/div/div[1]/button")))
    search_button.click()
    assert search_button
