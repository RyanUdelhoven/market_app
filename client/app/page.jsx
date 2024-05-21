import OptionContract from '@/components/OptionsContract/OptionsContract';

export default function Home() {

  const testData = {
    contract: {
      expirationDate: "2024-06-21",
      contractID: "ABC123",
      strike: 150,
      lastTradeDTG: "2024-05-19T15:00:00Z",
      bid: 3.50,
      ask: 3.70,
      lastPrice: 3.60,
      openInterest: 1200,
      impliedVolatility: 0.25,
    },
    previousClose: {
      expirationDate: "2024-06-21",
      contractID: "ABC123",
      strike: 150,
      lastTradeDTG: "2024-05-18T15:00:00Z",
      bid: 3.45,
      ask: 3.75,
      lastPrice: 3.55,
      openInterest: 1150,
      impliedVolatility: 0.26,
    },
  };

  return (
    <main>
      <OptionContract contract={testData.contract} previousClose={testData.previousClose} />
    </main>
  );
}
