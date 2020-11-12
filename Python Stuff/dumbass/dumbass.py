import cv2 as cv
import sys
import numpy as np

def filter (frame, string):
    gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
    gray = cv.equalizeHist(gray)

    faces = face_cascades.detectMultiScale(gray)
    for (x,y,w,h) in faces:
        cv.ellipse(frame, (x+w//2,y+h//2), (w//2,h//2), 0, 0, 360, (255,255,255))
        cv.putText(frame, string, (x,y+h//4), cv.FONT_HERSHEY_COMPLEX, 1.5, (255,255,255), 1)
        cv.putText(frame, f"x: {x+w//2}, y: {y+h//2}", (10, 30), cv.FONT_HERSHEY_COMPLEX, 1, (255,255,255))

    cv.imshow('dumbass', frame)


face_cascades = cv.CascadeClassifier()

if not face_cascades.load('C:/Users/chris/Desktop/Python Stuff/dumbass/cascade.xml'):
    print("Error loading face cascade")
    exit(0)

capture = cv.VideoCapture(0)
if not capture.isOpened:
    exit()

string = ""

while True:
    ret, frame = capture.read()
    if frame is None:
        break

    filter(frame, string)

    c = cv.waitKey(1)

    if c != -1:
        if c == ord('`'):
            break
        else:
            string += chr(c)
    
capture.release()
cv.destroyAllWindows()