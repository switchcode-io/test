from fastapi import FastAPI
import requests
from bs4 import BeautifulSoup

app = FastAPI()

@app.get("/scrape/")
async def scrape(domain: str, extension: str):
    # Try fetching the https version of the website first
    url_https = f"https://www.{domain}.{extension}"
    response_https = requests.get(url_https)
    if response_https.status_code == 200:
        soup_https = BeautifulSoup(response_https.text, 'html.parser')
        head_tag_https = str(soup_https.head)
        if head_tag_https:
            return {"headTag": head_tag_https,            
            }

    # If https version fails or <head> tag not found, try the http version
    url_http = f"http://www.{domain}.{extension}"
    response_http = requests.get(url_http)
    soup_http = BeautifulSoup(response_http.text, 'html.parser')
    head_tag_http = str(soup_http.head)

    if head_tag_http:
        return {"headTag": head_tag_http}
    else:
        return {"error": "Head tag not found"}
