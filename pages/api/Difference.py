

# importing the required module
from bs4 import BeautifulSoup
import requests
import json
from prettytable import PrettyTable

url = 'https://www.speedrun.com/api/v1/leaderboards/o1y9wo6q/category/n2y55mko?top=10&embed=players&platform=N64'
rs = requests.get(url, timeout=None)
soup = BeautifulSoup(rs.content, features="html5lib")
data = soup.text
res = json.loads(data)

names = []
timeDiff = []

wrTime = res.get('data').get('runs')[0].get('run').get('times').get('primary_t')

for count in range(10):
    time = (res.get('data').get('runs')[count].get('run').get('times').get('primary_t') - wrTime) / wrTime * 100
    try:
        name = res.get('data').get('players').get('data')[count].get('names').get('international')
    except:
        name = res.get('data').get('players').get('data')[count].get('name')
    names.append(name)
    timeDiff.append(time)

displayTable = PrettyTable(["Name", "Percent Slower Than WR"])

for count in range(10):
    displayTable.add_row([str(count + 1) + ". " + names[count], str("%.2f" % timeDiff[count]) + "%"])
    # print("Name: " + names[count] + "   Time Differential(Percentage): " + str(timeDiff[count]) + "%")

print(displayTable)