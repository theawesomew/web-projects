from time import sleep
from selenium import webdriver

options = webdriver.ChromeOptions()
driver = webdriver.Chrome('chromedriver.exe',options=options)
driver.maximize_window()
driver.get("https://www.instagram.com")
sleep(3)
driver.find_element_by_xpath("/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div[2]/div/label/input").send_keys("willkennedyyyy")
driver.find_element_by_xpath("/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div[3]/div/label/input").send_keys("theawesomew")
driver.find_element_by_xpath("/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div[4]/button/div").click()
sleep(3)
driver.find_element_by_xpath("/html/body/div[4]/div/div/div[3]/button[2]").click()
driver.find_element_by_xpath("/html/body/div[1]/section/nav/div[2]/div/div/div[3]/div/div[2]/a").click()
sleep(3)
driver.find_element_by_xpath("/html/body/div[1]/section/div/div[2]/div/div/div[1]/div[3]/div/div/div/div/div[3]/a").click()
sleep(3)
for line in open('annoy_gemma.txt'):
    line = line.strip()
    if line != "":
        driver.find_element_by_xpath("/html/body/div[1]/section/div/div[2]/div/div/div[2]/div[2]/div/div[2]/div/div/div[2]/textarea").send_keys(line)
        driver.find_element_by_xpath("/html/body/div[1]/section/div/div[2]/div/div/div[2]/div[2]/div/div[2]/div/div/div[3]/button").click()
