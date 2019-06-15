import urllib.request
import json
from pathlib import Path

MONSTER_LIST = 'https://storage.googleapis.com/mirubot/protic/paddata/padguide/monsterList.json'
IMAGE_SRC_FULL_TEMPLATE = 'https://f002.backblazeb2.com/file/miru-data/padimages/jp/full/{}.png'
IMAGE_DST_FULL_TEMPLATE = 'public/full/{}.png'
IMAGE_SRC_ICON_TEMPLATE = 'https://f002.backblazeb2.com/file/miru-data/padimages/jp/portrait/{}.png'
IMAGE_DST_ICON_TEMPLATE = 'public/portrait/{}.png'
MIN_LIST = 'src/data/monsterList.js'

with urllib.request.urlopen(MONSTER_LIST) as url:
    data = json.loads(url.read().decode())
min_data = {}
for row in data['items']:
    src = IMAGE_SRC_TEMPLATE.format(row['MONSTER_NO_JP'])
    dst = IMAGE_DST_TEMPLATE.format(row['MONSTER_NO_JP'])
    if not Path(dst).exists():
        print(row['MONSTER_NO_JP'], row['TM_NAME_US'])
        urllib.request.urlretrieve(src, dst)
    min_data[row['MONSTER_NO_JP']] = {
        'NAME': row['TM_NAME_US'],
        'ATT1': int(row['TA_SEQ']),
        'ATT2': int(row['TA_SEQ_SUB']),
    }
    
with open(MIN_LIST, 'w') as f:
    file = 'monsterList'
    f.write("const {} =\n ".format(file))
    json.dump(min_data, f, sort_keys=True)
    f.write(";\nexport default {};".format(file))