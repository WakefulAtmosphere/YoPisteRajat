from bs4 import BeautifulSoup
import requests
import re
import json

testaus = False
sijainti = "../frontend/src/data/data.json"



def hae_data():
    data = {}
    for i in hae_linkit():
        url = "https://www.ylioppilastutkinto.fi" + i
        if "kevaet" in i:
            handle = "kevat-2017"
        else:
            handle = i[len(i)-10:len(i)]
        response = requests.get(url)
        content = BeautifulSoup(response.text, 'html.parser')
        content = content.tbody
        taulukko = content.find_all('tr')
        data[handle] = {}
        for i in taulukko:
            rivi = []
            datum = i.find_all('td')
            for j in datum:
                kasitelty = str(j).replace("\n", ",")
                korjattavat = [["Enaresamiska, kort lärokurs", "Inarinsaame, lyhyt oppimäärä"],["Koltan saame", "Koltansaame"],["Matematiikan koe, pitkä oppimäärä", "Matematiikka, pitkä oppimäärä"],["Matematiikan koe, lyhyt oppimäärä", "Matematiikka, lyhyt oppimäärä"],["dinkielen koe", "dinkieli"], [" ja kirjallisuus", ""], ["Svenska som andraspråk", "Ruotsi toisena kielenä"], ["Evankelis-luterilainen uskonto", "Uskonto, evankelis-luterilainen"], ["Ortodoksinen uskonto", "Uskonto, ortodoksinen"], ["Inarinsaame lyhyt oppimäärä", "Inarinsaame, lyhyt oppimäärä"]]
                for k in korjattavat:
                    kasitelty = kasitelty.replace(k[0], k[1])
                kasitelty = re.sub(r'<.*?>', "", kasitelty)
                kasitelty = re.sub(r' ,', ",", kasitelty)
                kasitelty = re.sub(r'^,', "", kasitelty)
                kasitelty = re.sub(r',$', "", kasitelty)
                kasitelty = re.sub(r'^0*', "", kasitelty)
                kasitelty = kasitelty.strip()
                try:
                    if kasitelty[0] < '0' or kasitelty[0] > '9':
                        kasitelty = kasitelty[0].upper() + kasitelty[1:]
                except:
                    pass
                rivi.append(kasitelty)
            while len(rivi) < 10:
                rivi.append("0")
            if len(rivi[0]) > 0:
                data[handle][rivi[0]] = rivi[1:]
    return {"data": data, "linkit": hae_linkit()}

def kirjoita_data(data):
    with open(sijainti, "w") as tiedosto:
        json.dump(data, tiedosto)


def hae_linkit():
    url = 'https://www.ylioppilastutkinto.fi/ylioppilastutkinto/pisterajat'
    response = requests.get(url)
    content = BeautifulSoup(response.text, 'html.parser')
    linkit = content.find_all('a')
    halutut_linkit = []
    for i in linkit:
        linkki = i.get('href')
        if "pisterajat" in linkki and ("kevat" in linkki or "syksy" in linkki or "kevaet" in linkki):
            if linkki not in halutut_linkit:
                halutut_linkit.append(str(linkki))
    return halutut_linkit

kirjoita_data(hae_data())