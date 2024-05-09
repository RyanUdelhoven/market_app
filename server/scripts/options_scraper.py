import httpx  # type: ignore
from selectolax.parser import HTMLParser  # type: ignore
import os
import json
from dotenv import load_dotenv  # type: ignore
load_dotenv()


def get_html(baseurl):
  headers = {"User-Agent": os.getenv("USER_AGENT")}

  response = httpx.get(baseurl, headers=headers)
  html = HTMLParser(response.text)
  return html


def parse_underlying(html):
  return html.css('fin-streamer.livePrice.svelte-mgkamr span')[0].text()


def parse_dates(html, date_labels):
  listbox_html = html.css('div[role=listbox]').pop(0)
  date_dict = []
  for i in listbox_html.css('div.itm.svelte-qe79qs'):
    date_code = i.attributes['data-value']
    date_text_raw = i.text().strip().replace(',', '')
    split = date_text_raw.split(' ')
    if len(split[1]) == 1:
      split[1] = f'0{split[1]}'
    date_text = f'{split[1]}{split[0]}{split[2]}'
    date_dict.append({
        date_labels['display']: date_text,
        date_labels['code']: date_code,
    })
  return date_dict


def parse_tables(html):
  # output => [calls, puts]
  return html.css('table')


def parse_rows(table):
  # output => [contractTypeRows]
  return table.css('tr')


def parse_rows_HTML(rowHTML, contractType, expiry_date):
  contracts = []
  for contractHTML in rowHTML[1:]:
    contracts.append(parse_contract(contractHTML, contractType, expiry_date))
  return contracts


def parse_contract(contractHTML, contractType, expiry_date):
  column_headers = ['contractID', 'lastTradeDTG', 'strike', 'lastPrice', 'bid', 'ask',
                    'change', 'percentChange', 'volume', 'openInterest', 'impliedVolatility']
  contract_data = [td.text().strip() for td in contractHTML.css('td')]
  contract = dict(zip(column_headers, contract_data))
  contract['contractType'] = contractType
  contract['expiry_date'] = expiry_date
  return contract


def create_json(ticker, data):
  dir_path = '../output'
  if not os.path.exists(dir_path):
    os.makedirs(dir_path)
  file_path = f'{dir_path}/{ticker}_options_chain.json'
  with open(file_path, 'w') as json_file:
    json.dump(data, json_file, indent=2)


def parse_ticker_options(dates, base_url, date_labels):
  contracts = {
      'calls': [],
      'puts': []
  }
  for date in dates:
    dated_url = f'{base_url}?date={date[date_labels['code']]}'
    html = get_html(dated_url)
    tablesHTML = parse_tables(html)
    callRowsHTML = parse_rows(tablesHTML[0])
    putRowsHTML = parse_rows(tablesHTML[1])
    callContracts = parse_rows_HTML(
        callRowsHTML, 'call', date['expiry_date_display'])
    putContracts = parse_rows_HTML(
        putRowsHTML, 'put', date['expiry_date_display'])
    for call in callContracts:
      contracts['calls'].append(call)
    for put in putContracts:
      contracts['puts'].append(put)
  return contracts


def options_data():
  date_labels = {
      'display': 'expiry_date_display',
      'code': 'expiry_date_code',
  }
  ticker = os.getenv("TICKER").upper()
  base_url = f'https://finance.yahoo.com/quote/{ticker}/options/'
  html = get_html(base_url)
  current_price = parse_underlying(html)
  dates = parse_dates(html, date_labels)
  contracts = parse_ticker_options(dates, base_url, date_labels)
  data = {
      'current_price': current_price,
      'expiry_dates': dates,
      'contracts': contracts
  }

  # create_json(ticker, data)
  return data


if __name__ == "__main__":
  options_data()
