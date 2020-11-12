import re
import pyautogui

pyautogui.PAUSE = 1
pyautogui.doubleClick(x=618, y=48)
pyautogui.click(x=50,y=150)
pyautogui.PAUSE = 0
pyautogui.click(x=620, y=950)
pyautogui.PAUSE = 0.5

for line in open('bee_movie_script.txt'):
    line = re.sub('[^A-Za-z0-9 ]','',line)
    pyautogui.write("/tts " + line)
    pyautogui.press('enter')
    
