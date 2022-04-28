import os, re #import lib
from time import sleep #import function
from datetime import date #import function
from selenium import webdriver #import function

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

#Preconfig for Prgrammes in HKCC Asso
programmes_in_asso = [
    {"Name":"Humanities and Communication", "Code":"8C110"},
    {"Name":"Science and Technology",       "Code":"8C112"},
    {"Name":"Applied Social Sciences",      "Code":"8C111"},
    {"Name":"Business",                     "Code":"8C108"},
    {"Name":"Design",                       "Code":"8C113"},
    {"Name":"Health Studies",               "Code":"8C106"}
]

#Preconfig Save Path
SAVE_PATH = os.getcwd() + f"\\temp_file\\"

#Folder handling function
def CreateFolder(SAVE_PATH):
	if not os.path.exists(SAVE_PATH):
		os.makedirs(SAVE_PATH)
		print(f"Created folder{SAVE_PATH}")
		print()

############################################################################################################################################################
#get courses name in all programme
for programme in programmes_in_asso:
    #the pdf path of 8C106 is diff from other programme
    if programme["Code"] == "8C106":
        File_name = f'{programme["Code"]}_Programme_Requirement_Document_2021-22.pdf'
    else:
        File_name = f'{programme["Code"]}_Scheme_Requirement_Document_2021-22.pdf'

    #get the pdf file
    response = requests.get(url=f'https://www.hkcc-polyu.edu.hk/students/scheme_prog_requirement_documents/2021_22/{File_name}',headers = headers)
    
    #showing the content of the response
    print(response.url)
    print(response.headers)
    print(response.headers.get('content-type'))

    #Create temp folder
    CreateFolder(SAVE_PATH)

    #content validation(pdf)
    if response.headers.get('content-type') == 'application/pdf':
        filepath = SAVE_PATH + File_name
        
        #file of programme pdf save for record
        open(filepath, 'wb').write(response.content)

        #find all url of pdf files
        firefox_profile = webdriver.FirefoxProfile() #Tell the program to use FireFox Driver
        firefox_profile.set_preference("browser.privatebrowsing.autostart", False) #Start FireFox
        driver = webdriver.Firefox(firefox_profile=firefox_profile) #Tell the program to use FireFox Driver
        
        driver.get(f'file:///{filepath}') #Open pdf
        sleep(2)
        i = 0
        while i < 100:
            #scroll to the bottom of the page
            driver.find_element_by_id("next").click()
            i+=1
        #get the html source using firefox pdf reader
        html = driver.page_source
        driver.close()

        #matching urls of the courses using regular expression
        urls = re.findall('(https?:\/\/staffweb.cpce-polyu.edu.hk\/\S+.pdf)',html)

        #file stream for saving courses info by each programme in programmeCode.json format (e.g. 8C110.json)
        with open(SAVE_PATH + programme["Code"] + ".json", 'w') as f:
            f.write(f"[\n")
            for _ in urls:
                key = _.replace('\(','(').replace('\)',')')
                keyword = key.split('/')[-1].split('.pdf')[0].split('%20')
                f.write("{\n"+f"\"SubjectCode\":\"{keyword[0]}\",\n\"SubjectName\":\"{' '.join(keyword[1:])}\",\n\"SDFUrl\":\"{key}\"\n"+"}\n")
                if _ != urls[-1]:
                    f.write(',')
            f.write(f"]")
    else:
        print("no content-type")
        