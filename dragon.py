# This file contains the python code for the dragon board.



import mraa
import cv2,sys
import time
import requests

DEV_NUM = 0
IMAGE_FILE = "face.jpg"

 
print (mraa.getVersion())
vc = cv2.VideoCapture(DEV_NUM)
url = "https://michaelenglo.lib.id/nwhacksiotsever@dev/"


button = mraa.Gpio(29)
button.dir(mraa.DIR_IN)


while True:
	if(button.read() ==1):
		count = 0
		while (count < 10)
			time.sleep(10)
			count++
			if vc.isOpened():
				retval, frame = vc.read()
			else
				sys.exit(1)
			retval, frame = vc.read()
			cv2.imwrite(IMAGE_FILE,frame)
			img = cv2.imread(IMAGE_FILE)impirt
			## send photo via http
			photo = {'file': open('face.jpg','rb')}
			r = requests.post(url, files = photo)
			print(r.text)
		if (count > 9)
			break
