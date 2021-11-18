import IRequestYaloInfo from '../modules/mensagens/dtos/IRequestYaloInfo';
import IYaloInfo from '../modules/mensagens/dtos/IYaloInfo';

const requestYaloInfo: IRequestYaloInfo = {
  '98': {
    id: 'equatorial-cemar',
    outgoingToken:
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ5YWxvY2hhdF9hdXRoIiwiZXhwIjoxNTUzNzM1NjIwLCJpYXQiOjE1NTEzMTY0MjAsImlzcyI6InlhbG9jaGF0X2F1dGgiLCJqdGkiOiJlNjM2MmVmYS01ZDRlLTQ0Y2EtODE0OS0xMmQ0ZGY3MmViNWIiLCJuYmYiOjE1NTEzMTY0MTksInN1YiI6IjVjNzczNWMxMzdhZGE5MDAwODg1OWIwMSIsInR5cCI6ImFjY2VzcyJ9.ExSTxYepjNNi1NWV_MtC_g87NEmZz7tAPpeGHLfre9IkiI3oC2np945L9nCTTzleqgjJ9kWUNscdJaaEIy6SPg',
  },
  '95': {
    id: 'equatorial-celpa',
    outgoingToken:
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ5YWxvY2hhdF9hdXRoIiwiZXhwIjoxNTU1MDM2OTM1LCJpYXQiOjE1NTI2MTc3MzUsImlzcyI6InlhbG9jaGF0X2F1dGgiLCJqdGkiOiI2Y2JjN2I0OC03YzYwLTRjOTgtOGQwNy1jODAxZmE0MmRhMzUiLCJuYmYiOjE1NTI2MTc3MzQsInN1YiI6IjVjOGIwZjcyZTU3M2ZjMDAwOTE0NjA1MiIsInR5cCI6ImFjY2VzcyJ9.mU7bgLdmcdFgxt017Ds2UrlNyUNzy31irOyLQTJwVSoeGo7ejKwzN0ctpV6Ntm3rGkF4G_xnI1T8Ua0hPZP1WQ',
  },
  '82': {
    id: 'equatorial-alagoas',
    outgoingToken:
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ5YWxvY2hhdF9hdXRoIiwiYm90IjoiZXF1YXRvcmlhbC1hbGFnb2FzIiwiZXhwIjoxNTcwMDQyMzIxLCJpYXQiOjE1Njc2MjMxMjEsImlzcyI6InlhbG9jaGF0X2F1dGgiLCJqdGkiOiI2NWQ1OGQ0Zi03MDM0LTRjNGItOWYyNS0yYzRmMTdjMzYwN2EiLCJuYmYiOjE1Njc2MjMxMjAsInN1YiI6IjVkNzAwN2M4NmM5OGFhMDAwOTBlZDc3ZiIsInR5cCI6ImFjY2VzcyJ9.VTPLnWo7zJYDMlrywLVN1LV36rFA7C6NfLmoIOxy8WyyHsenon5C7gALbgfwtZnmtHnvz-ERNzVtcYewlgOl0A',
  },
  '86': {
    id: 'equatorial-piaui',
    outgoingToken:
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ5YWxvY2hhdF9hdXRoIiwiYm90IjoiZXF1YXRvcmlhbC1waWF1aSIsImV4cCI6MTU3MDA0MjIzNiwiaWF0IjoxNTY3NjIzMDM2LCJpc3MiOiJ5YWxvY2hhdF9hdXRoIiwianRpIjoiNDBhNWRjMGUtZDQwZS00OGM0LTkzMTQtY2ViMzQ4MTJlNDk3IiwibmJmIjoxNTY3NjIzMDM1LCJzdWIiOiI1ZDcwMDcxMWZlZTExNTAwMGJhZTJhNjkiLCJ0eXAiOiJhY2Nlc3MifQ.-M94J42QltLdAHuHxyiz-BaFR6EfxHfUA8Z89Jblp6udxL-xIHn8yhDUCUL7nGrPxfMhbR6nJAf6Rg4EsujVZQ',
  },
};

function getRequestYaloInfo(empresaOperadora: number): IYaloInfo {
  if (!empresaOperadora) {
    return undefined;
  }

  return requestYaloInfo[empresaOperadora.toString()];
}

export default getRequestYaloInfo;
