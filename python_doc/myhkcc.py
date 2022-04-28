import os, json #import lib
from secrets import username, password #import username and password

try:
	import requests #import lib
except ImportError:
	#install requests if missing
	print("Trying to Install required module: requests\n")
	os.system('python -m pip install requests')
	import requests

try:
	import bs4 #import lib
except ImportError:
	#install bs4 if missing
	print("Trying to Install required module: bs4\n")
	os.system('python -m pip install bs4')
	import bs4

#Preconfig
headers = {
    'User-Agent': 'User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:84.0) Gecko/20100101 Firefox/84.0',
}

def CreateFolder(SAVE_PATH):
	if not os.path.exists(SAVE_PATH):
		os.makedirs(SAVE_PATH)
		print(f"Created folder{SAVE_PATH}")
		print()

############################################################################################################################################################
#Login
url ='https://www48.polyu.edu.hk/myhkcc_new/'
session = requests.Session()

#get Cookie needed
response1 = session.get(url=url,headers = headers, allow_redirects=False)
print(response1.status_code)

response2 = session.get(url=response1.headers['Location'],headers = headers, allow_redirects=False)
print(response2.status_code)

response3 = session.get(url=response2.headers['Location'],headers = headers, allow_redirects=False)
print(response3.status_code)
responsetext3 = response3.text

#find data
soup = bs4.BeautifulSoup(responsetext3, "html.parser")
LASTFOCUS = soup.find(id="__LASTFOCUS")
VIEWSTATE = soup.find(id="__VIEWSTATE")
VIEWSTATEGENERATOR = soup.find(id="__VIEWSTATEGENERATOR")
EVENTTARGET = soup.find(id="__EVENTTARGET")
EVENTVALIDATION = soup.find(id="__EVENTVALIDATION")
SAMLRequest =  soup.find(id="aspnetForm")
SAMLRequest.get('value')

data = {
	"__LASTFOCUS": LASTFOCUS.get('value'),
	"__VIEWSTATE": VIEWSTATE.get('value'),
	"__VIEWSTATEGENERATOR": VIEWSTATEGENERATOR.get('value'),
	"__EVENTTARGET": EVENTTARGET.get('value'),
	"__EVENTVALIDATION": EVENTVALIDATION.get('value'),
	"__db": "15",
	"ctl00$ContentPlaceHolder1$UsernameTextBox": username,
	"ctl00$ContentPlaceHolder1$PasswordTextBox": password,
    "ctl00%24ContentPlaceHolder1%24UserType": "RadioButton2",
	"ctl00$ContentPlaceHolder1$SubmitButton": "Sign+In",
	"ctl00$ContentPlaceHolder1$UserAccountControlWSText": "",
	"ctl00$ContentPlaceHolder1$UserUPNWSText": "",
	"ctl00$ContentPlaceHolder1$ADFSDevVersion": "1.1.8000.32521"
}
#Post the Ac Info
response4 = session.post(url="https://adfs.cpce-polyu.edu.hk/"+ SAMLRequest.get('action'),headers = headers,data=data)
print(response4.status_code)
print(response4.cookies.get_dict())

#get SAMLResponse and RelayState
responsetext4 = response4.text
soup=bs4.BeautifulSoup(responsetext4, "html.parser")
SAMLResponse = soup.find("input",{"name":"SAMLResponse"})
RelayState = soup.find("input",{"name":"RelayState"})

#User Ac Validation Check
if SAMLResponse is None:
	print("Username or password invalid,please try agin.")
	print()
	exit(1)

data = {
	"SAMLResponse": SAMLResponse.get('value'),
	"RelayState": RelayState.get('value'),
}

response5 = session.post(url="https://rapidauth-prod.polyu.edu.hk/Shibboleth.sso/SAML2/POST",headers = headers,data = data,allow_redirects=True)
print(response5.status_code)

responsetext5 = response5.text
soup = bs4.BeautifulSoup(responsetext5, "html.parser")
data = {
	"data" : soup.find("input",{"name":"data"}).get('value')
}

response6 = session.post(url="https://www48.polyu.edu.hk/myhkcc_new/",headers = headers,data = data,allow_redirects=True)
print(response6.status_code)

############################################################################################################################################################
#Get source
tarSubjectListURL = 'https://www48.polyu.edu.hk/myhkcc_new/me/subjectTimetable/getSubjectList'
tarSubjectTimetableURL = 'https://www48.polyu.edu.hk/myhkcc_new/me/subjectTimetable/getSubjectTimetable'

result1 = session.post(url=tarSubjectListURL,headers = headers)
resultText1 = json.loads(result1.text)

#save as current academicYear
currentAcademicYear = resultText1["academicYearSem"].replace(",","_").replace("/","_")
SAVE_PATH = os.getcwd() + f"\\temp_file\\{currentAcademicYear}\\"
CreateFolder(SAVE_PATH)

#saving all programm data from Myhkcc by all_programmes.json
with open(SAVE_PATH + "all_programmes.json", 'w') as f:
	f.write(json.dumps(resultText1, indent=4, sort_keys=True))

#Get the timetable for each course
for subj in resultText1["results"]:
	coursecode = subj["subjectCode"]

	result2 = session.post(url=tarSubjectTimetableURL,headers = headers, data = coursecode)
	resultText2 = result2.text

	#saving the timetable of corse by course code
	with open(SAVE_PATH + coursecode + ".json", 'w') as f:
		f.write(json.dumps(json.loads(resultText2), indent=4, sort_keys=True))



