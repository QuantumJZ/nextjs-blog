

# importing the required module
from bs4 import BeautifulSoup
import requests
import json
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

url = 'https://www.speedrun.com/api/v1/leaderboards/o1y9wo6q/category/n2y55mko?top=100&embed=players&platform=N64'
rs = requests.get(url, timeout=None)
soup = BeautifulSoup(rs.content, features="html5lib")
data = soup.text
res = json.loads(data)

names = []

wrTime = res.get('data').get('runs')[0].get('run').get('times').get('primary_t')

for count in range(100):
    time = (res.get('data').get('runs')[count].get('run').get('times').get('primary_t') - wrTime) / wrTime * 100
    try:
        name = res.get('data').get('players').get('data')[count].get('names').get('international')
    except:
        name = res.get('data').get('players').get('data')[count].get('name')
    names.append(name + "|" + str(time))

print(names)