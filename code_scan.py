import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('API_KEY')
AUTH_TOKEN = os.getenv('AUTH_TOKEN')

# path: string that takes the absolute/relative path to file
def check_file(path):
    # open file
    file = open(path);
    # boolean vulnerability status
    is_found  = False
    for line in file.readlines():
        # remove extra spaces and new lines
        line = line.strip()
        # iterate through the whole file and check for apikey/auth-token 
        if (API_KEY in line or AUTH_TOKEN in line):
            print(f'Sensitive info detected @: {line}')
            is_found = True
    
    
    if not is_found:
        print('No vulnerability detected')
    
    # close file
    file.close()




check_file('./dist/js/index.js')
check_file('./src/index.ts')
